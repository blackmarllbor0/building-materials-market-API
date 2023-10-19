FROM node:14

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY .env ./

COPY . .

RUN npm i -g typescript

RUN npm install

CMD [ "npm", "start" ]