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
        workflow_func: Function to execute for this step
        kwargs: Keyword arguments to pass to the workflow function
        summary_template: Template string for summary display (use {count} placeholder)
    """

    name: str
    workflow_func: Callable
    kwargs: Dict[str, Any]
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
    for step in steps:
        print_section_header(f"🌍 {step.name}")
        step.workflow_func(**step.kwargs)
