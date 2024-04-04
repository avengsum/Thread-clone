FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT = 5000
ENV MONGODB_URL ="mongodb://localhost:27017/mydatabase"
ENV JWT_SECRET="your_default_jwt_secret_here"

ENV CLOUDINARY_NAME = "your CLOUDINARY_NAME"
ENV CLOUDINARY_API_KEY = "your cloundinary api key"
ENV CLOUDINARY_API_SECRET = "your CLOUDINARY_API_SECRET"


CMD ["npm", "dev"]

