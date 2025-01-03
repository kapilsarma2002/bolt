require('dotenv').config()

import { Mistral } from '@mistralai/mistralai'
import { getSystemPrompt } from '../config/prompts'

const apiKey = process.env.MISTRAL_API_KEY
const mistral = new Mistral({ apiKey: apiKey })

export const getTemplateResponse = async (prompt: string) => {
  const res = await mistral.chat.complete({
    model: 'mistral-large-latest',
    maxTokens: 1,
    messages: [
      {
        role: 'system',
        content: `Return either react or node based on what you think the project should be based on the user's prompt. Return only one word either 'react' or 'node'. Do not return anything else or anything extra.`,
      },
      { role: 'user', content: prompt },
    ],
  })

  return res.choices?.[0].message.content
}

export const getCodeResponse = async (messages: any[]) => {
  const result = await mistral.chat.stream({
    model: 'mistral-large-latest',
    maxTokens: 8000,
    messages: [
      { role: 'system', content: getSystemPrompt() },
      ...messages
    ],
  })

  for await (const event of result) {
    const content = event.data.choices[0].delta.content
    if (content) {
      process.stdout.write(content.toString())
    }
  }
  process.stdout.write('\n')
}
