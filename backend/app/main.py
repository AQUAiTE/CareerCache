from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.routes import email  # , db_route
from backend.app.core.config import settings
from contextlib import asynccontextmanager

from backend.app.services.email_services import initialize_watcher, stop_gmail_watcher


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Code to run on startup
    historyId = initialize_watcher()
    app.state.historyId = historyId

    yield

    # Code to run on shutdown
    stop_gmail_watcher()

app = FastAPI(lifespan=lifespan, title=settings.PROJECT_NAME)

# ✅ Add CORS middleware here
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def hello():
    return {"message": "Hello, welcome to this app"}

# Register API routers
app.include_router(email.router, prefix="/email", tags=["email"])
# app.include_router(db_route.router, prefix="/db", tags=["db"])
