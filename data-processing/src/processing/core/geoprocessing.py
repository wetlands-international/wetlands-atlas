"""
Common geoprocessing utilities for the Wetlands project.
"""

from pathlib import Path
from typing import List, Optional, Union

import geopandas as gpd
from rich.console import Console

from ..data.storage import upload_file_to_s3

console = Console()


def reorder_columns_geometry_last(gdf: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    """
    Reorder columns to put 'geometry' at the end.
    """
    cols = [c for c in gdf.columns if c != "geometry"] + ["geometry"]
    return gdf[cols]


def save_and_upload_geodata(
    gdf: gpd.GeoDataFrame,
    local_path: Union[str, Path],
    s3_object_key: str,
    driver: str = "GeoJSON",
    upload_to_s3: bool = True,
) -> None:
    """
    Save GeoDataFrame to file and optionally upload to S3.

    Parameters
    ----------
    gdf : gpd.GeoDataFrame
        The GeoDataFrame to save
    local_path : Union[str, Path]
        Local file path to save to
    s3_object_key : str
        S3 object key for upload
    driver : str, default "GeoJSON"
        File format driver
    upload_to_s3 : bool, default True
        Whether to upload to S3
    """
    local_path = Path(local_path)

    # Ensure output directory exists
    local_path.parent.mkdir(parents=True, exist_ok=True)

    # Save locally
    gdf.to_file(local_path, driver=driver)
    console.print(f"💾 Saved to {local_path}")

    # Upload to S3 if requested
    if upload_to_s3:
        upload_file_to_s3(local_path, s3_object_key)


def process_geodataframe_columns(
    gdf: gpd.GeoDataFrame,
    columns_to_drop: Optional[List[str]] = None,
    columns_to_lowercase: bool = True,
    sort_by: Optional[Union[str, List[str]]] = None,
    ascending: bool = True,
) -> gpd.GeoDataFrame:
    """
    Apply common column processing operations to a GeoDataFrame.

    Parameters
    ----------
    gdf : gpd.GeoDataFrame
        The GeoDataFrame to process
    columns_to_drop : Optional[List[str]]
        List of column names to drop
    columns_to_lowercase : bool, default True
        Whether to convert column names to lowercase
    sort_by : Optional[Union[str, List[str]]]
        Column(s) to sort by
    ascending : bool, default True
        Sort order

    Returns
    -------
    gpd.GeoDataFrame
        Processed GeoDataFrame
    """
    gdf = gdf.copy()

    # Convert column names to lowercase
    if columns_to_lowercase:
        gdf.columns = gdf.columns.str.lower()

    # Drop specified columns
    if columns_to_drop:
        # Filter out columns that don't exist
        existing_cols_to_drop = [col for col in columns_to_drop if col in gdf.columns]
        if existing_cols_to_drop:
            gdf.drop(columns=existing_cols_to_drop, inplace=True)

    # Sort if specified
    if sort_by:
        gdf.sort_values(by=sort_by, ascending=ascending, inplace=True)
        gdf.reset_index(drop=True, inplace=True)

    # Reorder columns with geometry last
    gdf = reorder_columns_geometry_last(gdf)

    return gdf


def filter_by_geographic_intersection(
    gdf: gpd.GeoDataFrame, filter_geometry: gpd.GeoDataFrame, reset_index: bool = True
) -> gpd.GeoDataFrame:
    """
    Filter a GeoDataFrame by geometric intersection with another geometry.

    Parameters
    ----------
    gdf : gpd.GeoDataFrame
        GeoDataFrame to filter
    filter_geometry : gpd.GeoDataFrame
        GeoDataFrame containing the filter geometry
    reset_index : bool, default True
        Whether to reset the index after filtering

    Returns
    -------
    gpd.GeoDataFrame
        Filtered GeoDataFrame
    """
    filtered_gdf = gdf[gdf.geometry.intersects(filter_geometry.unary_union)]

    if reset_index:
        filtered_gdf.reset_index(drop=True, inplace=True)

    return filtered_gdf
