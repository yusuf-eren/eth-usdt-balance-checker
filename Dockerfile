FROM node:14.17.1-alpine

WORKDIR /usr/app/paribuhub-case

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "node", "./dist/main.js"]