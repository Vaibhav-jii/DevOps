const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// read version
const versionPath = path.join(__dirname, 'version.txt');
const version = fs.existsSync(versionPath)
    ? fs.readFileSync(versionPath, 'utf8').trim()
    : "v1";

// check if this version is faulty (faulty.flag file exists)
const faultyFlagPath = path.join(__dirname, 'faulty.flag');
const isFaulty = fs.existsSync(faultyFlagPath);

// health state — starts as unhealthy if faulty.flag exists
let isHealthy = !isFaulty;

if (isFaulty) {
    console.log("⚠️  faulty.flag detected — app starting in UNHEALTHY state");
}

// homepage (UI)
app.get('/', (req, res) => {
    res.send(`
        <h1>🚀 Deployment Dashboard</h1>
        <h2>Version: ${version}</h2>
        <p>Status: ${isHealthy ? "Healthy ✅" : "Failed ❌"}</p>
    `);
});

// health endpoint (used by Jenkins)
app.get('/health', (req, res) => {
    if (!isHealthy) {
        return res.status(500).send("FAIL");
    }
    res.status(200).send("OK");
});

app.listen(3000, () => console.log(`Server running on port 3000 | Version: ${version} | Healthy: ${isHealthy}`));