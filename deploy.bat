@echo off
echo Deploying DevOps Project...
docker-compose up -d --build
echo Deployment complete!
echo Your Cloudflare Managed Tunnel is now running!
echo Access your app at: https://dabcoholic.qzz.io
