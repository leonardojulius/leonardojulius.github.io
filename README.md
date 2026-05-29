# Portfolio — React + Vite (Dockerized)

A professional developer portfolio built with React and Vite, fully containerized with Docker. No Node.js installation required on your machine.

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) & [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)
- A GitHub account

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/leonardojulius/leonardojulius.github.io.git
cd leonardojulius.github.io
```

### 2. Run in Development Mode

Start the dev server with hot reload:

```bash
docker compose up dev --build
```

Open your browser at **http://localhost:5173**

Any changes you make to files in `src/` will instantly reflect in the browser.

### 3. Run in Production Mode (Preview)

Build and serve the optimized production bundle locally:

```bash
docker compose up prod --build
```

Open your browser at **http://localhost:80**

### 4. Stop Containers

```bash
docker compose down
```

---

## Project Structure

```
├── .github/workflows/deploy.yml   # GitHub Pages CI/CD
├── src/
│   ├── App.jsx                    # Main application component
│   ├── App.css                    # Styles
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
├── package.json                   # Dependencies
├── Dockerfile                     # Production multi-stage build
├── Dockerfile.dev                 # Development container
├── docker-compose.yml             # Docker Compose orchestration
├── nginx.conf                     # Nginx config for production
├── .dockerignore                  # Docker build exclusions
└── .gitignore                     # Git exclusions
```

---

## Customization

Edit `src/App.jsx` to update:

- Your name and bio
- Projects list
- Skills and technologies
- Work experience
- Social links and contact info

All changes hot-reload when running the dev container.

---

## Deploy to GitHub Pages

### First-Time Setup

1. **Create a GitHub repository** named `<your-username>.github.io`

2. **Enable GitHub Pages:**
   - Go to your repo → **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

3. **Push your code:**

```bash
git init
git branch -m main
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git add -A
git commit -m "Initial commit"
git push -u origin main --force
```

### Automatic Deployment

Every push to `main` triggers the GitHub Actions workflow which:

1. Checks out the code
2. Installs dependencies
3. Builds the Vite project
4. Deploys the `dist/` folder to GitHub Pages

Your site will be live at **https://\<your-username\>.github.io** within a few minutes.

### Manual Re-deploy

Just push any change to `main`:

```bash
git add -A
git commit -m "update portfolio"
git push
```

---

## Useful Docker Commands

| Command | Description |
|---------|-------------|
| `docker compose up dev --build` | Start dev server with hot reload |
| `docker compose up prod --build` | Build and serve production bundle |
| `docker compose down` | Stop all containers |
| `docker compose logs dev -f` | Follow dev server logs |
| `docker compose exec dev sh` | Shell into the dev container |

---

## Troubleshooting

**Port already in use:**

```bash
docker compose down
# or change the port in docker-compose.yml
```

**Permission issues on Linux:**

```bash
sudo chown -R $USER:$USER .
```

**Rebuild from scratch (clear cache):**

```bash
docker compose down
docker compose build --no-cache
docker compose up dev
```

---

## License

MIT
