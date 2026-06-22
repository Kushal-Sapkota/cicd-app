# cicd-app

A production-style CI/CD pipeline built with Jenkins and Docker, automating the full lifecycle of a Node.js web application — from code push to live deployment.

---

## Pipeline Overview

```
git push → GitHub Webhook → Jenkins triggered automatically
                                    ↓
                            Checkout code
                                    ↓
                            Install dependencies
                                    ↓
                            Run tests (Jest)
                                    ↓
                            Build Docker image
                                    ↓
                            Push to Docker Hub
                                    ↓
                            Deploy container (port 3000)
```

---

## Tech Stack

| Tool | Role |
|---|---|
| Node.js + Express | Web application |
| Jest | Unit testing |
| Docker | Containerization |
| Docker Hub | Image registry |
| Jenkins | CI/CD automation |
| GitHub Webhooks | Auto-trigger on push |
| ngrok | Expose local Jenkins to GitHub |

---

## Project Structure

```
cicd-app/
├── app.js              # Express web server
├── app.test.js         # Jest unit tests
├── Dockerfile          # Container build instructions
├── Jenkinsfile         # Declarative CI/CD pipeline
└── package.json        # Node dependencies
```

---

## Dockerfile

Uses `node:18-alpine` for a minimal image size (~181MB vs ~1.76GB with the full Node image).

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
```

---

## Jenkinsfile — Pipeline Stages

| Stage | What it does |
|---|---|
| Checkout | Pulls latest code from GitHub |
| Install Dependencies | Runs `npm install --include=dev` |
| Test | Runs Jest unit tests |
| Build Docker Image | Builds image tagged with build number (v1, v2...) |
| Push to Docker Hub | Pushes image to `kushal81/cicd-app` |
| Deploy | Stops old container, runs new one on port 3000 |

---

## Key Concepts Demonstrated

- **CI (Continuous Integration)** — every push automatically builds and tests the code
- **CD (Continuous Deployment)** — passing builds are automatically deployed
- **Docker image versioning** — each build produces a tagged image (`v1`, `v2`...) using `BUILD_NUMBER`
- **Secure credentials** — Docker Hub credentials stored in Jenkins global credential store, never hardcoded
- **Safe redeployment** — `docker stop || true` pattern prevents pipeline failure if no container is running
- **Webhook automation** — no manual trigger needed; GitHub notifies Jenkins on every push

---

## How to Run Locally

**Prerequisites:** Docker installed

```bash
docker pull kushal81/cicd-app:v9
docker run -d -p 3000:3000 kushal81/cicd-app:v9
```

Open browser → `http://localhost:3000`

---

## Docker Hub

Image available at: [hub.docker.com/r/kushal81/cicd-app](https://hub.docker.com/r/kushal81/cicd-app)

---

## Author

**Kushal Sapkota**  
[GitHub](https://github.com/Kushal-Sapkota) · [LinkedIn](https://linkedin.com/in/kushal-sapkota) · [Portfolio](https://kushalsapkota81.com.np)