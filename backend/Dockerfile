# Use an official Python runtime as a parent image
FROM python:3.12

# Install necessary system packages
RUN apt-get update --fix-missing && apt-get install -y \
    chromium-driver \
    build-essential \
    libssl-dev \
    libffi-dev \
    libxml2-dev \
    libxslt1-dev \
    zlib1g-dev \
    libbz2-dev \
    libsqlite3-dev \
    wget \
    curl \
    unzip \
    gnupg

# Install Chromium manually
RUN curl -sSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV CHROME_BIN /usr/bin/chromium-browser
ENV CHROME_DRIVER /usr/bin/chromedriver
# Set the working directory in the container
WORKDIR /backend

# Copy the dependencies file to the working directory
COPY ./requirements.txt .
#Upgrade pip
RUN pip install --upgrade pip
# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code to the working directory
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Ensure Chrome is available and can be found by webdriver_manager
RUN ln -s /usr/bin/chromedriver /usr/local/bin/chromedriver
# Expose the application port
EXPOSE 8000

# Start the application
CMD ["gunicorn", "project.wsgi:application", "--bind", "0.0.0.0:8000"]

# Run Django server
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
