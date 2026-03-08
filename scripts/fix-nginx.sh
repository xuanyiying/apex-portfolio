#!/bin/bash
# Complete fix - run on Tencent Cloud server

echo "=== Step 1: Create directories ==="
sudo mkdir -p /etc/nginx/sites-available
sudo mkdir -p /etc/nginx/sites-enabled

echo "=== Step 2: Remove default config ==="
sudo rm -f /etc/nginx/sites-enabled/default
sudo rm -f /etc/nginx/sites-available/default

echo "=== Step 3: Create udefined.cc config ==="
sudo tee /etc/nginx/sites-available/udefined.cc > /dev/null << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name 150.158.20.143 udefined.cc www.udefined.cc;

    root /var/www/udefined.cc;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~ /\. {
        deny all;
    }
}
EOF

echo "=== Step 4: Enable site ==="
sudo ln -sf /etc/nginx/sites-available/udefined.cc /etc/nginx/sites-enabled/

echo "=== Step 5: Test config ==="
sudo nginx -t

echo "=== Step 6: Reload nginx ==="
sudo nginx -s reload

echo "=== Step 7: Check if nginx is running ==="
sudo systemctl status nginx || ps aux | grep nginx

echo "=== Done! ==="
