# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project to the working directory
COPY . .

# Build the project
RUN npm run build

# Expose the ports the app runs on
EXPOSE 3000
EXPOSE 443

# Command to run the app when the container starts
CMD [ "npm", "start" ]