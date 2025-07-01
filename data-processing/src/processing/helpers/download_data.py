"""
Module for downloading files from the internet.
"""

import os
import zipfile

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
