import { Request, Response } from 'express'
import { getTemplateResponse } from '../services/mistral'
import { BASE_PROMPT } from '../config/prompts'
import { basePrompt as nodeBasePrompt } from '../config/defaults/node'
import { basePrompt as reactBasePrompt } from '../config/defaults/react'

export const templateController = async (req: Request, res: Response) => {
  if (!req.body.prompt) {
    res.status(400).json({ error: 'Prompt is required' })
    return
  }
  const prompt = req.body.prompt
  const type = await getTemplateResponse(prompt)
  if (type === 'react') {
    res.status(200).json({
      prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
      uiPrompts: [reactBasePrompt]
    })
    return
  }
  if (type === 'node') {
    res.status(200).json({
      prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [nodeBasePrompt]
    })
    return
  }
  res.status(400).json({ error: 'Invalid response' })
  return
}
