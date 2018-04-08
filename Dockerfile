FROM node:latest
ENV TERM=xterm

USER root

WORKDIR /home/node

COPY package.json /home/node

RUN npm install

COPY index.js config.js /home/node/
COPY lib /home/node/lib

CMD ["npm", "start"]