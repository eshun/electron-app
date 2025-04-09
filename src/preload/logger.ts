import { ipcRenderer } from 'electron'
import { formatArgs } from '../main/utils'

export function registerRendererLogger(window: Window): void {
  const origDebug = window.console.debug
  const origLog = window.console.log
  const origInfo = window.console.info
  const origWarn = window.console.warn
  const origError = window.console.error

  window.console.debug = (...args): void => {
    const msg = formatArgs(args)
    //ipcRenderer.send('app:log', { level: 'debug', message: msg })
    origDebug('%c[DUBUG]', 'color: gray;', msg)
  }

  window.console.log = (...args): void => {
    const msg = formatArgs(args)
    //ipcRenderer.send('app:log', { level: 'log', message: msg })
    origLog('%c[LOG]', 'color: green;', msg)
  }

  window.console.info = (...args): void => {
    const msg = formatArgs(args)
    //ipcRenderer.send('app:log', { level: 'info', message: msg })
    origInfo('%c[INFO]', 'color: green;', msg)
  }

  window.console.warn = (...args): void => {
    const msg = formatArgs(args)
    //ipcRenderer.send('app:log', { level: 'warn', message: msg })
    origWarn('%c[WARN]', 'color: orange;', msg)
  }

  window.console.error = (...args): void => {
    const msg = formatArgs(args)
    //ipcRenderer.send('app:log', { level: 'error', message: msg })
    origError('%c[ERROR]', 'color: red;', msg)
  }
}
