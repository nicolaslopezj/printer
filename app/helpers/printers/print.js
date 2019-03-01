import printer from 'printer'
import { dirname } from 'path'

export default (buffer, printerName) =>
	new Promise((resolve, reject) => {
		const activePrinter = printer.getPrinter(printerName)
		console.log('active printer', activePrinter)

		printer.printDirect({
			data: buffer,
			printer: printerName,
			type: activePrinter.datatype,
			success(jobID) {
				return resolve(jobID)
			},
			error(e) {
				const error = {
					printerError: e,
					message: 'An error ocurred when trying to print',
					path: dirname
				}
				return reject(error)
			}
		})
	})
