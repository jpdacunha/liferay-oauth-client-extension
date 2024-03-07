FROM node:18.10.0-alpine3.15

WORKDIR /app

COPY . .

RUN ls /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]