# 🚀 Pipeline Rollback Automation

Automated rollback mechanism for CI/CD pipelines using **Docker** + **Jenkins**.

## How It Works

1. Jenkins builds and deploys a Docker container
2. A **health check** verifies the app is running correctly
3. If healthy → image is tagged as `node-app:stable` ✅
4. If unhealthy → **automatic rollback** to the last stable image ❌→✅

## Project Structure

```
DevOps/
├── app/
│   ├── app.js          # Express.js app with /health endpoint
│   ├── version.txt     # Current version (e.g., v1.01)
│   └── faulty.flag     # If this file exists, app starts unhealthy
├── docker/
│   └── Dockerfile      # Containerizes the Node.js app
├── jenkins/
│   └── Jenkinsfile     # Pipeline with health check + rollback
└── scripts/
    └── deploy-faulty.sh  # Deploy broken version for demo
```

## Demo Steps

### Step 1: Deploy the working version (v1.01)

- Make sure `app/version.txt` contains `v1.01`
- Make sure `app/faulty.flag` does **NOT** exist
- Go to Jenkins → Click **"Build Now"**
- Visit `http://localhost:3000` → Shows **v1.01 — Healthy ✅**

### Step 2: Deploy a broken version (v1.02)

```bash
# Change version
echo "v1.02" > app/version.txt

# Create the faulty flag
touch app/faulty.flag

# Deploy the broken version (outside Jenkins)
./scripts/deploy-faulty.sh
```

- Visit `http://localhost:3000` → Shows **v1.02 — Failed ❌**

### Step 3: Trigger rollback via Jenkins

- Go to Jenkins → Click **"Build Now"**
- Jenkins will:
  1. Build v1.02 (faulty)
  2. Deploy it
  3. Health check **FAILS**
  4. **Automatically rollback** to v1.01 (stable)
- Visit `http://localhost:3000` → Shows **v1.01 — Healthy ✅** 🎉

## Key Concepts Demonstrated

- **Health Checks** — Automated verification of deployment health
- **Image Tagging** — Successful builds tagged as `node-app:stable`
- **Automated Rollback** — On failure, pipeline reverts to last stable image
- **Docker Containerization** — App runs in isolated containers
- **CI/CD Pipeline** — Jenkins orchestrates build, deploy, verify, and rollback
