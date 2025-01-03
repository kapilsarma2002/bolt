import { Request, Response } from 'express'
import { getCodeResponse } from '../services/mistral'

export const chatController = async (req: Request, res: Response) => {
  if (!req.body.messages) {
    res.status(400).json({ error: 'messages are required' })
    return
  }
  const messages = req.body.messages
  const response = await getCodeResponse(messages)
  res.status(200).json({ error:'Valid response' })
  return
}