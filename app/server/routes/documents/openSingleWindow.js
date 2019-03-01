import { documents } from '../../helpers'

export default async (req, res, next) => {
	const { body } = req

	try {
		documents.openWindow(body.documentoFEA, 30)
		return res.status(200).json({ msg: 'success' })
	} catch (err) {
		return next(err)
	}
}
