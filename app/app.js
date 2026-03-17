const express = require('express');
const app = express();
const fs = require('fs');

// read version
const version = fs.existsSync('version.txt')
    ? fs.readFileSync('version.txt', 'utf8')
    : "v1";

app.get('/', (req, res) => {
    res.send(`Running Version: ${version}`);
});

app.get('/health', (req, res) => {
    res.status(200).send("OK");
});

app.listen(3000, () => console.log("Server running on port 3000"));