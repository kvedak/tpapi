FROM node:14.16.1
LABEL MAINTAINER Michael Hueter <mthueter@gmail.com>

RUN npm install pm2@latest --global --quiet
# add local user for security
RUN groupadd -r techprize \
  && useradd -m -r -g techprize techprize
USER techprize

# copy local files into container, set working directory and user
RUN mkdir -p /home/techprize/app
WORKDIR /home/techprize/app
COPY . /home/techprize/app

RUN npm install --production --quiet

EXPOSE 5000

CMD ["pm2-runtime", "./config/pm2.json"]
