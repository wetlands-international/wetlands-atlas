"""
Script to create Cloud Optimized GeoTIFFs (COGs) from TIFF files.
"""

import sys

from rich.console import Console

from processing.config import INPUT_COG_DIR, OUTPUT_COG_DIR
from processing.converters.cogs import convert_tif_to_cog
from processing.data.storage.gcs import remove_file_from_local_storage, upload_file_to_gcs

console = Console()

DATASETS = {
    "Wetlands (by type)": {
        "source": INPUT_COG_DIR
        / "Classification_Test_V1-0_Iv_Ow_Classes_BurnMF_BurnSM_BurnGMW_Mask_Clip.tif",
        "output": OUTPUT_COG_DIR / "wetlands_by_type_cog.tif",
        "resampling": "nearest",
        "nodata_value": 0,
        "upload_to_gcs": False,
    },
    "Wetlands (by Ramsar)": {
        "source": INPUT_COG_DIR / "tropwet_sahel_basic_ramsar_typology_v1.tif",
        "output": OUTPUT_COG_DIR / "wetlands_by_ramsar_cog.tif",
        "resampling": "nearest",
        "nodata_value": 0,
        "upload_to_gcs": False,
    },
    "Peatlands": {
        "source": INPUT_COG_DIR / "peatlands_sahel_CLIPPED.tif",
        "output": OUTPUT_COG_DIR / "peatlands_cog.tif",
        "resampling": "nearest",
        "upload_to_gcs": False,
    },
    "Irrecoverable Carbon": {
        "source": INPUT_COG_DIR / "irrecoverable_carbon_CLIPPED.tif",
        "output": OUTPUT_COG_DIR / "irrecoverable_carbon_cog.tif",
        "resampling": "nearest",
        "upload_to_gcs": False,
    },
    "Europe Wetlands (by type)": {
        "source": INPUT_COG_DIR / "Europe wetland inventory_EXT&EWM_3857.tif",
        "output": OUTPUT_COG_DIR / "europe_wetlands_by_type_cog.tif",
        "resampling": "nearest",
        "nodata_value": 0,
        "upload_to_gcs": False,
    },
    "Europe Wetlands (3 classes)": {
        "source": INPUT_COG_DIR / "Europe_wetland_inventory_3classes_3857.tif",
        "output": OUTPUT_COG_DIR / "europe_wetlands_3classes_cog.tif",
        "resampling": "nearest",
        "nodata_value": 0,
        "upload_to_gcs": False,
    },
    "Europe Floodplains (classes 1-2)": {
        "source": INPUT_COG_DIR / "Europe_classes1_2_floodplains_nodata_3857.tif",
        "output": OUTPUT_COG_DIR / "europe_floodplains_classes1_2_cog.tif",
        "resampling": "nearest",
        "nodata_value": 255,
        "upload_to_gcs": False,
    },
}


def main():
    """Main function to create COGs from TIFF files."""
    console.print("🚀 Starting COG creation workflow...")

    OUTPUT_COG_DIR.mkdir(parents=True, exist_ok=True)

    selected = sys.argv[1:]
    unknown = [name for name in selected if name not in DATASETS]
    if unknown:
        console.print(f"[red]Unknown dataset(s): {', '.join(unknown)}[/red]")
        console.print(f"Available datasets: {', '.join(DATASETS)}")
        sys.exit(1)
    datasets = {k: v for k, v in DATASETS.items() if not selected or k in selected}

    for name, paths in datasets.items():
        console.print(f"\nProcessing {name} dataset...")
        source_path = paths["source"]
        output_path = paths["output"]
        resampling = paths.get("resampling")

        if not source_path.exists():
            console.print(f"[red]Source file does not exist: {source_path}[/red]")
            continue

        console.print(f"🌍 Converting {source_path} to {output_path}...")
        if paths.get("nodata_value") is None:
            convert_tif_to_cog(source_path, output_path, resampling)
        else:
            convert_tif_to_cog(
                source_path, output_path, resampling, nodata_value=paths.get("nodata_value")
            )

        if paths.get("upload_to_gcs", True):
            console.print(f"📤 Uploading {output_path} to GCS...")
            upload_file_to_gcs(output_path, f"cogs/{output_path.name}")
            console.print(f"🗑️ Removing local file {output_path}...")
            remove_file_from_local_storage(output_path)

    console.print("✅ All COGs created successfully!")


if __name__ == "__main__":
    main()
