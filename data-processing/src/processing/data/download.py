"""
Module for downloading files from the internet.
"""

import os
import re
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


def _save_response_content(response, destination):
    """Save response content to destination with progress tracking for large files"""
    with open(destination, "wb") as f:
        for chunk in response.iter_content(chunk_size=32768):
            if chunk:  # filter out keep-alive new chunks
                f.write(chunk)


def _extract_confirmation_token(page_content: str, file_id: str) -> str | None:
    """Extract confirmation token from Google Drive virus scan warning page"""
    # First, try to find the form with all parameters
    form_match = re.search(r'<form[^>]*action="([^"]*)"[^>]*>.*?</form>', page_content, re.DOTALL)
    if form_match:
        form_content = form_match.group(0)
        action_url = form_match.group(1)

        # Extract hidden input values
        inputs = {}
        input_matches = re.findall(r'<input[^>]*name="([^"]*)"[^>]*value="([^"]*)"', form_content)
        for name, value in input_matches:
            inputs[name] = value

        # Build the URL with parameters
        if inputs:
            params = "&".join(f"{k}={v}" for k, v in inputs.items())
            return f"{action_url}?{params}"

    # Fallback to old patterns
    patterns = [
        # Look for download anyway button/link
        r'href="(/uc\?export=download&amp;confirm=([^&"]+)&amp;id=' + file_id + r')"',
        r'href="(/uc\?export=download&confirm=([^&"]+)&id=' + file_id + r')"',
        r'"downloadUrl":"([^"]*uc\?export=download[^"]*)"',
        # Look for any confirmation token
        r"confirm=([a-zA-Z0-9_-]+)",
        # Look for the specific download anyway pattern
        r'href="([^"]*uc\?export=download[^"]*confirm=[^"]*)"',
        # Look for encoded URLs
        r"\\u003d([a-zA-Z0-9_-]+)\\u0026",
    ]

    for pattern in patterns:
        match = re.search(pattern, page_content)
        if match:
            if "downloadUrl" in pattern:
                return match.group(1).replace("\\u003d", "=").replace("\\u0026", "&")
            elif 'href="([^"]*uc\\?export=download' in pattern:
                # Full URL found
                url = match.group(1)
                return url.replace("&amp;", "&")
            elif len(match.groups()) >= 2:
                return f"https://drive.google.com{match.group(1)}"
            else:
                token = match.group(1)
                return f"https://drive.google.com/uc?export=download&confirm={token}&id={file_id}"

    return None


def download_file_from_google_drive(file_id: str, output_path: str | Path) -> Path:
    """
    Download a file from Google Drive using its file ID.
    Handles both small files and large files that require confirmation to bypass virus scan.

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

    # Create a session to handle cookies
    session = requests.Session()

    # Try multiple approaches for downloading
    download_urls = [
        f"https://drive.google.com/uc?export=download&id={file_id}",
        f"https://drive.google.com/uc?export=download&id={file_id}&confirm=t",
        f"https://drive.google.com/uc?id={file_id}&export=download",
    ]

    for url in download_urls:
        try:
            response = session.get(url, stream=True, timeout=30)
            response.raise_for_status()

            # Check if we got the virus scan warning page
            content_type = response.headers.get("content-type", "")

            # If it's HTML, we might have hit the virus scan page
            if content_type.startswith("text/html"):
                # Read the first chunk to check for warnings
                first_chunk = next(response.iter_content(chunk_size=1024), b"")
                response.close()

                # Check for virus scan warning
                is_virus_warning = (
                    b"virus scan warning" in first_chunk.lower()
                    or b"Google Drive - Virus scan warning" in first_chunk
                    or b"can't scan file for viruses" in first_chunk.lower()
                    or b"exceeds the maximum file size that Google can scan" in first_chunk.lower()
                    or b"too large for Google to scan for viruses" in first_chunk.lower()
                )

                if is_virus_warning:
                    # Get the full page content to extract confirmation token
                    page_response = session.get(url, timeout=30)
                    page_content = page_response.text

                    # Extract confirmation URL
                    confirm_url = _extract_confirmation_token(page_content, file_id)

                    if confirm_url:
                        confirm_response = session.get(confirm_url, stream=True, timeout=30)
                        if confirm_response.status_code == 200:
                            _save_response_content(confirm_response, output_path)
                            return output_path

                    # If no patterns matched, try the next URL
                    continue
                else:
                    # It's HTML but not a virus scan warning - might be an error page
                    continue
            else:
                # Not HTML, looks like actual file content
                _save_response_content(response, output_path)
                return output_path

        except requests.RequestException:
            # Try next URL
            continue

    # If all attempts failed, raise an error
    raise requests.RequestException(
        f"Failed to download file with ID {file_id} from Google Drive. "
        f"Please check that the file ID is correct and the file is publicly accessible."
    )
