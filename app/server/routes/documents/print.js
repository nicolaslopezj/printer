import { documents, http, root } from '../../helpers'
import { aws, db, printers } from '../../../helpers'

export default async (req, res, next) => {
	const { body, headers, params } = req

	Object.keys(req.params).forEach(key => {
		if (key === '') return res.status(400).send('missing params')
	})

	const origin = root.url(headers.origin)
	const env = root.envMap(headers.origin)
	const baseUrl = `${origin}/endpoint`
	const { _id } = body
	const { type, srcField, statusField, status } = params
	const ordenId = _id

	try {
		const endpointTokens = await aws.dynamoDb.getToken(env)
		const { documentPrinter } = await db.get()
		const tramitesFromOt = await http.single(
			`${baseUrl}`,
			env,
			'tramitesFromOT',
			{ ordenId },
			endpointTokens.tramitesFromOt
		)

		if (tramitesFromOt.length === 0)
			return res.status(400).send('No hay documentos para imprimir')

		tramitesFromOt.forEach(async (tramite, index) => {
			if (!tramite[srcField]) return
			if (tramite[statusField] !== status) return
			const object = tramite[srcField]

			if (typeof object === 'object') {
				const { bucket, key } = object
				if (type === 'printer') {
					const buffer = await aws.s3.download(bucket, key)
					return printers.print(buffer, documentPrinter)
				} else if (type === 'window') {
					const url = `https://s3.amazonaws.com/${bucket}/${key}`
					return documents.openWindow(url, index * 30)
				}
			} else if (typeof object === 'string') {
				if (type === 'printer') {
					const urlArray = object.split('/')
					const bucket = urlArray.slice(3)[0]
					const key = urlArray.slice(4).join('/')
					const buffer = await aws.s3.download(bucket, key)
					return printers.print(buffer, documentPrinter)
				} else if (type === 'window') {
					return documents.openWindow(object, index * 30)
				}
			}
		})
		return res.status(200).json({ msg: 'success' })
	} catch (err) {
		return next(err)
	}
}
