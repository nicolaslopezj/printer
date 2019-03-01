export default function(origin) {
	if (origin.includes('http://')) return 'notaria0001'

	const env = origin.split('/')[2].split('.')[0]

	const endpointMap = {
		ronchera: 'notaria0001'
	}

	return endpointMap[env]
}
