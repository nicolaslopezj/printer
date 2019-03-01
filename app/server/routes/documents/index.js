import { Router } from 'express'
import bodyParser from 'body-parser'
import print from './print'
import openSingleWindow from './openSingleWindow'
import test from './testPrinter'
import testDownload from './testDownload'
import testOpenPdfWindow from './testOpenPdfWindow'

const router = Router()
// const jsonParser = bodyParser.json()
router.use(bodyParser.json())
router.post('/:type/:srcField/:statusField/:status', print)
router.post('/open_single_window', openSingleWindow)
router.post('/test', test)
router.post('/test_download', testDownload)
router.post('/test_open_window', testOpenPdfWindow)

export default router
