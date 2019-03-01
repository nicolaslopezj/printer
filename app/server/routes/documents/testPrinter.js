import { aws, db, printers } from '../../../helpers'

export default async (req, res) => {
	const data = await db.get()
	if (!data.documentPrinter)
		return res
			.status(200)
			.json({ message: 'La impresora de documentos no se encuentra configurada' })

	const buffer = await aws.s3
		.download(process.env.AWS_BUCKET, 'test/test_receipt.pdf')
		.catch(err => {
			console.log(err)
			return res.status(500).json({
				err: err.toString(),
				message: 'An error ocurred when trying to download the test file'
			})
		})

	console.log('buffer', buffer)
	const jobId = await printers.print(buffer, data.documentPrinter).catch(err => {
		console.log(err)
		return res.status(500).json({
			err: err.toString(),
			message: 'An error ocurred trying to print the file',
			buffer
		})
	})

	return res.status(200).json({ msg: 'success', jobId })
}
