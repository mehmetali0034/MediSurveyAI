# Temel imaj
FROM node:18

# Çalışma dizinini ayarla
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Kaynak dosyaları kopyala
COPY . .

# Frontend için build işlemi
RUN npm run build

# Frontend portu
EXPOSE 3010

# Build edilmiş uygulamayı çalıştır
CMD ["npx", "serve", "-s", "build"]
