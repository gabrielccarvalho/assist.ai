import { openai } from '../../lib/openai'
import { storePrompt } from './prompts'

type generateReponseType = {
	promptMessage: string
	temperature?: number
}

export async function generateResponse({
	promptMessage,
	temperature = 0.4,
}: generateReponseType) {
	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo-16k',
		temperature,
		messages: [
			{ role: 'system', content: storePrompt },
			{ role: 'user', content: promptMessage },
		],
		stream: false,
	})

	const messageResponse = response.choices[0].message.content
	return messageResponse
}
