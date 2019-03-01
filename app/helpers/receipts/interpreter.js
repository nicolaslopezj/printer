// @flow
export default (printer, data: object) => {
	Object(data).forEach(key => {
		switch (key) {
			case 'alignCenter':
				return printer.alignCenter()
			case 'alignLeft':
				return printer.alignLeft()
			case 'alignRight':
				return printer.alignRight()
			case 'drawLine':
				return printer.drawLine()
			case 'leftRight':
				return printer.leftRight(data[key][0], data[key][1])
			case 'newLine':
				return printer.newLine()
			case 'println':
				return printer.println(data[key].join(' '))
			default:
				break
		}
	})

	return printer
}
