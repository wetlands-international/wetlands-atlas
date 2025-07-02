"""
Module for downloading files from the internet.
"""

import os
import zipfile
from pathlib import Path

import requests


def download_and_unzip(url, directory):
    """
    Download a zip file from a URL and unzip it to a directory.
    Returns the path to the directory containing the unzipped files.
    """
    # Download the file
    response = requests.get(url, timeout=10)
    zip_file_name = os.path.basename(url)
    zip_file_path = os.path.join(directory, zip_file_name)
    with open(zip_file_path, "wb") as file:
        file.write(response.content)

    # Create a new directory for the unzipped files
    unzip_dir = os.path.join(directory, os.path.splitext(zip_file_name)[0])
    os.makedirs(unzip_dir, exist_ok=True)

    # Unzip the file
    with zipfile.ZipFile(zip_file_path, "r") as zip_ref:
        zip_ref.extractall(unzip_dir)

    # Remove the zip file
    os.remove(zip_file_path)

    return unzip_dir


def unzip_file(zip_file_path):
    """
    Unzip a file to a directory.

    Parameters
    ----------
    zip_file_path : str
        The path to the zip file to unzip.
    """
    # Create a new directory for the unzipped files
    unzip_dir = os.path.splitext(zip_file_path)[0]
    os.makedirs(unzip_dir, exist_ok=True)

    # Unzip the file
    with zipfile.ZipFile(zip_file_path, "r") as zip_ref:
        zip_ref.extractall(unzip_dir)


def download_file_from_google_drive(file_id: str, output_path: str | Path) -> Path:
    """
    Download a file from Google Drive using its file ID.

    Args:
        file_id (str): The Google Drive file ID extracted from the sharing URL
        output_path (str | Path): Path where the file should be saved

    Returns:
        Path: The path where the file was saved

    Raises:
        requests.RequestException: If the download fails
    """
    # Convert to Path object if string
    output_path = Path(output_path)

    # Create parent directories if they don't exist
    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Construct the direct download URL
    direct_url = f"https://drive.google.com/uc?export=download&id={file_id}"

    # Download the file
    response = requests.get(direct_url, timeout=30)
    response.raise_for_status()  # Raise an exception for bad status codes

    # Write the file
    with open(output_path, "wb") as f:
        f.write(response.content)

    return output_path
