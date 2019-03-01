import localStorage from 'electron-json-storage'

export default function() {
	return new Promise((resolve, reject) => {
		localStorage.get('config', (err, data) => {
			if (err) reject(err)
			resolve(data)
		})
	})
}
