FROM node:20.5.0 as build

WORKDIR /usr/src/app

# Copier les fichiers package.json, package-lock.json et pnpm-lock.yaml (si présent)
COPY package*.json pnpm-lock.yaml* ./

# Installer pnpm et les dépendances du projet
RUN npm install -g pnpm && pnpm install

# Copier le reste des fichiers du projet
COPY . .

# Exposer le port 3000
EXPOSE 3000

# Commande pour lancer l'application en mode de développement
CMD ["pnpm", "run", "dev"]
