### Install Nodejs- ref nodejs.org

### Install nginx
```sudo apt install nginx -y```

### Check the status of your nginx
```sudo systemctl status nginx```

### Create a new Nginx configuration file for your Next.js application:
```sudo nano /etc/nginx/sites-available/nextjs.conf```


File Contents for linux sample
```
server {
listen 80;
server_name your_server_ip;
location / {
proxy_pass http://localhost:3000;
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection 'upgrade';
proxy_set_header Host $host;
proxy_cache_bypass $http_upgrade;
}
}
```
File Sample for windows server
```
events {
    worker_connections 1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    server {
        listen       80;  # Ensure this line is included
        server_name  144.126.159.44 api.apttracking.com www.api.apttracking.com;

        location / {
            proxy_pass http://localhost:8000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}
```

### Create a symbolic link to enable the configuration (This is a crucial step):
```rm /etc/nginx/sites-enabled/default.conf```
```sudo ln -s /etc/nginx/sites-available/nextjs.conf /etc/nginx/sites-enabled/```

### Restart nginx to ensure new configurations are in effect
```sudo service nginx restart```

### Create a directory that will hold the nextjs application
```mkdir /var/www/nextjs && cd /var/www/nextjs```

### Install Github
```apt install gh```
### Optionally login to github especially if you are using aprivate repo
```gh auth login```

### Clone the Repository you want to use
```git clone https://github.com/George-Kibe/real-estate-devops.git```

### Build and start the application
```npm run build && npm run start```

### Install PM2
```sudo npm install -g pm2```


### Run the application using pm2
```pm2 start npm --name "nextjs" -- start```

###  To ensure PM2 starts on boot, run:
```pm2 startup```

### To reverse the automated process
```pm2 unstartup systemd```


## Installing SSL
```sudo apt update && sudo apt upgrade```

1. Install snapd ```sudo apt install snapd```
2. Install certbot with classic confinement ```sudo snap install certbot --classic```
3. Install and update core ```sudo snap install core && sudo snap refresh core```
4. Make certbot Globally accessible ```sudo ln -s /snap/bin/certbot /usr/bin/certbot```
5. Request SSL certificates using certbot. ```sudo certbot --nginx -d apttracking.com -d www.apttracking.com```
6. Optionally Check the status of the system service. ```sudo systemctl status snap.certbot.renew.service```
7. Optionally simulate certificate renewal process ```sudo certbot renew --dry-run```
8. Ensure port 443(https) is open ```sudo apt install net-tools```
   
## Certbot on windows installation
prerequisite: Python
1. Install Python from the command line. ```python -m pip install certbot```
2. Install plugins. ```python -m pip install certbot-dns-desec```
3. Follow SSL commands from step 5 above without using sudo definitely.
4. Optionally if you are using a subdomain use webroot. ```certbot certonly --webroot -w C:\Users\Administrator\Downloads\project\backend -d api.apttracking.com -d www.api.apttracking.com```
5. For webroot to work, ensure you adjust django url settings as necessary:
   example: 
   ```
    from django.views.static import serve
    from django.urls import re_path
    from django.contrib import admin
    from django.urls import path, include

    urlpatterns = [
        path("admin/", admin.site.urls),
        path("api/", include('core.urls')),
        path("api/", include('resume.urls')),
        # Other urls above
        re_path(r'^.well-known/acme-challenge/(.*)$', serve,
                {'document_root': r'C:\Users\Administrator\Downloads\project\backend\.well-known\acme-challenge'}),
]
   ```
