FROM node:12.14.1-alpine

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
RUN echo $NODE_ENV
RUN mkdir /app && chown node:node /app
# RUN npm install -g @vue/cli

# for security and limited privilege
USER node
# /srv
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
# COPY package.json /app/package.json
COPY --chown=node:node package*.json ./

RUN npm install --no-optional && npm cache clean --force


EXPOSE 8080

COPY . .

CMD npm run serve

