from fastapi import FastAPI, HTTPException, Response
from starlette.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from starlette.responses import JSONResponse, FileResponse

from src.model import Model as model

app = FastAPI()
origins = [
  "http://localhost:3000",
  "http://127.0.0.1",
  "http://192.168.1.20"
  "http://192.168.1.18"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

def __mk_responce_json(model):
  json_model = jsonable_encoder(model)
  return JSONResponse(content=json_model)

# ルート
@app.get("/api/", response_model=model.AppInfo)
def root():
  info = app_model.AppInfo(version="0.0.1")
  return __mk_responce_json(info)