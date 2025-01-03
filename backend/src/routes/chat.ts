import { Router } from 'express'
import { chatController } from '../controllers/chat'

const chatRouter = Router()

chatRouter.post('/', chatController)

export default chatRouter