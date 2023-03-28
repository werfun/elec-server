const path = require('path')
const fs = require('fs')

const consoleWrite = (msg = '') => {
    const consolePath = path.join(process.cwd(), '/log/', 'index.txt')
    fs.appendFile(consolePath, `\n${msg}:::::::${new Date()}`, function(err) {
        if (!err) {
            console.info('write log success!')
        }
    })
}
console.log = consoleWrite

module.exports = consoleWrite
