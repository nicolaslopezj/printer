import axios from 'axios'

export default async function(baseUrl, env, endpoint, data, token) {
	return new Promise(async (resolve, reject) => {
		try {
			const url = `${baseUrl}/${env}/${endpoint}`

			const response = await axios({
				method: 'POST',
				url,
				headers: { Authorization: `Bearer ${token}` },
				data
			})

			return resolve(response.data)
		} catch (error) {
			return reject(error)
		}
	})
}
