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

# Backend portu
EXPOSE 3000

# Uygulamayı çalıştır
CMD ["npm", "start"]
