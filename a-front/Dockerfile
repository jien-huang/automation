FROM node:10-alpine AS build 
WORKDIR /app 
COPY . /app 
RUN npm install && npm run build 

FROM nginx:stable-alpine 
COPY --from=build /app/build /usr/share/nginx/html 
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]

