"""
Local file storage operations.
"""

from pathlib import Path
from typing import Union

import geopandas as gpd
from rich.console import Console

console = Console()


def save_geodataframe(
    gdf: gpd.GeoDataFrame,
    output_path: Union[str, Path],
    driver: str = "GeoJSON",
    create_dirs: bool = True,
) -> Path:
    """
    Save GeoDataFrame to local file.

    Parameters
    ----------
    gdf : gpd.GeoDataFrame
        The GeoDataFrame to save
    output_path : Union[str, Path]
        Local file path to save to
    driver : str, default "GeoJSON"
        File format driver
    create_dirs : bool, default True
        Whether to create parent directories if they don't exist

    Returns
    -------
    Path
        The path where the file was saved
    """
    output_path = Path(output_path)

    if create_dirs:
        output_path.parent.mkdir(parents=True, exist_ok=True)

    gdf.to_file(output_path, driver=driver)
    console.print(f"💾 Saved to {output_path}")

    return output_path
