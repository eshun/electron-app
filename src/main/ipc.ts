import { BrowserWindow, ipcMain } from 'electron'

import { getAppInfo } from './app'

export function registerIpc(mainWindow: BrowserWindow, app: Electron.App) {
  ipcMain.handle('app:info', getAppInfo)

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
}
