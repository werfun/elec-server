const fastify = require('./router.js')
const log = require('../log/index.js')

const startApp = () =>{
    fastify.listen({ port: 3000 }, (err) => {
        if (err) {
            log(err)
            process.exit(1)
        }
    })
}

module.exports = startApp
