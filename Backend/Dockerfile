FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Prevent stray local .env from overriding platform-provided environment variables
RUN rm -f .env || true

EXPOSE 3001

CMD ["node", "index.js"]
