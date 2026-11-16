from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, languages, levels, goals

app = FastAPI(title="Language_Learner_Api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(languages.router, prefix="/languages", tags=["Languages"])
app.include_router(levels.router, prefix="/levels", tags=["Levels"])
app.include_router(goals.router, prefix="/goals", tags=["Goals"])


@app.get("/")
def home():
    return {"message": "Welcome to Auvyant API"}