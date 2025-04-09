import { BrowserWindow, ipcMain } from 'electron'

import { getAppInfo } from './app'

export function registerIpc(mainWindow: BrowserWindow): void {
  ipcMain.handle('app:info', getAppInfo)
  ipcMain.handle('app:reload', () => mainWindow.reload())
}
