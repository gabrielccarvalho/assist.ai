import { generateResponse } from './generate-response'

export async function whatsappWebook({ body }: Body) {
	const entries = (body as any).entry
	try {
		for (const entry of entries) {
			for (const change of entry.changes) {
				const value = change.value
				if (value != null) {
					if (value.messages != null) {
						for (const message of value.messages) {
							if (message.type === 'text') {
								const from = message.from
								const message_body = message.text.body
								const message_response = await generateResponse({
									promptMessage: message_body,
								})
								const reply_message = message_response

								await fetch(
									'https://graph.facebook.com/v19.0/253249944527712/messages',
									{
										method: 'POST',
										headers: {
											Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
											'Content-Type': 'application/json',
										},
										body: JSON.stringify({
											messaging_product: 'whatsapp',
											recipient_type: 'individual',
											to: from,
											type: 'text',
											text: {
												preview_url: false,
												body: reply_message,
											},
										}),
									},
								)
								return {
									status: 200,
									isBase64Encoded: false,
								}
							}
						}
					}
				}
			}
		}
	} catch (err) {
		console.log(err)
	}
}
