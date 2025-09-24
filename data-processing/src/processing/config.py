"""
Configuration settings for the Wetlands data processing project.
"""

from pathlib import Path

# Directory paths
RAW_DATA_DIR = Path("data/raw/")
PROCESSED_DATA_DIR = Path("data/processed/")
INPUT_COG_DIR = RAW_DATA_DIR / "rasters"
INPUT_VECTOR_DIR = RAW_DATA_DIR / "vectors"
OUTPUT_COG_DIR = PROCESSED_DATA_DIR / "cogs"
OUTPUT_MBTILES_DIR = PROCESSED_DATA_DIR / "mbtiles"

# File paths
SAHEL_BOUNDARY_FILE = RAW_DATA_DIR / "sahel_boundary.gpkg"
SAHEL_FILE_ID = "10I6Z6k_5laK70n1BpnWC_BWAHR8IbF2g"

# Data URLs
HYDROBASINS_AFRICA_URL = "https://storage.googleapis.com/fao-maps-catalog-data/geonetwork/aquamaps/hydrobasins_africa.zip"

# S3 configuration
S3_BUCKET_PREFIX = "Wetlands/data/processed/"

# Sahel countries list
SAHEL_COUNTRIES = [
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

# Processing configuration
SAHEL_CONFIG = {
    "output_filename": "sahel_boundary.geojson",
    "s3_key": f"{S3_BUCKET_PREFIX}sahel_boundary.geojson",
}

HYDROBASINS_CONFIG = {
    "columns_to_drop": ["to_bas", "legend"],
    "sort_column": "maj_name",
    "output_filename": "hydrobasins_sahel.geojson",
    "s3_key": f"{S3_BUCKET_PREFIX}hydrobasins_sahel.geojson",
}

COUNTRIES_CONFIG = {
    "columns_to_drop": [
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
    ],
    "output_filename": "countries_sahel.geojson",
    "s3_key": f"{S3_BUCKET_PREFIX}countries_sahel.geojson",
}

WETLANDS_CONFIG = {
    "output_filename": "IUCN_Classified_Sahel_2019-2023.tif",
    "file_id": "1VQGC-iV5Rhd1tC-ScBT2ujq6vT5U5yXH",
}
