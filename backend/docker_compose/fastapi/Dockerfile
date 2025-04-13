FROM python:3.12.1

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

COPY ./requirements/fastapi.txt /app/
RUN pip install --no-cache-dir -r fastapi.txt

COPY ../../fastapi /app/fastapi

