#!/bin/bash
# Start both Next.js sites with PM2

cd /var/www/hostingocean/frontend/hosting-main-site
pm2 start npm --name hosting-main-site -- start

cd /var/www/hostingocean/frontend/solutions-site
AI_API_KEY=${GROQ_API_KEY} AI_PROVIDER=groq pm2 start npm --name solutions-site -- start

pm2 save
pm2 startup systemd -u root --hp /root
echo "PM2 configured. Run the startup command shown above to enable autostart."
