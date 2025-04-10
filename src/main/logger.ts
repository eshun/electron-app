import { ipcMain, ipcRenderer, BrowserWindow } from 'electron'
import log from 'electron-log'

export function getAppLogFile(): log.LogFile {
  return log.transports.file.getFile()
}

const LoggerLevel: string[] = ['info', 'warn', 'error', 'debug']

export function registerLogger(mainWindow: BrowserWindow): void {
  // 日志等级
  log.transports.file.level = 'info'

  const log2 = log.create({ logId: 'renderer' })
  log2.transports.file.level = 'info'
  log2.transports.file.fileName = 'web.log'
  log2.initialize()

  mainWindow.webContents.on(
    'console-message',
    (details, levelNumber, message, lineNumber, sourceId) => {
      //console.log(details, level, message, lineNumber, sourceId)

      const level = details.level || LoggerLevel[levelNumber]
      rendererLogger({
        ...details,
        level,
        message,
        lineNumber,
        sourceId
      })
    }
  )

  ipcMain.on('app:log', (_, event) => {
    //console.log(event)
    rendererLogger(event)
  })

  function rendererLogger(message: { level; message; lineNumber; sourceId }): void {
    if (message && message.message) {
      switch (message.level) {
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
}
