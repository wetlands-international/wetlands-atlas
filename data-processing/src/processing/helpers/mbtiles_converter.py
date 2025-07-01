"""
Module for tippecanoe functions.
"""

import subprocess
from pathlib import Path
from typing import Union

import geopandas as gpd
from rich.console import Console

console = Console()


def convert_dataframe_to_geojson(
    df: gpd.GeoDataFrame, output_path: Path, tolerance: float = None
) -> Path:
    """
    Convert DataFrame to GeoJSON file.

    Args:
        df (gpd.GeoDataFrame): The GeoDataFrame to convert.
        output_path (Path): The path to the output file.
        tolerance (float, optional): Tolerance for geometry simplification.

    Returns:
        Path: The path to the output file.
    """
    try:
        if df.empty:
            raise ValueError("GeoDataFrame is empty")

        if not hasattr(df, "geometry") or df.geometry.isnull().all():
            raise ValueError("GeoDataFrame has no valid geometries")

        output_path.parent.mkdir(parents=True, exist_ok=True)

        if tolerance:
            console.print(f"[yellow]Simplifying geometries with tolerance: {tolerance}[/yellow]")
            # Simplify geometries with a specified tolerance
            df = df.copy()  # Avoid modifying the original dataframe
            df["geometry"] = df["geometry"].simplify(tolerance)

        console.print(f"[green]Writing GeoJSON to: {output_path}[/green]")
        df.to_file(output_path, driver="GeoJSON")

        return output_path

    except Exception as e:
        console.print(f"[red]Error converting DataFrame to GeoJSON: {str(e)}[/red]")
        raise IOError(f"Failed to write GeoJSON file to {output_path}: {str(e)}") from e


def convert_geojson_to_mbtiles(source_path: Path, output_path: Union[Path, None] = None) -> Path:
    """
    Convert GeoJSON file to mbtiles file using tippecanoe.

    Args:
        source_path (Path): The path to the source GeoJSON file.
        output_path (Union[Path, None], optional): The path to the output mbtiles file.
                                                  Defaults to source_path with .mbtiles extension.

    Returns:
        output_path (Path): The path to the output mbtiles file.
    """
    if not source_path.exists():
        raise FileNotFoundError(f"Source file not found: {source_path}")

    if not output_path:
        output_path = source_path.with_suffix(".mbtiles")

    output_path.parent.mkdir(parents=True, exist_ok=True)

    console.print("[blue]Converting GeoJSON to mbtiles...[/blue]")
    console.print(f"[dim]Source: {source_path}[/dim]")
    console.print(f"[dim]Output: {output_path}[/dim]")

    # Check if tippecanoe is available
    try:
        subprocess.run(["tippecanoe", "--version"], capture_output=True, check=True)
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        raise RuntimeError(
            "tippecanoe is not installed or not available in PATH. "
            "Please install tippecanoe: https://github.com/mapbox/tippecanoe"
        ) from e

    # Run tippecanoe command
    subprocess.run(
        [
            "tippecanoe",
            "-zg",  # Automatically choose a maximum zoom level
            "-f",  # Force overwrite of existing files
            "-P",  # Use multiple processes
            "-o",
            str(output_path),
            "--extend-zooms-if-still-dropping",
            str(source_path),
        ],
        capture_output=True,
        text=True,
        check=True,
    )

    console.print(f"[green]Successfully created mbtiles file: {output_path}[/green]")

    return output_path


def mbtile_generation(data: gpd.GeoDataFrame, output_path: Path, tolerance: float = None) -> Path:
    """
    Generate mbtiles file from GeoDataFrame.

    Args:
        data (gpd.GeoDataFrame): The GeoDataFrame to convert.
        output_path (Path): The path to the output mbtiles file.
        tolerance (float, optional): Tolerance for geometry simplification.

    Returns:
        Path: The path to the output mbtiles file.
    """
    if data.empty:
        raise ValueError("Input GeoDataFrame is empty")

    console.print("[blue]Starting mbtiles generation process...[/blue]")

    # Step 1: Create GeoJSON file
    console.print("[cyan]Step 1: Creating GeoJSON file...[/cyan]")
    data_path = convert_dataframe_to_geojson(data, output_path.with_suffix(".json"), tolerance)

    # Step 2: Convert to mbtiles
    console.print("[cyan]Step 2: Converting to mbtiles...[/cyan]")
    mbtiles_path = convert_geojson_to_mbtiles(data_path, output_path.with_suffix(".mbtiles"))

    # Clean up temporary GeoJSON file
    try:
        data_path.unlink()
        console.print(f"[dim]Cleaned up temporary file: {data_path}[/dim]")
    except OSError as e:
        console.print(f"[yellow]Warning: Could not remove temporary file {data_path}: {e}[/yellow]")

    console.print(f"[green]✓ Successfully generated mbtiles file: {mbtiles_path}[/green]")
    return mbtiles_path
