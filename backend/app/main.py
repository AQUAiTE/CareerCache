from fastapi import FastAPI
from backend.app.routes import email # , db_route
from backend.app.core.config import settings
from contextlib import asynccontextmanager


from backend.app.services.email_services import initialize_watcher, stop_gmail_watcher


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Code to run on startup

    # start the watcher
    historyId = initialize_watcher()
    app.state.historyId = historyId

    # create the database
    
    yield
    # Code to run on shutdown
    stop_gmail_watcher()

app = FastAPI(lifespan=lifespan, title = settings.PROJECT_NAME)

@app.get("/")
async def hello():
    return {"message": "Hello, welcome to this app"}

# Register API routers
app.include_router(email.router, prefix="/email", tags=["email"])
# app.include_router(db_route.router, prefix="/db", tags=["db"])