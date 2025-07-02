"""
Workflow utilities for data processing pipelines.
"""

from dataclasses import dataclass
from typing import Any, Callable, Dict

from rich.console import Console

console = Console()


@dataclass
class ProcessingStep:
    """Configuration for a processing step in a data workflow.

    Attributes:
        name: Display name for the processing step
        emoji: Emoji to use in display (deprecated, use summary_icon instead)
        workflow_func: Function to execute for this step
        kwargs: Keyword arguments to pass to the workflow function
        summary_icon: Icon/emoji to display in summary
        summary_template: Template string for summary display (use {count} placeholder)
    """

    name: str
    emoji: str  # Kept for backward compatibility, consider removing in future
    workflow_func: Callable
    kwargs: Dict[str, Any]
    summary_icon: str
    summary_template: str


def print_section_header(title: str) -> None:
    """Print a formatted section header with decorative borders.

    Args:
        title: The title to display in the header
    """
    console.print("\n" + "=" * 60)
    console.print(title)
    console.print("=" * 60)


def execute_workflow_steps(steps: list[ProcessingStep]) -> list[tuple[ProcessingStep, Any]]:
    """Execute a list of processing steps and return results.

    Args:
        steps: List of ProcessingStep objects to execute

    Returns:
        List of tuples containing (step, result) for each executed step
    """
    results = []
    for step in steps:
        print_section_header(step.name)
        result = step.workflow_func(**step.kwargs)
        results.append((step, result))
    return results


def print_workflow_summary(
    results: list[tuple[ProcessingStep, Any]], output_dir: str, upload_to_s3: bool = False
) -> None:
    """Print a summary of workflow execution results.

    Args:
        results: List of (step, result) tuples from workflow execution
        output_dir: Directory where files were saved
        upload_to_s3: Whether files were uploaded to S3
    """
    print_section_header("✅ ALL PROCESSING COMPLETED!")

    for step, result in results:
        # Handle different result types (assuming GeoDataFrames with len() method)
        try:
            count = len(result)
            console.print(f"{step.summary_icon} {step.summary_template.format(count=count)}")
        except (TypeError, AttributeError):
            # Fallback for results that don't have len()
            console.print(f"{step.summary_icon} {step.summary_template.format(count='N/A')}")

    console.print(f"💾 Files saved to: {output_dir}")
    if upload_to_s3:
        console.print("☁️  Files uploaded to S3")
    console.print("🚀 Vector data processing workflow completed successfully!")
