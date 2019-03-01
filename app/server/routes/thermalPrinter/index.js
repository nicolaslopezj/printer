import { Router } from 'express'
import bodyParser from 'body-parser'
import voucher from './voucher'
import receipt from './receipt'
import test from './testPrinter'

const router = Router()

router.use(bodyParser.json())
router.post('/voucher', voucher)
router.post('/receipt', receipt)
router.get('/test', test)

export default router
