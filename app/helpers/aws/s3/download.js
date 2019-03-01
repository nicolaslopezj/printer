import { s3 } from '../aws'

export default (bucket, key) => {
	const options = {
		Bucket: getBucketName(bucket),
		Key: key
	}

	return new Promise((resolve, reject) => {
		s3.getObject(options, (err, data) => {
			if (err) return reject(err)

			return resolve(data.Body)
		})
	})
}

function getBucketName(url) {
	if (url.includes('/')) {
		return url.split('/')[3]
	}
	return url
}
