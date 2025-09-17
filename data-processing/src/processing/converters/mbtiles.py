"""
A module to convert different file formats to MBTiles format using a factory pattern.
"""

import subprocess
from abc import ABC, abstractmethod
from pathlib import Path
from typing import Dict, Type

from rich.console import Console

console = Console()


class MBTilesConverter(ABC):
    """Abstract base class for MBTiles converters."""

    @abstractmethod
    def convert(self, input_path: Path, output_path: Path, **kwargs) -> None:
        """Convert input file to MBTiles format."""
        pass


class VectorConverter(MBTilesConverter):
    """Converter for vector files (Shapefile, GeoJSON, etc.)."""

    def convert(
        self, input_path: Path, output_path: Path, min_zoom: int = 4, max_zoom: int = 12
    ) -> None:
        """Convert a vector file to MBTiles format."""
        output_path.parent.mkdir(parents=True, exist_ok=True)

        command = [
            "ogr2ogr",
            "-f",
            "MBTiles",
            "-dsco",
            f"MINZOOM={min_zoom}",
            "-dsco",
            f"MAXZOOM={max_zoom}",
            output_path.as_posix(),
            input_path.as_posix(),
        ]

        try:
            file_type = input_path.suffix.upper().replace(".", "")
            console.print(f"🔧 Converting {file_type} to MBTiles...", style="white")
            subprocess.run(command, check=True)
        except subprocess.CalledProcessError as e:
            raise RuntimeError(f"Error converting {input_path.suffix} with OGR: {e}") from e


class MBTilesConverterFactory:
    """
    Factory class to create appropriate converters based on file type.
    Usage:
    1. Auto-detect format and convert
       MBTilesConverterFactory.convert(input_path, output_path, **kwargs)
    2. Create converter manually
       converter = MBTilesConverterFactory.create_converter(file_path)
       converter.convert(input_path, output_path, **kwargs)
    3. Register a new converter
       MBTilesConverterFactory.register_converter(".newext", NewConverterClass)
    """

    _converters: Dict[str, Type[MBTilesConverter]] = {
        ".shp": VectorConverter,
        ".geojson": VectorConverter,
        ".json": VectorConverter,
        ".gpkg": VectorConverter,
        ".kml": VectorConverter,
    }

    @classmethod
    def create_converter(cls, file_path: Path) -> MBTilesConverter:
        """Create appropriate converter based on file extension."""
        file_extension = file_path.suffix.lower()

        converter_class = cls._converters.get(file_extension)
        if not converter_class:
            supported_formats = ", ".join(cls._converters.keys())
            raise ValueError(
                f"Unsupported file format: {file_extension}. Supported formats: {supported_formats}"
            )

        return converter_class()

    @classmethod
    def convert(cls, input_path: Path, output_path: Path, **kwargs) -> None:
        """Convenience method to convert file using appropriate converter."""
        converter = cls.create_converter(input_path)
        converter.convert(input_path, output_path, **kwargs)

    @classmethod
    def register_converter(cls, extension: str, converter_class: Type[MBTilesConverter]) -> None:
        """Register a new converter for a file extension."""
        cls._converters[extension.lower()] = converter_class
