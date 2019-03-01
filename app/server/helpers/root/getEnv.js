export default function(origin) {
	const isBeta = origin.includes('beta.sodlab.com')
	const isProduction = !isBeta && origin.includes('apps.sodlab.com')

	if (isProduction) {
		return 'prod'
	} else if (isBeta) {
		return 'dev'
	}
	return 'local'
}
