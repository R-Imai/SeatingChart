from pydantic import BaseModel
from typing import Optional, Literal
from datetime import datetime

class AppInfo(BaseModel):
  name: str = "Seating Chart"
  version: str
  description: str = "座席表アプリケーション"

class SeatingChart(BaseModel):
  chart_cd: str
  name: str
  image: str

class SeatInfo(BaseModel):
  seat_id: str
  chart_cd: str
  x: int
  y: int

class SeatUpdateInfo(BaseModel):
  seat_id: Optional[str]
  x: int
  y: int
  status: Optional[Literal['add', 'update', 'delete']]

class UserInfo(BaseModel):
  user_cd: str
  seat_id: str
  name: str
  furigana: str
  create_date: Optional[datetime]

class UserRegisterInfo(BaseModel):
  seat_id: str
  user_cd: str
  name: str
  furigana: str

class SeatUserInfo(BaseModel): 
  seat_id: str
  x: int
  y: int
  user_cd: Optional[str]
  name: Optional[str]
  furigana: Optional[str]
  create_date: Optional[datetime]

class ResponseSeatingCharts(BaseModel):
  data: list[SeatingChart]

class ResponseSeatInfo(BaseModel):
  data: list[SeatInfo]

class ResponseSeatUserInfo(BaseModel):
  data: list[SeatUserInfo]