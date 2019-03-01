import axios from 'axios'
import { root } from '../../helpers'
import { db, receipts } from '../../../helpers'

export default async (req, res, next) => {
	const { body, headers } = req
	const origin = root.url(headers.origin)
	const domain = !origin.includes('https') ? 'http://192.168.2.153:3000' : origin
	try {
		const response = await axios({
			method: 'POST',
			url: `${domain}/notaries/${body.environmentId}/work-order/${body.otId}`,
			data: { ...body }
		})

		const voucherData = response.data
		const data = await db.get()
		receipts.printPreformatted(data.receiptPrinter, voucherData)
		return res.status(200).json(voucherData)
	} catch (error) {
		return next(error)
	}
}
