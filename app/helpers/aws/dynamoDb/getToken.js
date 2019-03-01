import { dynamodb } from '../aws'

export default environmentId =>
	new Promise((resolve, reject) => {
		// change this when the actual production env endpoints exist
		const TableName =
			process.env.NODE_ENV === 'production'
				? 'SodlabApiEndpointsBeta'
				: 'SodlabApiEndpointsBeta'

		const params = {
			Key: {
				environmentId: {
					S: `${environmentId}`
				}
			},
			TableName
		}

		dynamodb.getItem(params, (err, data) => {
			if (err) reject(err)
			let endpointTokens = {}
			Object.keys(data.Item).map(endpointId => {
				endpointTokens = {
					...endpointTokens,
					[endpointId]: data.Item[endpointId].S
				}
				return endpointTokens
			})
			resolve(endpointTokens)
		})
	})
