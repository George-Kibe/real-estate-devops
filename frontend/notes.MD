### Installing docker on an ubuntu server vps
```Add Notes Here```
#### Building a docker image
``` docker build -t next_frontend .```
#### Running the docker image locally or remotely
```docker run -d -p 3000:3000 georgekibe/next_frontend```
This maps the ports locally so that you have a preview as well

#### Pushing to docker hub
```docker push georgekibe/next_frontend```

### Resetting all containers and images
```docker stop $(docker ps -q) && docker rm $(docker ps -a -q) && docker rmi $(docker images -q)```


#### Building linux compatible images since most servers are linux based
```docker build . --platform linux/amd64 -t next_frontend ```

