"""
Script to create MBTiles from GeoJSON files.
"""

from pathlib import Path

from processing.helpers.mbtiles_converter import convert_geojson_to_mbtiles
from rich.console import Console

console = Console()

DATA_PATH = Path("data/processed")
MBTILES_PATH = Path("data/mbtiles")

DATASETS = {
    "hydrobasins": {
        "source": DATA_PATH / "hydrobasins_sahel.geojson",
        "output": MBTILES_PATH / "hydrobasins_sahel.mbtiles",
    },
    "countries": {
        "source": DATA_PATH / "countries_sahel.geojson",
        "output": MBTILES_PATH / "countries_sahel.mbtiles",
    },
}


def main():
    """Main function to create MBTiles from GeoJSON files."""
    console.print("🚀 Starting MBTiles creation workflow...")

    MBTILES_PATH.mkdir(parents=True, exist_ok=True)

    for name, paths in DATASETS.items():
        console.print(f"\nProcessing {name} dataset...")
        source_path = paths["source"]
        output_path = paths["output"]

        if not source_path.exists():
            console.print(f"[red]Source file does not exist: {source_path}[/red]")
            continue

        console.print(f"🌍 Converting {source_path} to {output_path}...")
        convert_geojson_to_mbtiles(source_path, output_path)

    console.print("✅ All MBTiles created successfully!")


if __name__ == "__main__":
    main()
