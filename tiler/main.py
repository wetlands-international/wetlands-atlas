import os
from dotenv import load_dotenv
from fastapi import FastAPI
from titiler.core.factory import TilerFactory

load_dotenv()

tiler_BASE_URL = os.getenv("tiler_BASE_URL", "/tiler")

app = FastAPI(title="Mini tiler", root_path=tiler_BASE_URL)

# Create a tiler (COG = Cloud-Optimized GeoTIFF)
cog_tiler = TilerFactory()
app.include_router(cog_tiler.router, tags=["tiles"])

@app.get("/healthz")
def health():
    return {"status": "ok"}
