"""
Processing functions for wetlands data.
"""

from pathlib import Path

from rich.console import Console

from ..config import WETLANDS_CONFIG
from ..data.download import download_file_from_google_drive

console = Console()


def download_wetlands(output_data_dir: Path) -> None:
    """
    Download wetlands data from Google Drive.

    Parameters
    ----------
    output_data_dir : Path
        Directory to download data to

    Returns
    -------
    None
    """

    console.print("📥 Downloading wetlands data...")

    file_name = WETLANDS_CONFIG["output_filename"]
    file_id = WETLANDS_CONFIG["file_id"]

    file_path = output_data_dir / file_name
    download_file_from_google_drive(file_id, file_path)

    console.print(f"✅ Downloaded wetlands data to {file_path}")
