import { rest } from 'msw';

var config_data = require('./config_data.json');
var results_data = require('./results_data.json');
var tests_data = require('./tests_data.json');


function getHandlersFromJson(jsonData) {
	var handlers = [];
	for (var key of Object.keys(jsonData)) {
		const el = jsonData[key];
		if (el.method === 'get') {
			handlers.push(rest.get(el.url, (req, res, context) => {
				return res(
					context.status(el.status),
					context.delay(),
					context.json(el.data)
				);
			}));
		}
		if (el.method === 'post') {
			handlers.push(rest.post(el.url, (req, res, context) => {
				return res(
					context.status(el.status),
					context.delay(),
					context.json(el.data)
				);
			}));
		}
		if (el.method === 'put') {
			handlers.push(rest.put(el.url, (req, res, context) => {
				return res(
					context.status(el.status),
					context.delay(),
					context.json(el.data)
				);
			}));
		}
		if (el.method === 'delete') {
			handlers.push(rest.delete(el.url, (req, res, context) => {
				return res(
					context.status(el.status),
					context.delay(),
					context.json(el.data)
				);
			}));
		}
		if (el.method === 'head') {
			handlers.push(rest.head(el.url, (req, res, context) => {
				return res(
					context.status(el.status),
					context.delay(),
					context.json(el.data)
				);
			}));
		}
	}
	return handlers;
}

const config = getHandlersFromJson(config_data);
const result = getHandlersFromJson(results_data);
const tests = getHandlersFromJson(tests_data);
console.log(config)
var handlers = []
// handlers = handlers.push(config)
// handlers = handlers.push(result)
// handlers = handlers.push(tests)

export {config, result, tests, rest };
