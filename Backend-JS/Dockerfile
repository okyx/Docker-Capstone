FROM node
EXPOSE 5000
WORKDIR /BACKEND-JS
COPY . .

RUN npm install npm@latest -g

RUN npm install

CMD ["node", "/BACKEND-JS/src/app.js"]
