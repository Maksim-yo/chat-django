FROM python:3.11-slim as builder

WORKDIR /app

RUN python -m pip install --upgrade pip
COPY requirements.txt .
RUN python -m pip wheel --no-cache-dir --wheel-dir /app/wheels -r requirements.txt


FROM python:3.11-slim

# RUN addgroup --system app && adduser --system --group app

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY --from=builder /app/wheels /wheels
COPY --from=builder /app/requirements.txt .

RUN python -m pip install --no-cache /wheels/*
COPY . /app

# RUN chown -R app:app /app

# USER app