const fileSystem = require('fs');
const path = require('path');

const manifest = require('../configs/manifest.json');

manifest.description = process.env.npm_package_description;
manifest.version = process.env.npm_package_version;

fileSystem.writeFileSync(
    path.join(__dirname, '../build/manifest.json'),
    JSON.stringify(manifest)
);
