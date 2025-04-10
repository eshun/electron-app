import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { AppInfo } from '@types'

// Custom APIs for renderer
const api = {
  getAppInfo: (): Promise<AppInfo> => ipcRenderer.invoke('app:info'),
  reload: (): Promise<void> => ipcRenderer.invoke('app:reload'),
  getDeviceInfo: (): Promise<void> => ipcRenderer.invoke('device:info')
}

const log = {
  debug: (...args): void => {
    ipcRenderer.send('app:log', { level: 'debug', message: JSON.stringify(args) })
  },
  log: (...args): void => {
    ipcRenderer.send('app:log', { level: 'log', message: JSON.stringify(args) })
  },
  info: (...args): void => {
    ipcRenderer.send('app:log', { level: 'info', message: JSON.stringify(args) })
  },
  warn: (...args): void => {
    ipcRenderer.send('app:log', { level: 'warn', message: JSON.stringify(args) })
  },
  error: (...args): void => {
    ipcRenderer.send('app:log', { level: 'error', message: JSON.stringify(args) })
    //console.error(...args)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('logger', log)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
  // @ts-ignore (define in dts)
  window.logger = log
}
