# app/main.py
from fastapi import FastAPI
from app.database import Base, engine
from app.routers import animals, records

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ms-prontuario-animal")

app.include_router(animals.router)
app.include_router(records.router)

@app.get("/healthz")
def health():
    return {"status": "ok"}
