FROM python:3.11-alpine3.18
LABEL maintainer="Realhive Consultants (https://www.realhiveconsultants.com/)"

ENV PYTHONUNBUFFERED=1 \
    PATH="/venv/bin:$PATH"

# Install system dependencies
RUN apk add --update --no-cache \
    netcat-openbsd\
    postgresql-client \
    && apk add --update --no-cache --virtual .tmp-build-deps \
    build-base postgresql-dev musl-dev

# Set up virtual environment
RUN python -m venv /venv && /venv/bin/pip install --upgrade pip

# Install Python dependencies
COPY ./requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt && \
    rm -rf /tmp && \
    apk del .tmp-build-deps

# Add non-root user
RUN adduser --disabled-password --no-create-home django-user

# Copy entrypoint and make it executable
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy application code
WORKDIR /backend
COPY . .

# Use non-root user
USER django-user

EXPOSE 8000

ENTRYPOINT ["/entrypoint.sh"]