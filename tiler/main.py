import os
from dotenv import load_dotenv
from fastapi import FastAPI
from titiler.core.factory import TilerFactory
from starlette.middleware.cors import CORSMiddleware
from fastapi import Request
from fastapi.responses import JSONResponse
from rio_tiler.errors import TileOutsideBounds

load_dotenv()

TILER_BASE_URL = os.getenv("TILER_BASE_URL", "/tiler")

app = FastAPI(title="Mini tiler", root_path=TILER_BASE_URL)
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (for development - be more specific in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cog_tiler = TilerFactory()

app.include_router(cog_tiler.router, tags=["tiles"])

# Exception handler for tile errors
@app.exception_handler(TileOutsideBounds)
def tile_outside_bounds_handler(request: Request, exc: TileOutsideBounds):
    return JSONResponse(
        status_code=404,
        content={
            "detail": f"Tile is outside bounds: {exc}"
        },
    )

@app.get("/healthz")
def health():
    return {"status": "ok"}
