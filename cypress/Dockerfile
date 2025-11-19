FROM cypress/included:12.15.0

WORKDIR /e2e

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy Cypress files
COPY . .

# Wait for frontend to be ready
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait