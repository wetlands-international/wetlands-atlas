import os
import random
import json
from dotenv import load_dotenv
from fastapi import FastAPI
from titiler.core.factory import TilerFactory
from titiler.core.dependencies import ColorMapParams
from starlette.middleware.cors import CORSMiddleware

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

@app.get("/healthz")
def health():
    return {"status": "ok"}
