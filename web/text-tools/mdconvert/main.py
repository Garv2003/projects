from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from src.config.config import APP_NAME, VERSION
from src.routes.convert.main import router

app = FastAPI(
    title=APP_NAME,
    version=VERSION
)

app.mount("/static", StaticFiles(directory="src/static"), name="static")

app.include_router(router)
