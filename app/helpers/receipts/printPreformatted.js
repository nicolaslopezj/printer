import printer from 'node-thermal-printer'
import time from '../time'

export default async (printerName, receiptData) => {
	const data = receiptData
	const date = new Date()

	try {
		data.termsOfAgreement =
			data.terminos ||
			'El presente comprobante implica la aceptación de los requerimientos antes descritos'
		data.address = data.direccion || 'Agustinas 1235, Santiago'
		data.phone = data.telefono || '+56226986841'
		data.email = data.email || 'info@notariaronchera.cl'
		data.openHoursOne = data.horario1 || 'Lunes a Jueves, 8:30 a 18:00 hrs.'
		data.openHoursTwo = data.horario2 || 'Viernes, 8:30 a 17:00 hrs.'
		data.openHoursThree = data.horarioExtra || 'Horario continuado'
		data.date = time.getDate(date)
		data.time = time.getTime(date)

		printer.init({
			type: 'epson',
			characterSet: 'CHARCODE_LATINA',
			interface: `printer:${printerName || 'EPSON TM-T20II'}`,
			replaceSpecialCharacters: true
		})

		printer.alignCenter()
		const barcodeData = data.otId
		const type = 74
		const settings = {
			hriPos: 2, // Human readable character 0 - 3 (none, top, bottom, both)
			hriFont: 0, // Human readable character font
			width: 4, // Barcode width
			height: 160 // Barcode height
		}
		printer.printBarcode(barcodeData, type, settings)
		printer.alignLeft()
		printer.newLine()
		printer.println(`Orden de Trabajo: ${data.otId}`)
		printer.drawLine()
		printer.println(`Atendido por: ${data.nombreFuncionario}`)
		printer.println(`Cliente: ${data.nombreCompleto}`)
		printer.println(`Rut Cliente: ${data.rutCliente}`)
		printer.newLine()
		printer.println(`Fecha: ${data.date}`)
		printer.println(`Hora: ${data.time}`)
		printer.newLine()
		printer.drawLine()
		data.materias.forEach(materia => {
			printer.leftRight(
				materia.nombre,
				`Derechos Notariales: $${materia.derechosNotariales}`
			)
			printer.alignRight()
			printer.println(`Impuestos: $${materia.impuestos}`)
			printer.println(`Dineros de Terceros: $${materia.terceros}`)
			printer.newLine()
		})
		printer.drawLine()
		printer.alignLeft()
		printer.leftRight(
			`Total Derechos Notariales `,
			`$${data.totalDerechosNotariales}`
		)
		printer.alignRight()
		if (data.retencion) {
			printer.println(`10% Retención: $${data.retencion}`)
			printer.println(`TOTAL: $${data.totalBoleta}`)
		}
		printer.drawLine()
		printer.alignLeft()
		printer.println('Total Otros cobros')
		printer.alignRight()
		printer.println(`Total Impuestos: $${data.totalImpuestos}`)
		printer.println(`Total Terceros: $${data.totalTerceros}`)
		printer.println(`TOTAL: $${data.totalOtrosCobros}`)
		printer.alignLeft()
		printer.newLine()
		printer.drawLine()
		printer.leftRight('TOTAL', `$${data.totalGeneral}`)
		printer.newLine()
		printer.print(data.termsOfAgreement)
		printer.newLine()
		printer.println(`Dirección: ${data.address}`)
		printer.println(`Teléfono: ${data.phone}`)
		printer.println(`Email: ${data.email}`)
		printer.println(`Atención: ${data.openHoursOne}`)
		printer.println(`Atención: ${data.openHoursTwo}`)
		printer.println(`${data.openHoursThree}`)
		printer.partialCut()

		printer.execute(err => {
			if (err) return console.log({ err })

			return console.log({ msg: 'success' })
		})
	} catch (error) {
		console.log(error)
	}
}
