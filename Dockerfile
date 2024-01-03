#specify a base image
FROM node:20.10.0-alpine

#specifying a working directory
WORKDIR /usr/app

#copying package.json to container
COPY package.json .
COPY package-lock.json .

#Install dependencies
RUN npm install

#copy every file to container
COPY . . 

#Run build
RUN npm run build

#default command 
CMD ["npm", "run", "start"]