require('dotenv').config();

import { Mistral } from '@mistralai/mistralai';

const apiKey = process.env.MISTRAL_API_KEY;

const mistral = new Mistral({apiKey: apiKey});

async function main() {
  const result = await mistral.chat.stream({
    model: 'mistral-large-latest',
    messages: [{role: 'user', content: 'Write code for a simple todo application in react'}],
  });
  
  for await (const event of result) {
    const content = event.data.choices[0].delta.content;
    if (content) {
      process.stdout.write(content.toString());
    }
  }
  process.stdout.write('\n');
}

main()