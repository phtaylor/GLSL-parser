const path = require('path');

module.exports = {
    entry:"./src/index.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        filename:'bundle.js',

    },
    module: {
        rules:[
            {
                test:/\.js/,
                use: [
                    {
                      loader: path.resolve('glsl_loader.js'),
                      options: {/* ... */}
                    }
                ] 
            }
        ]
    }
}