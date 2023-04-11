const { app } = require('electron')
const semver = require('semver')
const path = require('path')
const { requestPromise, downloadFile, streamUnzip } = require('./util')

const configUrl = 'http://127.0.0.1:3001/test/releases.json'
const downloadFilePath = path.resolve(__dirname, '../dist/app.zip')
const unzipPath = path.resolve(__dirname, '../dist/unzip/')

// 更新
const startUpdate = () => {
    const currentVersion = app.getVersion()
    requestPromise(configUrl).then(async res => {
        if (res.data) {
            try {
                if (semver.lt(currentVersion, res.data.version)) {
                    // 下载文件
                    downloadFile(res.data.updateURL, downloadFilePath).then(() => {
                        // 解压文件
                        streamUnzip(downloadFilePath, unzipPath).then(() => {
                            setTimeout(() => {
                                app.relaunch() // 重启
                                app.exit(0)
                            }, 500)
                        })
                    })
                }
            } catch (err) {
                console.log('err', err)
            }
        }
    })
}

module.exports = {
    startUpdate
}
