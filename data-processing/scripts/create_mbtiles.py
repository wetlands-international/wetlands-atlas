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
        "min_zoom": 1,
        "max_zoom": 12,
    },
    "ecoregions": {
        "source": INPUT_VECTOR_DIR / "ecoregions_sahel.geojson",
        "output": OUTPUT_MBTILES_DIR / "ecoregions_sahel.mbtiles",
        "layer_name": "ecoregions_sahel",
        "min_zoom": 1,
        "max_zoom": 12,
    },
    "WDPA": {
        "source": INPUT_VECTOR_DIR / "WDPA_areas/WDPA_names updated.shp",
        "output": OUTPUT_MBTILES_DIR / "wdpa.mbtiles",
        "layer_name": "wdpa",
        "min_zoom": 1,
        "max_zoom": 12,
    },
    "Ramsar sites": {
        "source": INPUT_VECTOR_DIR / "ramsar_sites.geojson",
        "output": OUTPUT_MBTILES_DIR / "ramsar_sites.mbtiles",
        "layer_name": "ramsar_sites",
        "min_zoom": 1,
        "max_zoom": 12,
    },
    "Nature dependent people (combined)": {
        "source": INPUT_VECTOR_DIR / "NDP/NDP_composite.shp",
        "output": OUTPUT_MBTILES_DIR / "ndp_combined.mbtiles",
        "layer_name": "ndp_combined",
        "min_zoom": 1,
        "max_zoom": 12,
    },
    "Nature dependent people (water)": {
        "source": INPUT_VECTOR_DIR / "NDP/NDP_water.shp",
        "output": OUTPUT_MBTILES_DIR / "ndp_water.mbtiles",
        "layer_name": "ndp_water",
        "min_zoom": 1,
        "max_zoom": 12,
    },
    "Aqueduct high stress areas": {
        "source": INPUT_VECTOR_DIR / "Aqueduct40_Waterrisk_correct/water_stress_data_PES_30_ws.shp",
        "output": OUTPUT_MBTILES_DIR / "aqueduct_high_stress.mbtiles",
        "layer_name": "aqueduct_high_stress",
        "min_zoom": 5,
        "max_zoom": 12,
    },
    "Water dependency hotspots": {
        "source": INPUT_VECTOR_DIR / "NDP/Medium to high waterstress risk areas.shp",
        "output": OUTPUT_MBTILES_DIR / "water_dependency_hotspots.mbtiles",
        "layer_name": "water_dependency_hotspots",
        "min_zoom": 1,
        "max_zoom": 12,
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

        if not source_path.exists():
            console.print(f"[red]Source file does not exist: {source_path}[/red]")
            continue

        console.print(f"🌍 Converting {source_path} to {output_path}...")
        VectorProcessor(
            input_file=source_path,
            output_file=output_path,
            min_zoom=paths["min_zoom"],
            max_zoom=paths["max_zoom"],
            layer_name=paths["layer_name"],
            upload=True,
        ).process()

    console.print("✅ All MBTiles created successfully!")


if __name__ == "__main__":
    main()
