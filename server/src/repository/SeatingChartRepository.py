from datetime import datetime
from typing import List, Optional

from ..model import Model as model

class SeatingChartRepository:
  def __init__(self):
    self.sql_insert_chart = "INSERT INTO seating_chart (chart_cd, name, image) VALUES (%(chart_cd)s, %(name)s, %(image)s);"
    self.sql_select_chart = "SELECT chart_cd, name, image FROM seating_chart WHERE chart_cd=%s;"
    self.sql_select_chart_list = "SELECT chart_cd, name, image FROM seating_chart;"
    self.sql_update_chart = "UPDATE seating_chart SET name=%(name)s, image=%(image)s WHERE chart_cd=%(chart_cd)s;"
    self.sql_delete_chart = "DELETE FROM seating_chart WHERE chart_cd=%s;"

    self.sql_insert_seat = "INSERT INTO seat_info (seat_id, chart_cd, x, y) VALUES (%(seat_id)s, %(chart_cd)s, %(x)s, %(y)s);"
    self.sql_select_seat_list = "SELECT seat_id, chart_cd, x, y FROM seat_info WHERE chart_cd=%s;"
    self.sql_update_seat = "UPDATE seat_info SET chart_cd=%(chart_cd)s, x=%(x)s, y=%(y)s WHERE seat_id=%(seat_id)s;"
    self.sql_delete_seat = "DELETE FROM seat_info WHERE seat_id=%s;"

    self.sql_insert_user = "INSERT INTO user_info (user_cd, seat_id, name, furigana, create_date) VALUES (%(user_cd)s, %(seat_id)s, %(name)s, %(furigana)s, %(create_date)s);"
    self.sql_delete_user = "DELETE FROM user_info WHERE seat_id=%s;"
    self.sql_delete_user_batch = "DELETE FROM user_info WHERE create_date<%s;"
    self.sql_select_seat_user_list = """
      SELECT
        seat_info.seat_id,
        seat_info.x,
        seat_info.y,
        user_info.user_cd,
        user_info.name,
        user_info.furigana,
        user_info.create_date
      FROM seat_info
        LEFT OUTER JOIN user_info
        ON seat_info.seat_id = user_info.seat_id
      WHERE chart_cd=%s;
    """

  def insert_chart(self, cur, chart_info:model.SeatingChart) -> None:
    query_param = dict(
      chart_cd = chart_info.chart_cd,
      name = chart_info.name,
      image = chart_info.image,
    )
    cur.execute(self.sql_insert_chart, query_param)

  def select_chart(self, cur, chart_cd:str) -> model.SeatingChart:
    cur.execute(self.sql_select_chart, (chart_cd,))
    result = cur.fetchone()
    if result is None:
      return None
    return model.SeatingChart(chart_cd=result[0], name=result[1], image=result[2].tobytes())

  def select_chart_list(self, cur) -> List[model.SeatingChart]:
    cur.execute(self.sql_select_chart)
    rows = cur.fetchall()
    return list(map(lambda x: model.SeatingChart(chart_cd=x[0], name=x[1], image=x[2].tobytes()), rows))

  def update_chart(self, cur, chart_info:model.SeatingChart) -> None:
    query_param = dict(
      chart_cd = chart_info.chart_cd,
      name = chart_info.name,
      image = chart_info.image,
    )
    cur.execute(self.sql_update_chart, query_param)

  def delete_chart(self, cur, chart_cd:str) -> None:
    cur.execute(self.sql_delete_chart, (chart_cd,))

  def insert_seat(self, cur, seat_info:model.SeatInfo) -> None:
    query_param = dict(
      seat_id = seat_info.seat_id,
      chart_cd = seat_info.chart_cd,
      x = seat_info.x,
      y = seat_info.y,
    )
    cur.execute(self.sql_insert_seat, query_param)

  def select_seat_list(self, cur, chart_cd:str) -> List[model.SeatInfo]:
    cur.execute(self.sql_select_seat_list, (chart_cd,))
    rows = cur.fetchall()
    return list(map(lambda x: model.SeatInfo(seat_id=x[0], chart_cd=x[1], x=x[2], y=y[3]), rows))

  def update_seat(self, cur, seat_info:model.SeatInfo) -> None:
    query_param = dict(
      seat_id = seat_info.seat_id,
      chart_cd = seat_info.chart_cd,
      x = seat_info.x,
      y = seat_info.y,
    )
    cur.execute(self.sql_update_seat, query_param)

  def delete_seat(self, cur, seat_id:str) -> None:
    cur.execute(self.sql_delete_chart, (seat_id,))

  def insert_user(self, cur, user_info=model.UserInfo) -> None:
    query_param = dict(
      user_cd = user_info.user_cd,
      seat_id = user_info.seat_id,
      name = user_info.name,
      furigana = user_info.furigana,
      create_date = user_info.create_date,
    )
    cur.execute(self.sql_insert_user, query_param)

  def delete_user(self, cur, seat_id:str) -> None:
    cur.execute(self.sql_delete_user, (seat_id,))

  def delete_user_batch(self, cur, target_time:datetime) -> None:
    cur.execute(self.sql_delete_user_batch, (target_time,))

  def select_seat_user_list(self, cur, chart_cd:str) -> List[model.SeatUserInfo]:
    cur.execute(self.sql_delete_user, (chart_cd,))
    rows = cur.fetchall()
    return list(map(lambda x: model.SeatingChart(seat_id=x[0], x=x[1], y=x[2], user_cd=x[3], name=x[4], furigana=x[5], create_date=x[6]), rows))

