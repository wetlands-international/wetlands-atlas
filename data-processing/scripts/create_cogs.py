"""
Script to create Cloud Optimized GeoTIFFs (COGs) from TIFF files.
"""

from pathlib import Path

from processing.converters.cogs import convert_tif_to_cog
from rich.console import Console

console = Console()

DATA_PATH = Path("data/processed")
COGS_PATH = Path("data/processed/cogs")

DATASETS = {
    "wetlands": {
        "source": DATA_PATH / "IUCN_Classified_Sahel_2019-2023.tif",
        "output": COGS_PATH / "IUCN_Classified_Sahel_2019-2023.tif",
        "resampling": "nearest",
    },
}


def main():
    """Main function to create COGs from TIFF files."""
    console.print("🚀 Starting COG creation workflow...")

    COGS_PATH.mkdir(parents=True, exist_ok=True)

    for name, paths in DATASETS.items():
        console.print(f"\nProcessing {name} dataset...")
        source_path = paths["source"]
        output_path = paths["output"]
        resampling = paths.get("resampling")

        if not source_path.exists():
            console.print(f"[red]Source file does not exist: {source_path}[/red]")
            continue

        console.print(f"🌍 Converting {source_path} to {output_path}...")
        convert_tif_to_cog(source_path, output_path, resampling)

    console.print("✅ All COGs created successfully!")


if __name__ == "__main__":
    main()
