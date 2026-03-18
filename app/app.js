const express = require('express');
const app = express();
const fs = require('fs');

// read version
const path = require('path');

const versionPath = path.join(__dirname, 'version.txt');

const version = fs.existsSync(versionPath)
    ? fs.readFileSync(versionPath, 'utf8')
    : "v1";

// health state
let isHealthy = true;

// homepage (UI)
app.get('/', (req, res) => {
    res.send(`
        <h1>🚀 Deployment Dashboard</h1>
        <h2>Version: ${version}</h2>
        <p>Status: ${isHealthy ? "Healthy ✅" : "Failed ❌"}</p>
        <p>Try /toggle-failure to simulate crash</p>
    `);
});

// health endpoint (used by Jenkins later)
app.get('/health', (req, res) => {
    res.status(500).send("FAIL");
});

// simulate failure
app.get('/toggle-failure', (req, res) => {
    isHealthy = false;
    res.send("App is now failing!");
});

app.listen(3000, () => console.log("Server running on port 3000"));