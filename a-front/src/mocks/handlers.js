import { rest } from 'msw'

var config_data = require('./config_data.json')

handlers = []
function getHandlersFromJson(jsonData) {
	for(var key of Object.keys(jsonData)) {
		var el = jsonData[key]
		if (el.method === 'get') {
			handlers.push(rest.get(el.url, (req, res, context) => {
				return res(
					context.status(el.status),
					context.json(el.data)
				)
			}))
		}
	}
}

getHandlersFromJson(config_data)

export {handlers, rest}
