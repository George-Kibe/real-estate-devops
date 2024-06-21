# Use an official Python runtime as a parent image
FROM python:3.12

# install google chrome
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list'
RUN apt-get -y update

# install chromedriver
RUN apt-get install -yqq unzip
RUN wget -O /tmp/chromedriver.zip http://chromedriver.storage.googleapis.com/`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip
RUN unzip /tmp/chromedriver.zip chromedriver -d /usr/local/bin/

# Set the working directory in the container
WORKDIR /backend


ENV PYTHONUNBUFFERED 1
# ENV CHROME_BIN /usr/bin/chromium-browser
# ENV CHROME_DRIVER /usr/bin/chromedriver

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

# Expose the application port
EXPOSE 8000

# Start the application
CMD ["gunicorn", "project.wsgi:application", "--bind", "0.0.0.0:8000"]

# # Run Django server
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
