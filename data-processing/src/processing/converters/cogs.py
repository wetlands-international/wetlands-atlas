"""
Module for converting data to COGS format.
"""

from pathlib import Path

from rio_cogeo.cogeo import cog_translate
from rio_cogeo.profiles import cog_profiles


def convert_tif_to_cog(input_file: Path, output_file: Path, resampling: str = "average") -> None:
    """
    Convert a TIFF file to a Cloud Optimized GeoTIFF (COG) format.

    Parameters
    ----------
    input_file : Path
        Path to the input TIFF file.
    output_file : Path
        Path where the output COG file will be saved.
    resampling : str, optional
        Resampling method for overviews. Default is "average".
        Options include: "nearest", "bilinear", "cubic", "cubic_spline",
        "lanczos", "average", "mode", "gauss", "max", "min", "med", "q1", "q3".
    """
    # Get the LZW COG profile with web optimization
    cog_profile = cog_profiles.get("lzw")
    cog_profile.update(
        {
            "BLOCKXSIZE": 512,
            "BLOCKYSIZE": 512,
            "TILED": "YES",
            "COMPRESS": "ZSTD",
            "OVERVIEW_RESAMPLING": resampling,
        }
    )

    # Create the COG
    cog_translate(
        str(input_file),
        str(output_file),
        cog_profile,
        overview_resampling=resampling,
        web_optimized=True,
        quiet=False,
    )
