const fileSystem = require('fs-extra');
const path = require('path');

// copy the src folder without the unprocessed assets
fileSystem.copySync(
    path.join(__dirname, '../src'),
    path.join(__dirname, '../build'),
    {
        filter: function (path) {
            return !(/\/(js|css)/.test(path));
        },
    }
);

require('./generate_manifest');
