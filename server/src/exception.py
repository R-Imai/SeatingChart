from fastapi import HTTPException

class SeatingChartException(Exception):
    status_code: int = 500

class IllegalArgumentException(SeatingChartException):
    status_code: int = 400

class AlreadyExistExeption(SeatingChartException):
    status_code: int = 409

class AuthenticationException(SeatingChartException):
    status_code: int = 401

class NotFoundException(SeatingChartException):
    status_code: int = 404