import os
import random
import json
from dotenv import load_dotenv
from fastapi import FastAPI
from titiler.core.factory import TilerFactory
from titiler.core.dependencies import ColorMapParams

load_dotenv()

tiler_BASE_URL = os.getenv("tiler_BASE_URL", "/tiler")

app = FastAPI(title="Mini tiler", root_path=tiler_BASE_URL)

WETLANDS_COLORMAP = {
    11: "#FF00F3",  # F1.1 Permanent upland streams
    12: "#000CFF",  # F1.2 Permanent lowland rivers
    14: "#CCDE57",  # F1.4 Seasonal upland streams
    15: "#3898DF",  # F1.5 Seasonal lowland rivers
    16: "#D8255B",  # F1.6 Episodic arid rivers
    21: "#FB00FF",  # F2.1 Large permanent freshwater lakes
    23: "#8A00FF",  # F2.3 Seasonal freshwater lakes
    25: "#FF1E00",  # F2.5 Ephemeral freshwater lakes
    26: "#E2FDFF",  # F2.6 Permanent salt and soda lakes
    27: "#9CF7F8",  # F2.7 Ephemeral salt lakes
    31: "#5DEFAB",  # F3.1 Large reservoirs
    35: "#D4E613",  # F3.5 Canals ditches and drains
    43: "#155700",  # TF1.3 Permanent marshes
    44: "#5B9A68",  # TF1.4 Seasonal floodplain marshes
    45: "#408F4B",  # TF1.5 Episodic arid floodplains
}

def custom_colormap_params() -> ColorMapParams:  # type: ignore
    return ColorMapParams(colormap=json.dumps(WETLANDS_COLORMAP))


# Hardcode the colormap dependency
cog_tiler = TilerFactory(
    colormap_dependency=custom_colormap_params
)

app.include_router(cog_tiler.router, tags=["tiles"])

@app.get("/healthz")
def health():
    return {"status": "ok"}
