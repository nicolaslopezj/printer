/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import {
	app,
	BrowserWindow,
	dialog,
	ipcMain,
	Menu,
	nativeImage,
	Tray
} from 'electron'
import { autoUpdater } from 'electron-updater'
import log from 'electron-log'
import path from 'path'
import MenuBuilder from './menu'
import trayMenuOptions from './menuTray'
import startExpressServer from './server'

autoUpdater.logger = log
autoUpdater.autoInstallOnAppQuit = true
autoUpdater.logger.transports.file.level = 'info'
log.info('App starting...')

let mainWindow = null
let tray = null
let transporter = null

if (process.env.NODE_ENV === 'production') {
	const sourceMapSupport = require('source-map-support')
	sourceMapSupport.install()
}

if (
	process.env.NODE_ENV === 'development' ||
	process.env.DEBUG_PROD === 'true'
) {
	require('electron-debug')()
	const p = path.join(__dirname, '..', 'app', 'node_modules')
	require('module').globalPaths.push(p)
}

const installExtensions = async () => {
	const installer = require('electron-devtools-installer')
	const forceDownload = !!process.env.UPGRADE_EXTENSIONS
	const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

	return Promise.all(
		extensions.map(name => installer.default(installer[name], forceDownload))
	).catch(console.log)
}

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
	// Respect the OSX convention of having the application in memory even
	// after all windows have been closed
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('ready', async () => {
	if (
		process.env.NODE_ENV === 'development' ||
		process.env.DEBUG_PROD === 'true'
	) {
		await installExtensions()
	}

	mainWindow = new BrowserWindow({
		show: false,
		width: 800,
		height: 600,
		icon: nativeImage.createFromPath(path.resolve('resources', 'icon.png'))
	})

	mainWindow.loadURL(`file://${__dirname}/app.html`)

	// @TODO: Use 'ready-to-show' event
	//        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
	mainWindow.webContents.on('did-finish-load', () => {
		if (!mainWindow) {
			throw new Error('"mainWindow" is not defined')
		}
		mainWindow.show()
		mainWindow.focus()

		transporter = data => {
			log.info(data.text)
			mainWindow.webContents.send('update-status', data)
		}

		if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
	})

	mainWindow.on('close', e => {
		const choice = dialog.showMessageBox(mainWindow, {
			type: 'question',
			buttons: ['Salir', 'Cancelar'],
			title: '¿Está seguro que desea cerrar la aplicación?',
			message:
				'Al cerrar la aplicación, la aplicación web de Sodlab no podrá realizar las actividades relacionadas a la impresión de documentos'
		})

		if (choice === 1) {
			e.preventDefault()
			e.defaultPrevented = true
		}
	})

	mainWindow.on('closed', () => {
		mainWindow = null
	})

	mainWindow.on('minimize', () => {
		mainWindow.hide()
	})

	const menuBuilder = new MenuBuilder(mainWindow)
	menuBuilder.buildMenu()

	const trayIcon =
		process.env.NODE_ENV === 'production'
			? path.resolve(path.dirname(process.execPath), 'resources', 'icon.png')
			: path.resolve('resources', 'icon.png')
	tray = new Tray(nativeImage.createFromPath(trayIcon))
	const trayContextMenu = Menu.buildFromTemplate(
		trayMenuOptions(mainWindow, app)
	)
	tray.setToolTip('Sodlab POS')
	tray.setContextMenu(trayContextMenu)
	tray.on('click', () => {
		if (mainWindow.isVisible()) return mainWindow.minimize()

		return mainWindow.show()
	})

	try {
		const server = await startExpressServer()
		app.server = server.listen(server.get('PORT'), () =>
			log.info(`Printer App listening on port ${server.get('PORT')}`)
		)
	} catch (error) {
		console.log(error)
		const choice = dialog.showMessageBox(mainWindow, {
			type: 'question',
			buttons: ['Cerrar'],
			title: 'Error al iniciar Sodlab POS',
			message: error
		})

		if (choice === 0) {
			mainWindow = null
		}
	}
})

app.setLoginItemSettings({
	openAtLogin: process.env.NODE_ENV === 'production'
})

ipcMain.on('path-request', (event, arg) => {
	console.log(arg)
	const appFolder = path.dirname(process.execPath)
	const updateExe = path.resolve(appFolder, '..', 'Update.exe')
	const exeName = path.basename(process.execPath)
	const appPath = app.getAppPath()
	const trayIcon = path.resolve(
		path.dirname(process.execPath),
		'resources',
		'icon.png'
	)
	const paths = { appFolder, updateExe, exeName, appPath, trayIcon }
	event.sender.send('path-response', paths)
})

autoUpdater.on('checking-for-update', () => {
	transporter({ status: 'searching', text: 'Buscando actualizaciones...' })
})
autoUpdater.on('update-available', info => {
	transporter({
		status: 'found',
		text: 'Actualizaciones disponibles. Comenzando la descarga...',
		info
	})
})
autoUpdater.on('update-not-available', info => {
	transporter({
		status: 'done',
		text: 'La aplicación se encuentra actualizada',
		info
	})
})
autoUpdater.on('error', err => {
	transporter({
		status: 'error',
		text:
			'Ocurrió un error al descargar la actualización. Favor intentar más tarde...',
		err
	})
})
autoUpdater.on('download-progress', progressObj => {
	transporter({
		status: 'downloading',
		text: 'Actualización en curso...',
		progressObj
	})
})
autoUpdater.on('update-downloaded', info => {
	transporter({
		status: 'done',
		text:
			'Descarga terminada. La aplicación se actualizará la próxima vez que la inicie',
		info
	})
})
