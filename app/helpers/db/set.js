import localStorage from 'electron-json-storage'

export default function(newData) {
	return new Promise((resolve, reject) => {
		localStorage.set('config', newData, err => {
			if (err) reject(err)
			resolve()
		})
	})
}
