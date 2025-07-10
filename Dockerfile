FROM node:18
COPY . .

RUN npm install
RUN cat .env
RUN npm run build

CMD ["npm", "run", "start"]