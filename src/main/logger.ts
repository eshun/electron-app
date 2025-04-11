import { ipcMain, ipcRenderer, BrowserWindow } from 'electron'
import log from 'electron-log'

export function getAppLogFile(): log.LogFile {
  return log.transports.file.getFile()
}

const log2 = log.create({ logId: 'web' })

export function initLogger(): void {
  // 日志等级
  log.transports.file.level = 'info'

  log2.transports.file.level = 'info'
  log2.transports.file.fileName = 'web.log'
  log2.initialize()
}

export function rendererLogger(message: WebConsoleMessage): void {
  if (message && message.message) {
    const logMsg = JSON.stringify(message)
    switch (message.level) {
      case 'debug':
        log2.debug(logMsg)
        break
      case 'info':
        log2.info(logMsg)
        break
      case 'warning':
        log2.warn(logMsg)
        break
      case 'error':
        log2.error(logMsg)
        break
      default:
        log2.log(logMsg)
    }
  }
}

const LoggerLevel = Object.freeze(['debug', 'info', 'warn', 'error'])

export function registerLogger(win: BrowserWindow): void {
  win.webContents.on('console-message', (event, levelNumber, message, lineNumber, sourceId) => {
    //console.log(event, levelNumber, message, lineNumber, sourceId)

    const url = win.webContents.getURL()
    const level = event.level || LoggerLevel[levelNumber]
    rendererLogger({
      ...event,
      url,
      level,
      message,
      lineNumber,
      sourceId
    } as WebConsoleMessage)
  })
}
