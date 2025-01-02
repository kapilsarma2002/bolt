import { Router } from 'express'
import { templateController } from '../controllers/template'

const templateRouter = Router()

templateRouter.post('/', templateController)

export default templateRouter
