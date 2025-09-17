"""
Script to create MBTiles from GeoJSON files.
"""

from rich.console import Console

from processing.config import INPUT_VECTOR_DIR, OUTPUT_MBTILES_DIR
from processing.core.vector_processor import VectorProcessor

console = Console()

DATASETS = {
    "locations_simplified": {
        "source": INPUT_VECTOR_DIR / "locations_simplified.geojson",
        "output": OUTPUT_MBTILES_DIR / "locations_simplified.mbtiles",
        "layer_name": "locations_simplified",
    },
    "ecoregions": {
        "source": INPUT_VECTOR_DIR / "ecoregions_sahel.geojson",
        "output": OUTPUT_MBTILES_DIR / "ecoregions_sahel.mbtiles",
        "layer_name": "ecoregions_sahel",
    },
    "WDPA": {
        "source": INPUT_VECTOR_DIR / "WDPA_areas/WDPA_names updated.shp",
        "output": OUTPUT_MBTILES_DIR / "wdpa.mbtiles",
        "layer_name": "wdpa",
    },
    "Ramsar sites": {
        "source": INPUT_VECTOR_DIR / "ramsar_sites.geojson",
        "output": OUTPUT_MBTILES_DIR / "ramsar_sites.mbtiles",
        "layer_name": "ramsar_sites",
    },
    "Nature dependent people (combined)": {
        "source": INPUT_VECTOR_DIR / "NDP/NDP_composite.shp",
        "output": OUTPUT_MBTILES_DIR / "ndp_combined.mbtiles",
        "layer_name": "ndp_combined",
    },
    "Nature dependent people (water)": {
        "source": INPUT_VECTOR_DIR / "NDP/NDP_water.shp",
        "output": OUTPUT_MBTILES_DIR / "ndp_water.mbtiles",
        "layer_name": "ndp_water",
    },
    "Aqueduct high stress areas": {
        "source": INPUT_VECTOR_DIR / "Aqueduct40_Waterrisk_correct/Water stress data_PES 30 ws.shp",
        "output": OUTPUT_MBTILES_DIR / "aqueduct_high_stress.mbtiles",
        "layer_name": "aqueduct_high_stress",
    },
    "Water dependency hotspots": {
        "source": INPUT_VECTOR_DIR / "NDP/Medium to high waterstress risk areas.shp",
        "output": OUTPUT_MBTILES_DIR / "water_dependency_hotspots.mbtiles",
        "layer_name": "water_dependency_hotspots",
    },
}


def main():
    """Main function to create MBTiles from GeoJSON files."""
    console.print("🚀 Starting MBTiles creation workflow...")

    OUTPUT_MBTILES_DIR.mkdir(parents=True, exist_ok=True)

    for name, paths in DATASETS.items():
        console.print(f"\nProcessing {name} dataset...")
        source_path = paths["source"]
        output_path = paths["output"]
        layer_name = paths["layer_name"]

        if not source_path.exists():
            console.print(f"[red]Source file does not exist: {source_path}[/red]")
            continue

        console.print(f"🌍 Converting {source_path} to {output_path}...")
        VectorProcessor(
            input_file=source_path,
            output_file=output_path,
            min_zoom=1,
            max_zoom=12,
            layer_name=layer_name,
            upload=True,
        ).process()

    console.print("✅ All MBTiles created successfully!")


if __name__ == "__main__":
    main()
