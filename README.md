# Real Estate Website UI and Data Scrapping
## Frontend
Nextjs stack
Stripe for payment Auth
## Backend
Python django for REST APIs and Beautifulsoup for data scrapping

### Resetting all containers and images
```docker stop $(docker ps -q) && docker rm $(docker ps -a -q) && docker rmi $(docker images -q)```

### Running selenium standalone

```docker run -d -p 4444:4444 -v /dev/shm:/dev/shm selenium/standalone-chrome```

### Run Django Management Commands
```python3 manage.py housing_link```

### Copying a file from my computer to a VPS
```scp apttracking-files-admin.json ubuntu@135.148.26.200:/home/ubuntu/project/frontend```