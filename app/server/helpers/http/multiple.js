import singleRequest from './single'

export default function(baseUrl, env, endpoint, elements, elementKey, token) {
	return new Promise((resolve, reject) => {
		const resolvedPromises = elements.map(element => {
			const body = {
				[elementKey]: element[elementKey]
			}

			return singleRequest(baseUrl, env, endpoint, body, token)
		})

		return Promise.all(resolvedPromises)
			.then(dataArray => resolve(dataArray))
			.catch(error => reject(error))
	})
}
