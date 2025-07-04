"""
Module for uploading files to Google Cloud Storage (GCS) using parallel uploads.
"""

import json
import os
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import requests
from dotenv import load_dotenv
from google.cloud import storage
from google.oauth2 import service_account
from rich.console import Console
from tqdm import tqdm

# Load environment variables from the .env file
load_dotenv()

# Initialize rich console
console = Console()

# Access GCS credentials from the environment variables
GCS_BUCKET_NAME = os.getenv("GCS_BUCKET_NAME")
GCS_PROJECT_ID = os.getenv("GCS_PROJECT_ID")
GCS_PRIVATE_KEY = json.loads(os.getenv("GCS_PRIVATE_KEY"))

# Initialize GCS client
credentials = service_account.Credentials.from_service_account_info(GCS_PRIVATE_KEY)
storage_client = storage.Client(project=GCS_PROJECT_ID, credentials=credentials)


def upload_file_to_gcs(file_path: str, destination_blob_path: str):
    """
    Upload a single file to a GCS bucket.

    Parameters:
    file_path (str): The local file path to upload.
    destination_blob_path (str): The destination path in the GCS bucket.
    """

    # GCS bucket initialization
    bucket = storage_client.bucket(GCS_BUCKET_NAME)

    try:
        # Create a blob object in the bucket
        blob = bucket.blob(destination_blob_path)

        # Upload the file to GCS with retry logic
        retries = 5
        for attempt in range(retries):
            try:
                # Upload the file to GCS
                blob.upload_from_filename(file_path)
                console.print(
                    f"[green]Successfully uploaded {file_path} to {destination_blob_path}[/green]"
                )
                break
            except requests.exceptions.ConnectionError as e:
                if attempt < retries - 1:
                    sleep_time = 2**attempt
                    console.print(f"[yellow]Retrying in {sleep_time} seconds...[/yellow]")
                    time.sleep(sleep_time)
                else:
                    console.print(f"[red]Error uploading {file_path}: {e}[/red]")
                    raise

    except FileNotFoundError as e:
        console.print(f"[red]Error uploading {file_path}: {e}[/red]")
        raise


def remove_file_from_local_storage(file_path: Path):
    """
    Remove a single file from local storage.

    Parameters:
    file_path (Path): The local file path to remove.
    """
    try:
        if file_path.exists():
            file_path.unlink()
            console.print(f"[green]Successfully removed {file_path}[/green]")
        else:
            console.print(f"[yellow]File not found: {file_path}[/yellow]")
    except OSError as e:
        console.print(f"[red]Error removing {file_path}: {e}[/red]")
        raise


def upload_folder_files_to_gcs_parallel(
    folder_path: str, destination_blob_path: str, max_workers: int = 40
):
    """
    Upload all files in a folder to a GCS bucket using parallel uploads.

    Parameters:
    folder_path (str): The local folder path to upload.
    destination_blob_path (str): The destination path in the GCS bucket.
    max_workers (int): The maximum number of parallel uploads.
    """

    # Use ThreadPoolExecutor to upload files in parallel
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = []
        # Walk through the folder and add each file to the upload queue
        for root, _, files in os.walk(folder_path):
            for file_name in files:
                file_path = os.path.join(root, file_name)
                # Get the remote path for the file
                blob_name = os.path.relpath(file_path, folder_path)
                remote_path = os.path.join(destination_blob_path, blob_name)
                # Use the existing upload_file_to_gcs function
                futures.append(executor.submit(upload_file_to_gcs, file_path, remote_path))

        # Wait for all uploads to complete
        for future in tqdm(as_completed(futures), total=len(futures)):
            future.result()


def remove_folder_files_from_local_storage(folder_path: Path):
    """
    Remove all files in a folder from local storage.

    Parameters:
    folder_path (Path): The local folder path to remove files from.
    """

    def delete_file(file):
        try:
            file.unlink()
            console.print(f"[green]Successfully removed {file}[/green]")
        except OSError as e:
            console.print(f"[red]Error removing {file}: {e}[/red]")

    files = list(folder_path.glob("*.tif"))
    if not files:
        console.print(f"[yellow]No .tif files found in {folder_path}[/yellow]")
        return

    console.print(f"[blue]Removing {len(files)} .tif files from {folder_path}[/blue]")

    with ThreadPoolExecutor() as executor:
        executor.map(delete_file, files)

    console.print(f"[green]Finished removing files from {folder_path}[/green]")
