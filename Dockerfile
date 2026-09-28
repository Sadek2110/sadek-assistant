# ---------- Etapa 1: Build ----------
FROM node:22-alpine AS build

WORKDIR /app

# Instalar dependencias (usa package-lock.json para versions reproducibles)
COPY package.json package-lock.json ./
RUN npm ci

# Copiar el resto del código y compilar
COPY tsconfig.json tsconfig.node.json vite.config.ts index.html ./
COPY src ./src
COPY public ./public
RUN npm run build

# ---------- Etapa 2: Servir ----------
FROM nginx:alpine

# Configuración de Nginx (SPA fallback + cache de assets)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos compilados
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
