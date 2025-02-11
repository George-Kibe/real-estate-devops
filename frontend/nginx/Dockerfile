FROM nginx:alpine

# Copy Nginx configuration
# COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY default.conf /etc/nginx/conf.d/default.conf

# Expose HTTP and HTTPS ports
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]