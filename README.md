# 🚀 CareerPath

CareerPath is a modern web application built with:

- ⚡ Vite + React + TypeScript
- 🎨 TailwindCSS + shadcn/ui
- 🔥 Supabase (Auth & Database)

This guide explains how to install and host the project using:

- 📦 NPM (recommended for development)
- 🐳 Docker
- 🦭 Podman
- 💻 Linux & 🪟 Windows

---

# 📦 1️⃣ Clone the Repository

```bash
git clone https://github.com/exoidsec/careerpath.git
cd careerpath
````

---

# 🔐 2️⃣ Setup Environment Variables

Create a `.env` file in the root directory:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

⚠️ Do NOT commit your `.env` file.

---

# 🧑‍💻 3️⃣ Install & Run Using NPM (Recommended)

## ✅ Install Node.js

Download Node.js (LTS):
[https://nodejs.org/](https://nodejs.org/)

Check installation:

```bash
node -v
npm -v
```

---

## 📥 Install Dependencies

```bash
npm install
```

---

## ▶️ Start Development Server

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

# 🐳 4️⃣ Run with Docker (Linux & Windows)

## Install Docker

Linux (Ubuntu):

```bash
sudo apt install docker.io
sudo systemctl enable --now docker
```

Fedora:

```bash
sudo dnf install docker
sudo systemctl enable --now docker
```

Windows:
Install Docker Desktop from:
[https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

---

## 🏗️ Build Docker Image

```bash
docker build -t careerpath .
```

---

## ▶️ Run Container

```bash
docker run -d -p 8080:80 --name careerpath-app careerpath
```

Open:

```
http://localhost:8080
```

---

# 🦭 5️⃣ Run with Podman (Linux)

## Install Podman

Fedora:

```bash
sudo dnf install podman
```

Ubuntu:

```bash
sudo apt install podman
```

---

## Build Image

```bash
podman build -t careerpath .
```

---

## Run Container

```bash
podman run -d -p 8080:80 --name careerpath-app careerpath
```

Open:

```
http://localhost:8080
```

---

# 🏗️ Dockerfile (Production Setup)

Make sure your project includes:

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

# 🚫 .dockerignore

Create a `.dockerignore` file:

```
node_modules
.git
.env
dist
```

---

# 🛑 Stop Containers

Docker:

```bash
docker stop careerpath-app
docker rm careerpath-app
```

Podman:

```bash
podman stop careerpath-app
podman rm careerpath-app
```

---

# 🧠 Architecture

Frontend: Vite + React
Backend: Supabase
Server: Nginx
Container: Docker / Podman





