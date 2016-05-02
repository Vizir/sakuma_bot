FROM node

RUN apt-get update && apt-get install -y ghostscript imagemagick

COPY . /project

WORKDIR /project

RUN npm install

CMD ["npm", "start"]
