FROM node:10.22

WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "node", "app.js"]