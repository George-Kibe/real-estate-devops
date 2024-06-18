#### Building a docker image
``` docker build -t next_frontend .```
#### Running the docker image locally
```docker run -p 3000:3000 next_frontend```
This maps the ports locally so that you have a preview as well
#### Building linux compatible images since most servers are linux based
```docker build . --platform linux/amd64 -t next_frontend ```

