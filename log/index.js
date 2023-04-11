const path = require('path')
const fs = require('fs')

const consoleWrite = (msg1 = '', msg2 = '') => {
    console.info(msg1, msg2)
    const consolePath = path.join(process.cwd(), '/log/', 'index.txt')
    fs.appendFile(consolePath, `\n${msg1}__${msg2}:::::${new Date()}`, function(err) {
        if (!err) {
            // write success!
        }
    })
}
console.log = consoleWrite

module.exports = consoleWrite
