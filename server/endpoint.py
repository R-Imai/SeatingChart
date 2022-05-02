from fastapi import FastAPI, HTTPException, Response
from starlette.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from starlette.responses import JSONResponse
import traceback
from typing import List

from src.model import Model as model
from src.service.SeatingChartService import SeatingChartService
from src.exception import SeatingChartException

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

seating_chart_service = SeatingChartService()

def __mk_responce_json(model):
  json_model = jsonable_encoder(model)
  return JSONResponse(content=json_model)

# ルート
@app.get("/api/", response_model=model.AppInfo)
def root():
  info = model.AppInfo(version="0.0.1")
  return __mk_responce_json(info)


@app.post("/api/charts")
def register_chart(chart_info:model.SeatingChart):
  try:
    seating_chart_service.register_chart(chart_info)
  except SeatingChartException as se:
    raise HTTPException(
      status_code=se.status_code,
      detail=str(se),
    )
  except Exception as e:
    traceback.print_exc()
    raise HTTPException(
      status_code=500,
      detail="予期せぬエラーが発生しました。",
    )

@app.get("/api/charts", response_model=model.SeatingChart)
def get_chart_info(chart_cd: str):
  try:
    charts_info = seating_chart_service.get_chart_info(chart_cd)
  except SeatingChartException as se:
    raise HTTPException(
      status_code=se.status_code,
      detail=str(se),
    )
  except Exception as e:
    traceback.print_exc()
    raise HTTPException(
      status_code=500,
      detail="予期せぬエラーが発生しました。",
    )
  return __mk_responce_json(charts_info)

@app.get("/api/charts/list", response_model=List[model.SeatingChart])
def get_all_chart():
  try:
    chart_info = seating_chart_service.get_all_chart()
  except SeatingChartException as se:
    raise HTTPException(
      status_code=se.status_code,
      detail=str(se),
    )
  except Exception as e:
    traceback.print_exc()
    raise HTTPException(
      status_code=500,
      detail="予期せぬエラーが発生しました。",
    )
  return __mk_responce_json(chart_info)

@app.put("/api/charts")
def update_chart(chart_info: model.SeatingChart):
  try:
    seating_chart_service.update_chart(chart_info)
  except SeatingChartException as se:
    raise HTTPException(
      status_code=se.status_code,
      detail=str(se),
    )
  except Exception as e:
    traceback.print_exc()
    raise HTTPException(
      status_code=500,
      detail="予期せぬエラーが発生しました。",
    )

@app.delete("/api/charts")
def delete_chart(chart_cd: str):
  try:
    seating_chart_service.delete_chart(chart_cd)
  except SeatingChartException as se:
    raise HTTPException(
      status_code=se.status_code,
      detail=str(se),
    )
  except Exception as e:
    traceback.print_exc()
    raise HTTPException(
      status_code=500,
      detail="予期せぬエラーが発生しました。",
    )

@app.put("/api/seats")
def update_seats(chart_cd:str, seats_info: List[model.SeatUpdateInfo]):
  try:
    seating_chart_service.update_seats(chart_cd, seats_info)
  except SeatingChartException as se:
    raise HTTPException(
      status_code=se.status_code,
      detail=str(se),
    )
  except Exception as e:
    traceback.print_exc()
    raise HTTPException(
      status_code=500,
      detail="予期せぬエラーが発生しました。",
    )

@app.get("/api/seats", response_model=List[model.SeatInfo])
def get_seats(chart_cd: str):
  try:
    seats_info = seating_chart_service.get_seats(chart_cd)
  except SeatingChartException as se:
    raise HTTPException(
      status_code=se.status_code,
      detail=str(se),
    )
  except Exception as e:
    traceback.print_exc()
    raise HTTPException(
      status_code=500,
      detail="予期せぬエラーが発生しました。",
    )
  return __mk_responce_json(seats_info)

@app.post("/api/users")
def register_user(chart_cd: str, seat_user_info: model.UserRegisterInfo):
  try:
    seating_chart_service.register_user(chart_cd, seat_user_info)
  except SeatingChartException as se:
    raise HTTPException(
      status_code=se.status_code,
      detail=str(se),
    )
  except Exception as e:
    traceback.print_exc()
    raise HTTPException(
      status_code=500,
      detail="予期せぬエラーが発生しました。",
    )

@app.delete("/api/users")
def delete_user(seat_id: str, user_cd: str):
  try:
    seating_chart_service.delete_user(seat_id, user_cd)
  except SeatingChartException as se:
    raise HTTPException(
      status_code=se.status_code,
      detail=str(se),
    )
  except Exception as e:
    traceback.print_exc()
    raise HTTPException(
      status_code=500,
      detail="予期せぬエラーが発生しました。",
    )

@app.get("/api/users/list", response_model=List[model.SeatUserInfo])
def get_user_list(chart_cd: str):
  try:
    users_info = seating_chart_service.get_user_list(chart_cd)
  except SeatingChartException as se:
    raise HTTPException(
      status_code=se.status_code,
      detail=str(se),
    )
  except Exception as e:
    traceback.print_exc()
    raise HTTPException(
      status_code=500,
      detail="予期せぬエラーが発生しました。",
    )
  return __mk_responce_json(users_info)