import fs from 'fs'
import path from 'path'

export default buffer =>
	new Promise((resolve, reject) => {
		fs.writeFile(path.resolve('test_download.pdf'), buffer, err => {
			if (err) reject(err)

			resolve('saved to fs')
		})
	})
