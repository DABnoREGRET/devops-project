# DevOps Base Project

## Project Overview

This is a simple Todo application with:

- **Frontend**: React (port 3000)
- **Backend**: Node.js/Express (port 8080)
- **Database**: PostgreSQL (port 5432)
- When running with docker-compose, the backend listens on port 8080 within the container and is mapped to the host (e.g., 8080).

Your task is to build a complete CI/CD pipeline around this application.

## Project Summary

This project establishes a fully automated and secure DevOps lifecycle for a modern Web Todo application.

### Tech Stack

- **Frontend**: React (served via Nginx)
- **Backend**: Node.js/Express
- **Database**: PostgreSQL 15
- **Infrastructure**: Docker & Docker Compose
- **Security**: Cloudflare Zero Trust (Tunnels) & Hardened OpenSSH
- **CI/CD**: GitHub Actions

### Key Features & Metrics

- **Automated Testing**: 100% test coverage with 7/7 integration tests.
- **Fast Pipeline**: CI/CD execution completes in roughly **45 seconds**.
- **Optimized Containers**: Production images reduced from >1GB to **~150-180MB** using multi-stage builds.
- **Secure Access**: Production environment shielded by Cloudflare; no open inbound ports required.

## Repository Information

- **GitHub Repository**: [https://github.com/DABnoREGRET/devops-project](https://github.com/DABnoREGRET/devops-project)
- **Production URL**: [https://dabcoholic.qzz.io](https://dabcoholic.qzz.io)

## Deployment Details

Detailed reports and architecture diagrams are available in the [docs](./docs) directory.

### Quick Start (Development)

```bash
# Clone the repository
git clone https://github.com/DABnoREGRET/devops-project.git
cd devops-project

# Run with Docker Compose
docker-compose up -d --build
```

## Hosting & Deployment

This application relies on **Docker** and `docker-compose` to orchestrate its containers, ensuring a consistent and reproducible deployment environment.

Additionally, it leverages **Cloudflare Tunnels (`cloudflared`)** to securely expose the locally hosted frontend to the internet as a public domain, without requiring any inbound open ports or complex network configurations.

Access the production app at: [https://dabcoholic.qzz.io](https://dabcoholic.qzz.io)
