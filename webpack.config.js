const path = require('path');

module.exports = {
	mode: 'development',
	entry: './js/main.js',
	output: {
		path: path.resolve(__dirname, 'public/js/dist'),
		filename: 'build.js'
	},
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
				options: {
					presets: ["env"]
				}
			}
		},{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					js: 'babel-loader'
				}
			}
		}]
	}
}
