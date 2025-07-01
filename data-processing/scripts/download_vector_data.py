"""
Script to download and process vector data for Wetlands project.
"""

from processing.config import OUTPUT_DIR, RAW_DATA_DIR, SAHEL_BOUNDARY_FILE, SAHEL_COUNTRIES
from processing.helpers.countries_processing import process_countries_workflow
from processing.helpers.hydrobasins_processing import process_hydrobasins_workflow
from rich.console import Console

console = Console()


def main():
    """Download and process vector data."""
    console.print("🚀 Starting vector data processing workflow...")

    # Process HydroBASINS data
    console.print("\n" + "=" * 60)
    console.print("📊 PROCESSING HYDROBASINS DATA")
    console.print("=" * 60)

    hydrobasins_gdf = process_hydrobasins_workflow(
        raw_data_dir=RAW_DATA_DIR,
        output_dir=OUTPUT_DIR,
        sahel_boundary_path=SAHEL_BOUNDARY_FILE,
        upload_to_s3=False,
    )

    # Process country data
    console.print("\n" + "=" * 60)
    console.print("🌍 PROCESSING COUNTRY DATA")
    console.print("=" * 60)

    countries_gdf = process_countries_workflow(
        output_dir=OUTPUT_DIR, countries=SAHEL_COUNTRIES, upload_to_s3=False
    )

    # Summary
    console.print("\n" + "=" * 60)
    console.print("✅ ALL PROCESSING COMPLETED!")
    console.print("=" * 60)
    console.print(f"📈 Processed {len(hydrobasins_gdf)} basin features")
    console.print(f"🗺️  Processed {len(countries_gdf)} countries")
    console.print(f"💾 Files saved to: {OUTPUT_DIR}")
    console.print("☁️  Files uploaded to S3")


if __name__ == "__main__":
    main()
