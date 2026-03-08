#!/bin/bash

# Tencent Cloud Deployment Script
# Usage: ./scripts/deploy-tencent.sh

set -e

# Configuration
SERVER_HOST="150.158.20.143"
SERVER_PORT="22"
SERVER_USER="root"
SERVER_PATH="/var/www/udefined.cc"
DOMAIN="udefined.cc"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}======================================${NC}"
echo -e "${YELLOW}  Deploying to Tencent Cloud${NC}"
echo -e "${YELLOW}======================================${NC}"

# Step 1: Build the project
echo -e "${GREEN}[1/5] Building project...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}Build completed successfully!${NC}"

# Step 2: Create deployment package
echo -e "${GREEN}[2/5] Creating deployment package...${NC}"
TEMP_DIR=$(mktemp -d)
cp -r out/* "$TEMP_DIR/"
cp package.json "$TEMP_DIR/"
cp -r public "$TEMP_DIR/" 2>/dev/null || true

# Step 3: Connect to server and backup
echo -e "${GREEN}[3/5] Connecting to Tencent Cloud server...${NC}"

ssh -o StrictHostKeyChecking=no -p $SERVER_PORT $SERVER_USER@$SERVER_HOST << 'EOF'
    echo "Backing up current version..."
    if [ -d /var/www/udefined.cc ]; then
        sudo cp -r /var/www/udefined.cc /var/www/udefined.cc.backup.$(date +%Y%m%d%H%M%S)
    fi
    
    echo "Creating directory..."
    sudo mkdir -p /var/www/udefined.cc
    
    echo "Backup complete!"
EOF

# Step 4: Upload files
echo -e "${GREEN}[4/5] Uploading files to server...${NC}"
scp -o StrictHostKeyChecking=no -P $SERVER_PORT -r "$TEMP_DIR"/* $SERVER_USER@$SERVER_HOST:$SERVER_PATH/

# Step 5: Setup Nginx
echo -e "${GREEN}[5/5] Configuring Nginx...${NC}"

ssh -o StrictHostKeyChecking=no -p $SERVER_PORT $SERVER_USER@$SERVER_HOST << 'EOF'
    echo "Creating Nginx configuration..."
    sudo tee /etc/nginx/conf.d/udefined.cc.conf > /dev/null << 'NGINX'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name udefined.cc www.udefined.cc 150.158.20.143;

    root /var/www/udefined.cc;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~ /\. {
        deny all;
    }
}
NGINX

    echo "Removing default server block from nginx.conf if exists..."
    sudo sed -i '/^server {/,/^}/d' /etc/nginx/nginx.conf
    
    echo "Testing Nginx config..."
    sudo nginx -t
    
    echo "Reloading Nginx..."
    sudo systemctl reload nginx || sudo nginx -s reload
    
    echo "Deployment complete!"
EOF

# Cleanup
rm -rf "$TEMP_DIR"

echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}  Deployment Successful!${NC}"
echo -e "${GREEN}  Domain: http://${DOMAIN}${NC}"
echo -e "${GREEN}======================================${NC}"
