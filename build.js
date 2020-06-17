
require('source-map-support').install({ environment: 'node', hookRequire: true, handleUncaughtExceptions: true })
const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

function bundle(name, entry, dest){
	return new Promise((resolve, reject) => {
		const opts = {
		  entry,
		  target: 'node',
		  output: {
		    library: name,
		    libraryTarget: 'umd',
		    filename: 'index.js',
		    path: dest
		  },
		  resolve: { symlinks: false }
		}

		webpack(opts).run((err, stats) => {
		  if (err || stats.hasErrors()) {
		  	if (err)
			  	console.log(err)
			else {
				if ((((stats || {}).compilation || {}).errors || []).length)
					stats.compilation.errors.forEach(err => {
						console.log(err)
					})
				else
					console.log('Unknown bundling error for module: ' + name)
			}
		  	reject({ errors: true })
		  	return
		  }
		  resolve({ success: true })
		})
	})
}

function startBuild() {
	const dest = path.join(__dirname, 'index.js')
	if (fs.existsSync(dest))
		fs.unlinkSync(dest)
	const entry = path.join(__dirname, 'node_modules', 'ytdl-core', 'lib', 'index.js')
	bundle('ytdl-core', entry, __dirname)
		.then((resp) => {
			console.log('Bundle complete: ', resp)
		})
		.catch(err => {
			console.error(err)
		})
}

startBuild()
