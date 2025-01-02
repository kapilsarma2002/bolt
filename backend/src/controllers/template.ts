import { Request, Response } from 'express'
import { getTemplateResponse } from '../services/mistral'

export const templateController = async (req: Request, res: Response) => {
  if (!req.body.prompt) {
    res.status(400).json({ error: 'Prompt is required' })
    return
  }
  const prompt = req.body.prompt
  const type = await getTemplateResponse(prompt)
  if (type != 'react' && type != 'node') {
    res.status(400).json({ error: 'Invalid response' })
    return
  }
  res.status(200).json({ type })
  return
}
