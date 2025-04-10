import { BrowserWindow, ipcMain } from 'electron'

import { getAppInfo } from './app'
import { getDeviceInfo } from './device'

export function registerIpc(mainWindow: BrowserWindow): void {
  ipcMain.handle('app:info', () => getAppInfo())
  ipcMain.handle('app:reload', () => mainWindow.reload())

  ipcMain.handle('device:info', () => getDeviceInfo())
}
