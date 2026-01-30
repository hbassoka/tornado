# Stage 1: Build Angular app
FROM node:20 AS build

ARG CONFIGURATION=preproduction

ENV CONFIGURATION="${CONFIGURATION}"

WORKDIR /app

COPY package*.json ./
RUN  npm install --legacy-peer-deps

COPY . .
RUN npm run build -- --configuration=${CONFIGURATION}

# Stage 2: Serve opt with NGINX
FROM nginx:alpine

COPY k8s/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/tornado/browser  /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]