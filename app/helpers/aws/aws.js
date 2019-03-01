import AWS from 'aws-sdk'

AWS.config.update({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION
})

const s3 = new AWS.S3()

const dynamodb = new AWS.DynamoDB({
	apiVersion: '2012-08-10'
})

export default {
	dynamodb,
	s3
}
