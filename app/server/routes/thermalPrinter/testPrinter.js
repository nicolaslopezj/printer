import { db, receipts } from '../../../helpers'

export default async (req, res, next) => {
	try {
		const receiptData = {}
		receiptData.otId = 123
		receiptData.date = new Date()
		receiptData.total = 3000
		receiptData.materias = [
			{ nombre: 'Item 1', precio: 1000 },
			{ nombre: 'Item 2', precio: 2000 }
		]
		receiptData.rutCliente = '12.345.678-9'
		receiptData.nombreCompleto = 'Sodlab'

		const data = await db.get('')
		receipts.printPreformatted(data.receiptPrinter, receiptData)

		return res.status(200).json(receiptData)
	} catch (error) {
		return next(error)
	}
}
