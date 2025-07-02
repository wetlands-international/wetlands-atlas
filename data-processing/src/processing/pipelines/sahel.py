"""
Processing functions for Sahel boundary.
"""

from pathlib import Path

import geopandas as gpd
from rich.console import Console

from ..core.geoprocessing import reorder_columns_geometry_last
from ..data.download import download_file_from_google_drive

console = Console()


def download_sahel_boundary(
    raw_data_dir: Path, file_name: str, file_id: str = None
) -> gpd.GeoDataFrame:
    """
    Download the Sahel boundary data from Google Drive.

    raw_data_dir : Path
        Directory to download data to
    file_name : str
        Name of the file to save the downloaded data as
    file_id : str, optional
        Google Drive file ID. Uses default from config if None.

    Returns
    -------
    gpd.GeoDataFrame
        Loaded HydroBASINS data
    """

    if file_id is None:
        from ..config import SAHEL_FILE_ID

        file_id = SAHEL_FILE_ID

    console.print("📥 Downloading Sahel boundary data from Google Drive...")

    output_path = download_file_from_google_drive(file_id, raw_data_dir / file_name)
    console.print(f"✅ Downloaded Sahel boundary data to: {output_path}")

    # Load the downloaded data
    gdf = gpd.read_file(output_path)

    return gdf


def process_sahel_data(gdf: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    """
    Process the Sahel boundary data.

    Parameters
    ----------
    gdf : gpd.GeoDataFrame
        Raw Sahel boundary data

    Returns
    -------
    gpd.GeoDataFrame
        Processed Sahel boundary data
    """

    console.print("🔧 Processing Sahel boundary data...")

    # Ensure the geometry is valid
    gdf = gdf[gdf.is_valid]

    # Add a 'name' column
    gdf["name"] = "Sahel Boundary"

    # Add bbox column
    gdf["bbox"] = gdf.apply(lambda r: {"bbox": list(r["geometry"].bounds)}, axis=1)

    # Reorder columns
    gdf = reorder_columns_geometry_last(gdf)

    console.print(f"✅ Processed {len(gdf)} features in Sahel boundary data")

    return gdf


def process_sahel_workflow(
    raw_data_dir: Path, file_name: str, output_dir: Path, upload_to_s3: bool = True
) -> gpd.GeoDataFrame:
    """
    Complete workflow for processing Sahel boundary data.

    Parameters
    ----------
    raw_data_dir : Path
        Directory containing raw data
    file_name : str
        Name of the file to save the downloaded data as
    output_dir : Path
        Directory for processed output
    upload_to_s3 : bool, default True
        Whether to upload results to S3.

    Returns
    -------
    gpd.GeoDataFrame
        Final processed Sahel boundary data
    """

    # Download the Sahel boundary data
    gdf = download_sahel_boundary(raw_data_dir, file_name)

    # Process data
    gdf = process_sahel_data(gdf)

    # Save and upload
    from ..config import SAHEL_CONFIG

    filename = SAHEL_CONFIG["output_filename"]
    s3_key = SAHEL_CONFIG["s3_key"]

    if upload_to_s3:
        from ..core.geoprocessing import save_and_upload_geodata

        save_and_upload_geodata(gdf, output_dir / filename, s3_key)
    else:
        gdf.to_file(output_dir / filename, driver="GeoJSON")
        console.print(f"💾 Saved to {output_dir / filename}")

    return gdf
