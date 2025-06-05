# Imagen base
FROM node:18

# Crear carpeta de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Copiar el archivo init.sql
COPY bd ./bd

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando de arranque
CMD [ "npm", "start" ]
