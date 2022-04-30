from pydantic import BaseModel
from typing import List, Optional
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

class UserInfo(BaseModel):
  user_cd: str
  seat_id: str
  name: str
  furigana: str
  create_date: Optional[datetime]

class SeatUserInfo(BaseModel): 
  seat_id: str
  x: int
  y: int
  user_cd: Optional[str]
  name: Optional[str]
  furigana: Optional[str]
  create_date: Optional[datetime]