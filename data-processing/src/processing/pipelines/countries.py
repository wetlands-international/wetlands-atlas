"""
Processing functions for country data from OSM.
"""

from pathlib import Path
from typing import List

import geopandas as gpd
from rich.console import Console

from ..core.geoprocessing import process_geodataframe_columns, reorder_columns_geometry_last
from ..data.sources.osm import get_multiple_countries_osmx, name_to_iso3
from ..data.storage import upload_file_to_s3

console = Console()

# Default list of Sahel countries
DEFAULT_SAHEL_COUNTRIES = [
    "Senegal",
    "Mauritania",
    "Mali",
    "Burkina Faso",
    "Niger",
    "Chad",
    "Sudan",
    "Nigeria",
    "Eritrea",
    "Cameroon",
    "Gambia",
    "Guinea",
    "South Sudan",
    "Ethiopia",
    "Kenya",
    "Côte d'Ivoire",
    "Ghana",
    "Togo",
    "Benin",
    "Guinea-Bissau",
    "Central African Republic",
    "Uganda",
]


def download_country_data(countries: List[str] = None) -> gpd.GeoDataFrame:
    """
    Download country data from OSM.

    Parameters
    ----------
    countries : List[str], optional
        List of country names to download. Uses default Sahel countries if None.

    Returns
    -------
    gpd.GeoDataFrame
        Country boundary data
    """
    if countries is None:
        countries = DEFAULT_SAHEL_COUNTRIES

    console.print(f"📥 Downloading country data from OSM for {len(countries)} countries...")

    countries_gdf = get_multiple_countries_osmx(countries)
    console.print(f"✅ Downloaded data for {len(countries_gdf)} countries")

    return countries_gdf


def process_country_data(gdf: gpd.GeoDataFrame) -> gpd.GeoDataFrame:
    """
    Process country data from OSM.

    Parameters
    ----------
    gdf : gpd.GeoDataFrame
        Raw country data from OSM

    Returns
    -------
    gpd.GeoDataFrame
        Processed country data
    """
    console.print("🔄 Processing country data...")

    # Create bbox column from individual bbox components
    gdf["bbox"] = gdf.apply(
        lambda r: {"bbox": [r["bbox_west"], r["bbox_south"], r["bbox_east"], r["bbox_north"]]},
        axis=1,
    )

    # Define columns to drop
    columns_to_drop = [
        "bbox_west",
        "bbox_south",
        "bbox_east",
        "bbox_north",
        "place_id",
        "osm_type",
        "osm_id",
        "lat",
        "lon",
        "class",
        "type",
        "place_rank",
        "importance",
        "addresstype",
        "display_name",
        "country_name",
    ]

    # Apply common processing
    gdf = process_geodataframe_columns(
        gdf,
        columns_to_drop=columns_to_drop,
        columns_to_lowercase=False,  # Keep original case for country names
        sort_by="name",
        ascending=True,
    )

    # Add ISO3 codes
    gdf["ISO3"] = gdf["name"].apply(name_to_iso3)

    # Reorder columns
    gdf = reorder_columns_geometry_last(gdf)

    console.print(f"✅ Processed {len(gdf)} countries")

    return gdf


def process_countries_workflow(
    output_dir: Path, countries: List[str] = None, upload_to_s3: bool = True
) -> gpd.GeoDataFrame:
    """
    Complete workflow for processing country data.

    Parameters
    ----------
    output_dir : Path
        Directory for processed output
    countries : List[str], optional
        List of country names to process. Uses default Sahel countries if None.
    upload_to_s3 : bool, default True
        Whether to upload results to S3

    Returns
    -------
    gpd.GeoDataFrame
        Final processed country data
    """
    # Download country data
    gdf = download_country_data(countries)

    # Process data
    gdf = process_country_data(gdf)

    # Save and upload
    from ..config import COUNTRIES_CONFIG

    filename = COUNTRIES_CONFIG["output_filename"]
    s3_key = COUNTRIES_CONFIG["s3_key"]

    gdf.to_file(output_dir / filename, driver="GeoJSON")
    console.print(f"💾 Saved to {output_dir / filename}")

    if upload_to_s3:
        upload_file_to_s3(output_dir / filename, s3_key)
        console.print(f"📤 Uploaded to S3 at {s3_key}")

    return gdf
