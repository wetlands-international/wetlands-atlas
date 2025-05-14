from fastapi import FastAPI
from titiler.core.factory import TilerFactory

app = FastAPI(title="Mini Titiler")

# Create a tiler (COG = Cloud-Optimized GeoTIFF)
cog_tiler = TilerFactory()
app.include_router(cog_tiler.router, prefix="/cog", tags=["cog"])

@app.get("/healthz")
def health():
    return {"status": "ok"}
