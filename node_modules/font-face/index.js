var path = require('path');

var fontfaceEntryPoint = require.resolve('font-face');
var fontfaceDir = path.dirname(fontfaceEntryPoint);

function includePaths() {
    return fontfaceDir + '/scss/';
}

module.exports = {

    includePaths: includePaths(),

    with: function() {
        var paths  = Array.prototype.slice.call(arguments);
        var result = [].concat.apply(includePaths(), paths);
        return result;
    }

};
