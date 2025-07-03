"""
Common geoprocessing utilities for the Wetlands project.
"""

from typing import List, Optional, Union

import geopandas as gpd
from rich.console import Console

console = Console()


def reorder_columns_geometry_last(gdf: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    """
    Reorder columns to put 'geometry' at the end.
    """
    cols = [c for c in gdf.columns if c != "geometry"] + ["geometry"]
    return gdf[cols]


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
