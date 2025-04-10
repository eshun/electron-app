import { ipcMain, ipcRenderer, BrowserWindow } from 'electron'
import log from 'electron-log'

export function getAppLogFile(): log.LogFile {
  return log.transports.file.getFile()
}

export function registerLogger(mainWindow: BrowserWindow): void {
  // 日志等级
  log.transports.file.level = 'info'

  const log2 = log.create({ logId: 'renderer' })
  log2.transports.file.level = 'info'
  log2.transports.file.fileName = 'web.log'
  log2.initialize()

  mainWindow.webContents.on('console-message', (details) => {
    rendererLogger(details.level, details.message)
  })

  ipcMain.on('app:log', (_, level, message) => {
    rendererLogger(level, message)
  })

  function rendererLogger(level, message): void {
    switch (level) {
      case 'debug':
        log2.debug(message)
        break
      case 'info':
        log2.info(message)
        break
      case 'warn':
        log2.warn(message)
        break
      case 'error':
        log2.error(message)
        break
      default:
        log2.log(message)
    }
  }
}
