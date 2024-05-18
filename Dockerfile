FROM node:20

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g prisma

RUN npx prisma migrate dev --name initial

RUN npm run build

EXPOSE 3000

CMD ["node", "src/index.js"]
