import log from 'electron-log'
import { ipcRenderer } from 'electron'

log.transports.file.level = 'info' // 日志等级

function hookRendererConsole() {
  const origLog = console.log
  const origWarn = console.warn
  const origError = console.error

  console.log = (...args) => {
    const msg = formatArgs(args)
    ipcRenderer.send('renderer-log', { level: 'info', message: msg })
    origLog('%c[LOG]', 'color: green;', ...args)
  }

  console.warn = (...args) => {
    const msg = formatArgs(args)
    ipcRenderer.send('renderer-log', { level: 'warn', message: msg })
    origWarn('%c[WARN]', 'color: orange;', ...args)
  }

  console.error = (...args) => {
    const msg = formatArgs(args)
    ipcRenderer.send('renderer-log', { level: 'error', message: msg })
    origError('%c[ERROR]', 'color: red;', ...args)
  }
}
