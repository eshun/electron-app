import log from 'electron-log'
import { ipcMain } from 'electron'

log.transports.file.level = 'info' // 日志等级

function hookConsole() {
  const origLog = console.log
  const origWarn = console.warn
  const origError = console.error

  console.log = (...args) => {
    const msg = formatArgs(args)
    log.info(msg)
    origLog(chalk.green('[LOG]'), ...args)
  }

  console.warn = (...args) => {
    const msg = formatArgs(args)
    log.warn(msg)
    origWarn(chalk.yellow('[WARN]'), ...args)
  }

  console.error = (...args) => {
    const msg = formatArgs(args)
    log.error(msg)
    origError(chalk.red('[ERROR]'), ...args)
  }
}

ipcMain.on('renderer-log', (event, { level, message }) => {
  switch (level) {
    case 'info':
      log.info('[Renderer]', message)
      break
    case 'warn':
      log.warn('[Renderer]', message)
      break
    case 'error':
      log.error('[Renderer]', message)
      break
    default:
      log.info('[Renderer]', message)
  }
})
webContents.on('console-message', (event, level, message, line, sourceId) => {
  if (message.startsWith('[Hooked Log]')) {
    ipcRenderer.send('renderer-log', { level: 'warn', message: msg })
    console.log('Structured log:', message.slice(13))
  } else {
    console.log('Raw console:', message)
  }
})
