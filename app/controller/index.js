const sqlite = require('../database/index.js')

const searchTest = async (ctx) => {
    return await sqlite('hapi').where({ name: ctx.query.name }).select()
}

module.exports = {
    searchTest,
}
