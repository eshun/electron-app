import { BrowserWindow, ipcMain } from 'electron'

import { getAppInfo } from './app'
import { getDeviceInfo } from './device'
import { openPath } from './fileManager'
import { reloadWindow } from './windowManager'
import { rendererLogger } from './logger'

export function registerIpc(app: Electron.App): void {
  ipcMain.handle('app:info', () => getAppInfo())
  ipcMain.handle('app:reload', () => reloadWindow())

  ipcMain.handle('device:info', () => getDeviceInfo())

  ipcMain.handle('file:openPath', (_, path: string) => openPath(path))

  ipcMain.on('app:log', (_, event) => rendererLogger(event))
}
