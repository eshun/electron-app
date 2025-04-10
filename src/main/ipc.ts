import { BrowserWindow, ipcMain } from 'electron'

import { getAppInfo } from './app'
import { getDeviceInfo } from './device'
import { openPath } from './fileManager'

export function registerIpc(mainWindow: BrowserWindow): void {
  ipcMain.handle('app:info', () => getAppInfo())
  ipcMain.handle('app:reload', () => mainWindow.reload())

  ipcMain.handle('device:info', () => getDeviceInfo())

  ipcMain.handle('file:openPath', openPath)
}
