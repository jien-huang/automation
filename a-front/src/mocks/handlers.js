import { rest } from 'msw'

var config_data = require('./config_data.json')

var handlers = []
function getHandlersFromJson(jsonData) {
	for(var key of Object.keys(jsonData)) {
		const el = jsonData[key]
		if (el.method === 'get') {
			handlers.push(rest.get(el.url, (req, res, context) => {
				return res(
					context.status(el.status),
					context.delay(),
					context.json(el.data)
				)
			}))
		}
		if (el.method === 'post') {
			handlers.push(rest.post(el.url, (req, res, context) => {
				return res(
					context.status(el.status),
					context.delay(),
					context.json(el.data)
				)
			}))
		}
		if (el.method === 'put') {
			handlers.push(rest.put(el.url, (req, res, context) => {
				return res(
					context.status(el.status),
					context.delay(),
					context.json(el.data)
				)
			}))
		}
		if (el.method === 'delete') {
			handlers.push(rest.delete(el.url, (req, res, context) => {
				return res(
					context.status(el.status),
					context.delay(),
					context.json(el.data)
				)
			}))
		}
		if (el.method === 'head') {
			handlers.push(rest.head(el.url, (req, res, context) => {
				return res(
					context.status(el.status),
					context.delay(),
					context.json(el.data)
				)
			}))
		}
	}
}

getHandlersFromJson(config_data)

export {handlers, rest}
