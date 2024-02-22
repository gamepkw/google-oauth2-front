FROM node:alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# RUN npm install cross-env -D

EXPOSE 3001

CMD ["npm", "run", "dev"]
