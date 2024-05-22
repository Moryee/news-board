# Python image
FROM python:3.9.6-alpine

# Work directory
WORKDIR /app/api

# Env variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONFAULTHANDLER 1
ENV PYTHONUNBUFFERED 1

# Install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# Install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# Copy entrypoint.sh
COPY ./entrypoint.sh .
RUN sed -i 's/\r$//g' /app/api/entrypoint.sh
RUN chmod +x /app/api/entrypoint.sh

# Copy project
COPY . .
# RUN flake8 --ignore=E501,F401,F403 .

# Run entrypoint.sh
ENTRYPOINT ["/app/api/entrypoint.sh"]
