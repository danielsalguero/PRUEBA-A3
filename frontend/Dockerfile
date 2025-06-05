# Etapa de build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Etapa de producción con NGINX
FROM nginx:alpine

# Copiar el build al NGINX
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf 

# Exponer puerto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
