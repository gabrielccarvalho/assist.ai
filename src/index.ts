import { Elysia } from 'elysia'
import { whatsappWebook } from './wehbooks/whatsapp'

const app = new Elysia()

app
	.get('/webhooks', ({ query }) => {
		if (
			query['hub.mode'] === 'subscribe' &&
			query['hub.verify_token'] === process.env.META_VERIFICATION_TOKEN
		) {
			return query['hub.challenge']
		}
		return { status: 400 }
	})
	.listen(3000)

app.post('/webhooks', whatsappWebook).listen(3000)

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
)
