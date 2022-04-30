\encoding UTF-8


CREATE TABLE seating_chart (
  chart_cd VARCHAR(100),
  name VARCHAR(4000),
  image BYTEA,
  PRIMARY KEY (chart_cd)
);

CREATE TABLE seat_info (
  seat_id VARCHAR(100),
  chart_cd VARCHAR(100),
  x INTEGER,
  y INTEGER,
  PRIMARY KEY (seat_id)
);

CREATE TABLE user_info (
  user_cd VARCHAR(100),
  seat_id VARCHAR(100),
  name VARCHAR(4000),
  furigana VARCHAR(4000),
  create_date TIMESTAMP,
  PRIMARY KEY (seat_id)
);