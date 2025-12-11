FROM node:24.11-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first (better caching)
COPY package.json package-lock.json ./

RUN npm install

# Copy app source
COPY . .

# Expose backend port
EXPOSE 3000

# start the project
CMD ["npm", "run", "start"]
