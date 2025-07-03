"""
Script to download and pre-process data for Wetlands project.
"""

from processing.config import OUTPUT_DIR, RAW_DATA_DIR, SAHEL_BOUNDARY_FILE, SAHEL_COUNTRIES
from processing.pipelines.countries import process_countries_workflow
from processing.pipelines.hydrobasins import process_hydrobasins_workflow
from processing.pipelines.sahel import process_sahel_workflow
from processing.pipelines.wetlands import download_wetlands
from processing.workflow import ProcessingStep, execute_workflow_steps, print_section_header
from rich.console import Console

console = Console()

UPLOAD_TO_S3 = False


def main():
    """Download and process vector data."""
    console.print("🚀 Starting vector data processing workflow...")

    # Define processing steps
    processing_steps = [
        ProcessingStep(
            name="PROCESSING SAHEL BOUNDARY DATA",
            workflow_func=process_sahel_workflow,
            kwargs={
                "raw_data_dir": RAW_DATA_DIR,
                "file_name": SAHEL_BOUNDARY_FILE.name,
                "output_dir": OUTPUT_DIR,
                "upload_to_s3": UPLOAD_TO_S3,
            },
            summary_template="Processed Sahel boundary data with {count} features",
        ),
        ProcessingStep(
            name="PROCESSING HYDROBASINS DATA",
            workflow_func=process_hydrobasins_workflow,
            kwargs={
                "raw_data_dir": RAW_DATA_DIR,
                "output_dir": OUTPUT_DIR,
                "sahel_boundary_path": SAHEL_BOUNDARY_FILE,
                "upload_to_s3": UPLOAD_TO_S3,
            },
            summary_template="Processed {count} basin features",
        ),
        ProcessingStep(
            name="PROCESSING COUNTRY DATA",
            workflow_func=process_countries_workflow,
            kwargs={
                "output_dir": OUTPUT_DIR,
                "countries": SAHEL_COUNTRIES,
                "upload_to_s3": UPLOAD_TO_S3,
            },
            summary_template="Processed {count} countries",
        ),
        ProcessingStep(
            name="PROCESSING WETLANDS DATA",
            workflow_func=download_wetlands,
            kwargs={
                "output_data_dir": OUTPUT_DIR,
            },
            summary_template="Processed {count} countries",
        ),
    ]

    # Execute processing steps
    execute_workflow_steps(processing_steps)

    # Print final summary
    print_section_header("✅ ALL DATA DOWNLOAD COMPLETED!")
    console.print("🚀 Data download workflow completed successfully!")


if __name__ == "__main__":
    main()
