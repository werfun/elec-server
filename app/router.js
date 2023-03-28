const Fastify = require('fastify')
const server = Fastify({ ignoreTrailingSlash: true })
const { searchTest } = require('./controller/index.js')

server.get('/', () => ({ success: true, status: 200, time: new Date() }))
server.get('/1', async (ctx) => await searchTest(ctx))

module.exports = server
