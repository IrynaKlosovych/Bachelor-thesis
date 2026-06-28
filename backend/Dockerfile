# cd backend
# docker build -t backend-app .
# docker run backend-app

FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

COPY . .

EXPOSE $PORT

CMD ["sh", "-c", "gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --timeout 180 --workers 1 --threads 2"]