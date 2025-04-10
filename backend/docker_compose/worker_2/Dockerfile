FROM python:3.12.1

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH=/app/src:$PYTHONPATH

WORKDIR /app

COPY ./requirements/base-requirements.txt /app/
RUN pip install --no-cache-dir -r base-requirements.txt

COPY ./docker_compose/worker_2/entrypoint.sh /app/
RUN chmod +x /app/entrypoint.sh

COPY ../../src /app/src

ENTRYPOINT ["/app/entrypoint.sh"]