const { app, Tray, Menu, shell, Notification } = require('electron')
const path = require('path')
const { version } = require('./package.json')
const startApp = require('./app/index.js')
const log = require('./log/index.js')
require('./updater/index.js')

function initTrayIcon() {
    const tray = new Tray(path.resolve(__dirname, './static/favicon.ico'));
    const trayContextMenu = Menu.buildFromTemplate([
        {
            label: '打开',
            click: () => {
                shell.openExternal('https://www.baidu.com/')
            }
        },
        {
            label: '同步',
            click: () => {
                log(path.resolve(__dirname, './static/favicon.ico'))
                log('1111')
            }
        },
        {
            label: '退出',
            click: () => {
                app.quit()
            }
        },
        {
            label: `版本号: ${version}`,
        },
    ]);
    tray.on('right-click', () => {
        tray.popUpContextMenu(trayContextMenu);
    });
    tray.on('click', () => {
        shell.openExternal('https://www.baidu.com/')
    });

}

app.whenReady().then(async () => {
    initTrayIcon()
    startApp()
})
