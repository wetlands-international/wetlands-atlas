"""
This module contains the StyledRasterProcessor class which is used to style raster data using a QML
file and convert it to MBTiles format.
"""

import os
from pathlib import Path

from rich.console import Console

from processing.converters.mbtiles import MBTilesConverterFactory
from processing.data.storage.mapbox import upload_to_mapbox

# Initialize console for rich output
console = Console()


class VectorProcessor:
    """
    A class to convert vector data to MBTiles format and upload it to Mapbox.
    """

    def __init__(
        self,
        input_file: Path,
        output_file: Path,
        min_zoom: int = 4,
        max_zoom: int = 12,
        layer_name: str = None,
        upload: bool = True,
    ):
        """
        Initialize the StyledRasterProcessor object.

        Args:
            input_file (Path): The path to the raster file.
            output_file (Path): The path where the output file will be saved.
            min_zoom (int): Minimum zoom level for MBTiles.
            max_zoom (int): Maximum zoom level for MBTiles.
            layer_name (str): Optional name for the layer.
            upload (bool): Whether to upload the processed file to Mapbox.
        """
        self.input_file = input_file
        self.output_file = output_file
        self.min_zoom = min_zoom
        self.max_zoom = max_zoom
        self.layer_name = layer_name
        self.upload = upload

    def process(self):
        """
        Process the vector data: convert to MBTiles and upload to Mapbox.
        """
        try:
            console.print("📦 Converting to MBTiles...", style="bold white")
            MBTilesConverterFactory.convert(
                self.input_file,
                self.output_file,
                min_zoom=self.min_zoom,
                max_zoom=self.max_zoom,
            )

            console.print(
                f"✅ Processing complete. Output saved to {self.output_file}", style="bold green"
            )

            if self.upload:
                console.print("☁️ Uploading to Mapbox...", style="bold white")
                upload_to_mapbox(
                    source=self.output_file,
                    display_name=self.layer_name or self.output_file.stem,
                    username=os.getenv("MAPBOX_USER"),
                    token=os.getenv("MAPBOX_TOKEN"),
                )
        except Exception as e:
            console.print(f"❌ Error processing raster: {e}", style="bold red")
            raise
