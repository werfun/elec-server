const fs = require('fs')
const axios = require('axios')
const nodeStreamZip = require('node-stream-zip');

// http
const requestPromise = (url) => {
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            return resolve(res)
        }).catch(e => {
            console.log('requestPromise---error', e)
            return reject(e)
        })
    })
}

// download file and unzip
const downloadFile = (url, filename) => {
    const writer = fs.createWriteStream(filename)
    axios.get(url, { responseType: 'stream' }).then(res => {
        res.data.pipe(writer)
    })
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}

const streamUnzip = (filePath, unzipPath) => {
    return new Promise((resolve, reject) => {
        const zip = new nodeStreamZip({
            file: filePath,
            storeEntries: true
        })
        process.noAsar = true
        zip.on('ready', () => {
            zip.extract(null, unzipPath, (err, count) => {
                zip.close()
                resolve()
            })
        })
        zip.on('error', err => {
            console.log('unzip error', err)
            reject()
        })
    })
}

module.exports = {
    requestPromise,
    downloadFile,
    streamUnzip,
}
