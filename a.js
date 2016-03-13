var index = require('./lib/index');
console.log(index);
var indexDirs = function(dirs) {
    dirs.forEach(function(directory) {
        indexDir(directory);
    });
}
var indexDir = function(path) {
    index.default(path, function(directories) {
        indexDirs(directories);
    });
}
indexDir('/tmp');
