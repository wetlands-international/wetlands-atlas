"""
Processing functions for HydroBASINS data.
"""

from pathlib import Path

import geopandas as gpd
from rich.console import Console

from .download_data import download_and_unzip
from .geoprocessing import (
    create_basin_hierarchy,
    filter_by_geographic_intersection,
    process_geodataframe_columns,
)

console = Console()


def download_hydrobasins_africa(raw_data_dir: Path, url: str = None) -> gpd.GeoDataFrame:
    """
    Download and load HydroBASINS data for Africa.

    Parameters
    ----------
    raw_data_dir : Path
        Directory to download data to
    url : str, optional
        URL to download from. Uses default from config if None.

    Returns
    -------
    gpd.GeoDataFrame
        Loaded HydroBASINS data
    """
    if url is None:
        from ..config import HYDROBASINS_AFRICA_URL

        url = HYDROBASINS_AFRICA_URL

    console.print("📥 Downloading HydroBASINS data for Africa...")

    dir_path = download_and_unzip(url, raw_data_dir)
    console.print(f"✅ Downloaded and unzipped to {dir_path}")

    # Load the shapefile
    shapefile_path = raw_data_dir / "hydrobasins_africa/hydrobasins_africa.shp"
    gdf = gpd.read_file(shapefile_path)

    return gdf


def process_hydrobasins_data(gdf: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    """
    Process HydroBASINS data to create hierarchical basin structure.

    Parameters
    ----------
    gdf : gpd.GeoDataFrame
        Raw HydroBASINS data

    Returns
    -------
    gpd.GeoDataFrame
        Processed basin hierarchy
    """
    console.print("🔄 Processing HydroBASINS data...")

    # Apply common column processing
    gdf = process_geodataframe_columns(
        gdf,
        columns_to_drop=["to_bas", "legend"],
        columns_to_lowercase=True,
        sort_by="maj_name",
        ascending=True,
    )

    # Create basin hierarchy
    gdf = create_basin_hierarchy(gdf)

    return gdf


def filter_hydrobasins_by_sahel(
    hydrobasins_gdf: gpd.GeoDataFrame, sahel_boundary_path: Path
) -> gpd.GeoDataFrame:
    """
    Filter HydroBASINS data to only include basins in the Sahel region.

    Parameters
    ----------
    hydrobasins_gdf : gpd.GeoDataFrame
        Processed HydroBASINS data
    sahel_boundary_path : Path
        Path to Sahel boundary file

    Returns
    -------
    gpd.GeoDataFrame
        Filtered HydroBASINS data for Sahel region
    """
    console.print("🗺️  Filtering basins for Sahel region...")

    # Load Sahel boundary
    sahel = gpd.read_file(sahel_boundary_path)

    # Filter by intersection
    filtered_gdf = filter_by_geographic_intersection(hydrobasins_gdf, sahel)

    console.print(f"✅ Filtered to {len(filtered_gdf)} basins in Sahel region")

    return filtered_gdf


def process_hydrobasins_workflow(
    raw_data_dir: Path, output_dir: Path, sahel_boundary_path: Path, upload_to_s3: bool = True
) -> gpd.GeoDataFrame:
    """
    Complete workflow for processing HydroBASINS data.

    Parameters
    ----------
    raw_data_dir : Path
        Directory containing raw data
    output_dir : Path
        Directory for processed output
    sahel_boundary_path : Path
        Path to Sahel boundary file
    upload_to_s3 : bool, default True
        Whether to upload results to S3

    Returns
    -------
    gpd.GeoDataFrame
        Final processed HydroBASINS data
    """
    # Download and load data
    gdf = download_hydrobasins_africa(raw_data_dir)

    # Process data
    gdf = process_hydrobasins_data(gdf)

    # Filter by Sahel region
    gdf = filter_hydrobasins_by_sahel(gdf, sahel_boundary_path)

    # Save and upload
    from ..config import HYDROBASINS_CONFIG

    filename = HYDROBASINS_CONFIG["output_filename"]
    s3_key = HYDROBASINS_CONFIG["s3_key"]

    if upload_to_s3:
        from .geoprocessing import save_and_upload_geodata

        save_and_upload_geodata(gdf, output_dir / filename, s3_key)
    else:
        gdf.to_file(output_dir / filename, driver="GeoJSON")
        console.print(f"💾 Saved to {output_dir / filename}")

    return gdf
