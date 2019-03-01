// @flow
import PDFWindow from 'electron-pdf-window'
import { nativeImage } from 'electron'
import path from 'path'

export default (url: string, offset: number) => {
	new PDFWindow({
		width: 800,
		height: 600,
		x: offset,
		y: offset,
		icon: nativeImage.createFromPath(path.resolve('resources', 'icon.png'))
	}).loadURL(url)
}
