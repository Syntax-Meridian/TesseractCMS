# TesseractCMS: Docker & Deployment Guide

This guide will help you understand and utilize Docker and Docker Compose for setting up, building, and running the Tesseract App.

## Prerequisites

Before you can run the Tesseract App using Docker and Docker Compose, you'll need to ensure you have both Docker and Docker Compose installed on your system. Below are the instructions for Linux and macOS.

## Docker Installation

### Linux

<details>
<summary><u>Ubuntu/Debian</u></summary>

1. **Update Software Repositories**
   ```bash
   sudo apt-get update
   ```

2. **Install Docker**
   ```bash
   sudo apt-get install docker.io
   ```

3. **Start and Enable Docker**
   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   ```
</details>

<details>
<summary><u>Fedora/CentOS</u></summary>

1. **Install Docker**
   ```bash
   sudo dnf install containerd moby-engine
   ```

2. **Start and Enable Docker**
   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   ```
</details>

### macOS

1. **Download Docker Desktop for Mac**

   Visit the [official Docker website](https://www.docker.com/products/docker-desktop) and download Docker Desktop for Mac.

2. **Install Docker Desktop**

   Open the downloaded `.dmg` file and drag the Docker application to your Applications folder.

3. **Run Docker Desktop**

   Navigate to your Applications folder and click on Docker Desktop to start.

## Docker Compose Installation

### Linux

<details>
<summary><u>Ubuntu/Debian</u></summary>

1. **Download the latest Docker Compose release**

   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   ```

2. **Apply executable permissions**

   ```bash
   sudo chmod +x /usr/local/bin/docker-compose
   ```

</details>

<details>
<summary><u>Fedora/CentOS</u></summary>

1. **Download the latest Docker Compose release**

   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   ```

2. **Apply executable permissions**

   ```bash
   sudo chmod +x /usr/local/bin/docker-compose
   ```

</details>


### macOS

Docker Compose comes bundled with Docker Desktop for Mac, so no separate installation is required!

## Verifying Installation

To ensure that Docker and Docker Compose are installed correctly:

- For Docker:
  ```bash
  docker --version
  ```

- For Docker Compose:
  ```bash
  docker-compose --version
  ```

If both commands return a version number, you're all set!

## Dockerfile Overview

Our [`Dockerfile`](../Dockerfile) contains the steps to containerize our Node.js application:

- We're using the official `node:16` image as a base.
- The application resides in `/usr/src/app` within the container.
- We first copy over the `package.json` and `package-lock.json`, install dependencies, and then copy over the rest of the source code.
- The application gets built and is exposed on port `3000`.

## Docker Compose Overview

The [`docker-compose.yml`](../docker-compose.yml) file allows for easier orchestration and configuration:

This configuration:
- Specifies the build context and Dockerfile.
- Maps port `3000` from the container to the host machine.
- Sets environment variables for the database connection.
- Maps the local directory to the container and caches `node_modules`.

## Build and Run Instructions

To manually build and run the application using Docker:

```bash
docker build -t yourImageName .
docker run -p 3000:3000 -e DATABASE_URL=yourDatabaseURL -e DATABASE_PORT=yourDatabasePort yourImageName
```

For a more streamlined process with Docker Compose:

```bash
docker-compose up --build
```

If you frequently update database configurations, utilize the `.env` file to store environment variables. When using `docker-compose`, it will automatically use values from the `.env` file.

## Deployment
<span class="badge">TODO</span>

<style>
.badge {
  background-color: darkred;
  color: white;
  padding: 2px 4px;
  text-align: center;
  border-radius: 0.25em;
}
</style>