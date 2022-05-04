import uuid
from datetime import datetime
from datetime import timedelta

from ..repository import SeatingChartRepository as repository
from ..repository import connection

from ..model import Model as model
from ..exception import IllegalArgumentException, AlreadyExistExeption, NotFoundException

BATCH_DELETE_HOUR = 12

def is_empty(data:str) -> bool:
  return data is None or data == ""

class SeatingChartService:
  def __init__(self):
    self.repository = repository.SeatingChartRepository()

  def check_chart_info(self, chart_info:model.SeatingChart) -> bool:
    return is_empty(chart_info.chart_cd) or is_empty(chart_info.name) or is_empty(chart_info.image)

  def check_register_user_info(self, seat_user_info: model.UserRegisterInfo) -> bool:
    return is_empty(seat_user_info.seat_id) or is_empty(seat_user_info.user_cd) or is_empty(seat_user_info.name) or is_empty(seat_user_info.furigana)

  def register_chart(self, chart_info:model.SeatingChart) -> None:
    if self.check_chart_info(chart_info):
      raise IllegalArgumentException("情報が不足しています。")
    try:
      conn = connection.mk_connection()
      with conn.cursor() as cur:
        current_data = self.repository.select_chart(cur, chart_info.chart_cd)
        if current_data is not None:
          raise AlreadyExistExeption("既に使用されている座席表コードです。")
        self.repository.insert_chart(cur, chart_info)
      conn.commit()
    except Exception as e:
      conn.rollback()
      raise e
    finally:
      conn.close()
  
  def get_chart_info(self, chart_cd:str) -> model.SeatingChart:
    if is_empty(chart_cd):
      raise IllegalArgumentException("座席表コードが不足しています。")
    try:
      conn = connection.mk_connection()
      with conn.cursor() as cur:
        chart_info = self.repository.select_chart(cur, chart_cd)
        if chart_info is None:
          raise NotFoundException("情報を取得できませんでした。")
      conn.commit()
    except Exception as e:
      conn.rollback()
      raise e
    finally:
      conn.close()
    return chart_info
  
  def get_all_chart(self) -> list[model.SeatingChart]:
    try:
      conn = connection.mk_connection()
      with conn.cursor() as cur:
        chart_list = self.repository.select_chart_list(cur)
      conn.commit()
    except Exception as e:
      conn.rollback()
      raise e
    finally:
      conn.close()
    return chart_list

  def update_chart(self, chart_info:model.SeatingChart):
    if self.check_chart_info(chart_info):
      raise IllegalArgumentException("情報が不足しています。")
    try:
      conn = connection.mk_connection()
      with conn.cursor() as cur:
        current_data = self.repository.select_chart(cur, chart_info.chart_cd)
        if current_data is None:
          raise NotFoundException("更新対象が見つかりませんでした")
        self.repository.update_chart(cur, chart_info)
      conn.commit()
    except Exception as e:
      conn.rollback()
      raise e
    finally:
      conn.close()

  def delete_chart(self, chart_cd:str) -> None:
    if is_empty(chart_cd):
      raise IllegalArgumentException("座席表コードが不足しています。")
    try:
      conn = connection.mk_connection()
      with conn.cursor() as cur:
        self.repository.delete_chart(cur, chart_cd)
        self.repository.delete_seat_by_chart_cd(cur, chart_cd)
      conn.commit()
    except Exception as e:
      conn.rollback()
      raise e
    finally:
      conn.close()
    
  def _register_seat(self, conn, chart_cd:str, seat_info:model.SeatUpdateInfo):
    if is_empty(chart_cd) or seat_info.x is None or seat_info.y is None:
      raise IllegalArgumentException("情報が不足しています。")
    seat_id = str(uuid.uuid4())[-12:]
    with conn.cursor() as cur:
      self.repository.insert_seat(cur, model.SeatInfo(seat_id=seat_id, chart_cd=chart_cd, x=seat_info.x, y=seat_info.y))
  
  def _update_seat(self, conn, chart_cd:str, seat_info:model.SeatUpdateInfo):
    if is_empty(chart_cd) or is_empty(seat_info.seat_id) or seat_info.x is None or seat_info.y is None:
      raise IllegalArgumentException("情報が不足しています。")
    with conn.cursor() as cur:
      current_data = self.repository.select_seat(cur, chart_cd, seat_info.seat_id)
      if current_data is None:
        raise NotFoundException(f"更新対象が見つかりませんでした 座席ID: {seat_info.seat_id}")
      self.repository.update_seat(cur, model.SeatInfo(seat_id=seat_info.seat_id, chart_cd=chart_cd, x=seat_info.x, y=seat_info.y))
  
  def _delete_seat(self, conn, chart_cd:str, seat_info:model.SeatUpdateInfo):
    if is_empty(chart_cd) or is_empty(seat_info.seat_id):
      raise IllegalArgumentException("情報が不足しています。")
    with conn.cursor() as cur:
      current_data = self.repository.select_seat(cur, chart_cd, seat_info.seat_id)
      if current_data is None:
        raise NotFoundException(f"削除対象が見つかりませんでした 座席ID: {seat_info.seat_id}")
      self.repository.delete_seat(cur, seat_info.seat_id)
  
  def update_seats(self, chart_cd:str, seats_info:list[model.SeatUpdateInfo]):
    if is_empty(chart_cd):
      raise IllegalArgumentException("座席表コードが不足しています。")
    try:
      conn = connection.mk_connection()
      for seat_info in seats_info:
        if seat_info.status is None:
          continue
        if seat_info.status == "add":
          self._register_seat(conn, chart_cd, seat_info)
          continue
        if seat_info.status == "update":
          self._update_seat(conn, chart_cd, seat_info)
          continue
        if seat_info.status == "delete":
          self._delete_seat(conn, chart_cd, seat_info)
          continue
      conn.commit()
    except Exception as e:
      conn.rollback()
      raise e
    finally:
      conn.close()
  
  def get_seats(self, chart_cd:str):
    if is_empty(chart_cd):
      raise IllegalArgumentException("座席表コードが不足しています。")
    try:
      conn = connection.mk_connection()
      with conn.cursor() as cur:
        seats_info = self.repository.select_seat_list(cur, chart_cd)
      conn.commit()
    except Exception as e:
      conn.rollback()
      raise e
    finally:
      conn.close()
    return seats_info
  
  def register_user(self, chart_cd:str, seat_user_info: model.UserRegisterInfo):
    if self.check_register_user_info(seat_user_info):
      raise IllegalArgumentException("情報が不足しています。")
    try:
      conn = connection.mk_connection()
      with conn.cursor() as cur:
        seats_info = self.repository.select_seat(cur, chart_cd, seat_user_info.seat_id)
        if seats_info is None:
          raise NotFoundException("対象の座席情報が見つかりませんでした")
        update_data = model.UserInfo(
          user_cd=seat_user_info.user_cd,
          seat_id=seat_user_info.seat_id,
          name=seat_user_info.name,
          furigana=seat_user_info.furigana,
          create_date=datetime.now()
        )
        self.repository.insert_user(cur, update_data)
      conn.commit()
    except Exception as e:
      conn.rollback()
      raise e
    finally:
      conn.close()

  def delete_user(self, seat_id:str, user_cd:str):
    if is_empty(seat_id) or is_empty(user_cd):
      raise IllegalArgumentException("情報が不足しています。")
    try:
      conn = connection.mk_connection()
      with conn.cursor() as cur:
        user_info = self.repository.select_user(cur, seat_id)
        if user_info is None or user_info.user_cd != user_cd:
          raise NotFoundException("対象の情報が見つかりませんでした")
        self.repository.delete_user(cur, seat_id)
      conn.commit()
    except Exception as e:
      conn.rollback()
      raise e
    finally:
      conn.close()
  
  def get_user_list(self, chart_cd:str):
    if is_empty(chart_cd):
      raise IllegalArgumentException("座席表コードが不足しています。")
    try:
      conn = connection.mk_connection()
      with conn.cursor() as cur:
        self.repository.delete_user_batch(cur, datetime.now() - timedelta(hours=BATCH_DELETE_HOUR))
        seat_user_info = self.repository.select_seat_user_list(cur, chart_cd)
      conn.commit()
    except Exception as e:
      conn.rollback()
      raise e
    finally:
      conn.close()
    return seat_user_info
