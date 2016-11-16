/**
 * The main idea here is add the localhost on script tags with data-bundle
 * attribute on development mode.
 */
const fileSystem = require('fs');
const path = require('path');

const env = require('./env.js');

const buildPath = path.join(__dirname, '../build');

const appendLocalhost = function (content) {
    content = content.replace(
        new RegExp('(<script data-bundle src=[\'|"])', 'g'),
        ('$1http://localhost:' + env.PORT + '/')
    );

    content = content.replace(
        /(<\/body>)/,
        '<script src="http://localhost:' + env.PORT + '/webpack-dev-server.js"></script>$1'
    );

    return content;
};

const innerFilesPath = fileSystem.readdirSync(buildPath);

innerFilesPath.forEach((relativeInnerFilePath) => {
    const innerFilePath = path.join(buildPath, relativeInnerFilePath);

    if (/\.html$/.test(innerFilePath)) {
        var content = fileSystem.readFileSync(innerFilePath, 'utf-8');
        fileSystem.writeFileSync(innerFilePath, appendLocalhost(content));
    }
});
