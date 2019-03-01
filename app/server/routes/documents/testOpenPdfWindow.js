import { documents } from '../../helpers'

export default (req, res, next) => {
	try {
		const urlList = [
			'https://s3.amazonaws.com/document-editor/test/1533100137417.2_paginas.pdf',
			'https://s3.amazonaws.com/document-editor/test/1533141573830.Documento_Prueba1.pdf'
		]
		urlList.forEach((url, index) => {
			documents.openWindow(url, index * 10)
		})

		return res.status(200).json({ msg: 'success' })
	} catch (err) {
		return next(err)
	}
}
