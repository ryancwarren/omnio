# NGINX Configuration

Contexts,

- Main.  Affecting entire server.
- Events. Related to network connections, worker processes.
- HTTP.  HTTP traffic.
- Server. Individual virtual server blocks.
- Location.  Inside server blocks.  Match certain URL patterns and define how to handle.


## Main

```
user ubuntu
worker_processes auto                               # CPU cores
pid                     /var/run/nginx.pid          # PID file location
error_log               /var/log/nginx/errors.log

worker_connections      64                          # How many connections worker processes can open.

http {
    sendfile

    server {
        server_name     # Defines domains this server-block listens to.
        access_log      /var/log/nginx/access.log
        root            /var/www/static     # root to serve static files from

        location / {
            proxy_pass https//localhost:3000        # Where to proxy...
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        location ~* \.(gif|jpg|jpeg)$ {
            
        }
    }
}
```