import { Router } from 'express'
import documents from './documents'
import thermalPrinter from './thermalPrinter'

const router = Router()

router.get('/', (req, res) => res.json({ message: 'hello from Sodlab POS' }))
router.use('/thermalPrinter', thermalPrinter)
router.use('/documents', documents)

export default router
