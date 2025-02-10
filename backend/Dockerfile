# Use an official Python runtime as a parent image
FROM python:3.13.1

WORKDIR /backend
ENV PYTHONUNBUFFERED 1

# Install dependencies
COPY ./requirements.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Generate a self-signed SSL certificate inside the container
RUN openssl req -x509 -newkey rsa:4096 -keyout /backend/key.pem -out /backend/cert.pem -days 365 -nodes -subj "/CN=localhost"

# Collect static files
RUN python manage.py collectstatic --noinput

# Expose the application port
EXPOSE 8000

# Start Django with SSL
CMD ["gunicorn", "project.wsgi:application", "--certfile", "/backend/cert.pem", "--keyfile", "/backend/key.pem", "--bind", "0.0.0.0:8000"]
