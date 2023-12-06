# Use Node.js 18 as the base image
FROM node:18

# Set the working directory
WORKDIR /taskms/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code to the working directory
COPY . .

# Build the NestJS application
RUN npm run build

# Copy the entrypoint script
COPY entrypoint.sh .

# Give executable permissions to the entrypoint script
RUN chmod +x entrypoint.sh

# Expose the port your app runs on (if needed)
EXPOSE 3000
EXPOSE 3001
EXPOSE 3002
EXPOSE 3003

# Set the entrypoint script as the default command
ENTRYPOINT ["/bin/bash", "entrypoint.sh"]
