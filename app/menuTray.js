export default (mainWindow, app) => [
	{
		label: 'Abrir',
		click() {
			mainWindow.restore()
		}
	},
	{
		type: 'separator'
	},
	{
		label: 'Cerrar',
		click() {
			app.quit()
		}
	}
]
