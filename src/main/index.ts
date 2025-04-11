import { app, shell, BrowserWindow } from 'electron'
import log from 'electron-log'
import { electronApp, optimizer } from '@electron-toolkit/utils'

import { configManager } from './configManager'
import { createWindow, startLodingWindow } from './windowManager'

import { registerIpc } from './ipc'
import { initLogger } from './logger'

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId(import.meta.env.VITE_MAIN_BUNDLE_ID || 'com.electron')
  configManager.getLocale()
  registerIpc(app)
  initLogger()

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  startLodingWindow()
  createWindow()

  log.info('App is ready')
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  app.on('open-url', (event, url) => {
    event.preventDefault()
    //handleProtocolUrl(url)
  })

  app.on('before-quit', () => {})
})
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  log.info(`App is closed`)
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// process
// 捕获未处理的异常
process.on('uncaughtException', (error) => {
  log.error('App uncaughtException:', error)
  process.exit(1)
})

// 捕获未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
  log.error('App unhandledRejection:', reason, promise)
})

process.on('SIGINT', () => {
  log.info('收到 Ctrl + C (SIGINT)，准备退出...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  log.info('收到 kill PID (SIGTERM)，准备退出...')
  process.exit(0)
})

process.on('exit', (code) => {
  log.info(`App is exit(${code})`)
})
