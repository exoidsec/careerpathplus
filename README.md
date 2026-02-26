
# 🚀 CareerPath

CareerPath is a modern web application built with:

- ⚡ Vite + React + TypeScript
- 🎨 TailwindCSS + shadcn/ui
- 🔥 Supabase (Auth & Database)

This guide explains how to install and host the project using:

- 🐳 Docker
- 🦭 Podman
- 💻 Linux
- 🪟 Windows

---

# 📦 1️⃣ Clone Repository

```bash
git clone https://github.com/exoidsec/careerpath.git
cd careerpath
````

---

# 🔐 2️⃣ Setup Environment Variables

Create a `.env` file in the root directory:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

⚠️ Do NOT commit your `.env` file.

---

# 🐳 3️⃣ Run with Docker (Linux & Windows)

## Install Docker

### Linux (Fedora)

```bash
sudo dnf install docker
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```

### Ubuntu

```bash
sudo apt install docker.io
sudo systemctl enable --now docker
```

### Windows

Install Docker Desktop:
[https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

---

## Build Docker Image

```bash
docker build -t careerpath .
```

---

## Run Container

```bash
docker run -d -p 8080:80 --name careerpath-app careerpath
```

Open in browser:

```
http://localhost:8080
```

---

# 🦭 4️⃣ Run with Podman (Linux)

Podman is a daemonless Docker alternative.

## Install Podman

### Fedora

```bash
sudo dnf install podman
```

### Ubuntu

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

# 🏗️ 5️⃣ Dockerfile (Production Setup)

Make sure your project includes this Dockerfile:

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

# 🛑 Stop & Remove Container

## Docker

```bash
docker stop careerpath-app
docker rm careerpath-app
```

## Podman

```bash
podman stop careerpath-app
podman rm careerpath-app
```

---

# 🌍 Optional: Deploy to VPS

You can deploy on:

* DigitalOcean
* Linode
* Any Linux VPS

Install Docker, clone repo, build, and run.

---

# 🧠 Architecture

Frontend: Vite + React
Backend: Supabase
Container: Docker / Podman
Web Server: Nginx



