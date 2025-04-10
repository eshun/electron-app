import { app, shell, BrowserWindow, ipcMain } from 'electron'
import log from 'electron-log'
import { join } from 'node:path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import { registerIpc } from './ipc'
import { registerLogger } from './logger'
import { configManager } from './configManager'

function createWindow(): void {
  const windows = configManager.getWindows()

  const quickWindow = configManager.getQuickWindow()
  //configManager.setQuickWindow(quickWindow)
  configManager.getLocale()

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: quickWindow.width,
    height: quickWindow.height,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  registerIpc(mainWindow)
  registerLogger(mainWindow)

  log.info('App is ready')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId(import.meta.env.VITE_MAIN_BUNDLE_ID || 'com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
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

process.on('SIGINT', () => {
  log.info('收到 Ctrl+C (SIGINT)，准备退出...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  log.info('收到 kill PID (SIGTERM)，准备退出...')
  process.exit(0)
})

process.on('exit', (code) => {
  log.info(`App is exit(${code})`)
})

// 捕获未处理的异常
process.on('uncaughtException', (error) => {
  log.error('主进程未捕获异常:', error)
  process.exit(1)
})

// 捕获未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
  log.error('主进程未处理的 Promise 拒绝:', reason, promise)
})
