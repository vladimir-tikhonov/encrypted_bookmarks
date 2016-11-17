const path = require('path');

const ROOT_PATH = path.join(__dirname, '..');
const SOURCE_PATH = path.join(ROOT_PATH, 'src');
const BUILD_PATH = path.join(ROOT_PATH, 'build');

module.exports = {
    ROOT_PATH: ROOT_PATH,
    SOURCE_PATH: SOURCE_PATH,
    BUILD_PATH: BUILD_PATH,
};
