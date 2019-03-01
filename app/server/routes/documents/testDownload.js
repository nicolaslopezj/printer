import { aws, fs } from '../../../helpers'

export default async (req, res, next) => {
	const bucket =
		'https://s3.amazonaws.com/printer-app-files/test/test_receipt.pdf'
	const key = 'test/test_receipt.pdf'

	try {
		const buffer = await aws.download(bucket, key)
		await fs.writeFile(buffer)
		return res.status(200).json({ msg: 'success', buffer })
	} catch (err) {
		return next(err)
	}
}
