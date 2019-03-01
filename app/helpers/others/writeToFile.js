import fs from 'fs'
import path from 'path'

export default (buffer, filename) =>
	new Promise((resolve, reject) => {
		const filePath = path.resolve(filename)
		fs.writeFile(filePath, buffer, err => {
			if (err) reject(err)
			resolve(filePath)
		})
	})
