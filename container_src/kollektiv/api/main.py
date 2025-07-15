from fastapi.routing import APIRouter

from kollektiv.api.routes import debug, documents, health, retrieve, root, stats
from kollektiv.infrastructure.settings import Environment, get_settings

api_router = APIRouter()

api_router.include_router(root.router)
api_router.include_router(documents.router)
api_router.include_router(health.router)
api_router.include_router(retrieve.router)
api_router.include_router(stats.router)

settings = get_settings()

if settings.environment == Environment.LOCAL:
    api_router.include_router(debug.router)
