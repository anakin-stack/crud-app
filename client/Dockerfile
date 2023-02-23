FROM node:15.13-alpine

WORKDIR /client

ENV PATH = "./node_modules/.bin:$PATH"

COPY package.json ./
COPY package-lock.json ./



 

COPY . .
RUN npm run build
CMD ["npm", "start"] 