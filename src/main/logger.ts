import log from 'electron-log'
import { ipcMain, ipcRenderer, BrowserWindow } from 'electron'
import chalk from 'chalk'
import { formatArgs } from './utils'

// 日志等级
log.transports.file.level = 'info'

export function registerLogger(mainWindow: BrowserWindow): void {
  const origDebug = console.debug
  const origLog = console.log
  const origInfo = console.info
  const origWarn = console.warn
  const origError = console.error

  console.debug = (...args): void => {
    const msg = formatArgs(args)
    log.debug(msg)
    origDebug(chalk.gray('[DUBUG]'), ...args)
  }

  console.log = (...args): void => {
    const msg = formatArgs(args)
    log.log(msg)
    origLog(chalk.green('[LOG]'), ...args)
  }

  console.info = (...args): void => {
    const msg = formatArgs(args)
    log.info(msg)
    origInfo(chalk.green('[INFO]'), ...args)
  }

  console.warn = (...args): void => {
    const msg = formatArgs(args)
    log.warn(msg)
    origWarn(chalk.yellow('[WARN]'), ...args)
  }

  console.error = (...args): void => {
    const msg = formatArgs(args)
    log.error(msg)
    origError(chalk.red('[ERROR]'), ...args)
  }

  const rendererLogger = log.create({ logId: 'renderer' })
  rendererLogger.transports.file.level = 'info'
  rendererLogger.initialize()

  mainWindow.webContents.on('console-message', (details) => {
    ipcRenderer.send('app:log', {
      level: details.level,
      message: details.message
    })
  })

  ipcMain.on('app:log', (_, level, message) => {
    switch (level) {
      case 'debug':
        rendererLogger.debug(message)
        break
      case 'info':
        rendererLogger.info(message)
        break
      case 'warn':
        rendererLogger.warn(message)
        break
      case 'error':
        rendererLogger.error(message)
        break
      default:
        rendererLogger.log(message)
    }
  })
}
