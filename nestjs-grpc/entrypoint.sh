#!/bin/bash

# Start services using npm run commands
npm run start:dev apigateway &
npm run start:dev auth PORT=3001 &
npm run start:dev task PORT=3002 &
npm run start:dev user PORT=3003 &

# Wait for services to start (optional)
sleep 10

# Keep the script running to keep the container alive
tail -f /dev/null
