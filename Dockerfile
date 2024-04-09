FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu proyecto al contenedor
COPY package*.json ./


# Copia los archivos restantes del proyecto al contenedor
COPY . .

# Borra la cache y elimina node_modules    - 
RUN npm cache clean --force && rm -rf node_modules 

# Instala las dependencias
RUN npm install

# Expone los puertos
EXPOSE 3000
EXPOSE 3001

# Ejecuta json-server y la aplicación Next.js simultáneamente
CMD ["npm", "run", "start-with-json-server"]



