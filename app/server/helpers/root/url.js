import getEnv from './getEnv'

export default function(origin) {
	const urls = {
		local: 'http://localhost:3000',
		dev: 'https://api.beta.sodlab.com',
		prod: 'https://api.apps.sodlab.com'
	}

	const env = getEnv(origin)

	return urls[env]
}
