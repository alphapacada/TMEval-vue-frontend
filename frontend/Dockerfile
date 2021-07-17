FROM node:12.14.1-alpine

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
RUN echo $NODE_ENV


# default to port 3000 for node
# ARG PORT=8080
# ENV PORT $PORT
# EXPOSE $PORT

# you'll likely want the latest npm, regardless of node version, for speed and fixes
# but pin this version for the best stability
RUN npm i npm@6.14.5 -g
ENV PATH /opt/node_app/node_modules/.bin:$PATH

RUN mkdir /opt/node_app && chown node:node /opt/node_app
WORKDIR /opt/node_app

USER node
COPY package.json package-lock.json* ./

RUN npm install
RUN npm install @vue/cli

EXPOSE 8000
WORKDIR /opt/node_app/app
CMD npm run serve





# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
# RUN mkdir /opt/node_app && chown node:node /opt/node_app
# WORKDIR /opt/node_app


# USER node
# COPY package.json package-lock.json* ./
# # RUN npm install --no-optional && npm cache clean --force
# RUN npm install
# RUN npm install @vue/cli



# # copy in our source code last, as it changes the most
# WORKDIR /opt/node_app/app
# COPY . .


# CMD npm run serve





# RUN mkdir /app && chown node:node /app
# # RUN npm install -g @vue/cli

# # for security and limited privilege
# USER node
# # /srv
# WORKDIR /app

# # add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# # install and cache app dependencies
# # COPY package.json /app/package.json
# COPY --chown=node:node package*.json ./

# # RUN npm install --no-optional && npm cache clean --force
# # EXPOSE 8080

# COPY . .

# CMD npm run serve

