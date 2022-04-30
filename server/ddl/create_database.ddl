CREATE ROLE seat_master WITH LOGIN PASSWORD 'master';
CREATE DATABASE seating_chart_db OWNER = seat_master;