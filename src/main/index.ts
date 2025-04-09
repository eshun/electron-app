import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
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
  mainWindow.webContents.on('console-message', async (details) => {
    const { message, level, lineNumber, sourceId } = details
    console.log(`[Renderer Console:] [${level}] ${message} (${sourceId}:${lineNumber})`)
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

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
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// 捕获未处理的异常
process.on('uncaughtException', (error) => {
  console.error('主进程未捕获异常:', error)
  // 这里可以写入日志、提示用户或上报服务器
})

// 捕获未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
  console.error('主进程未处理的 Promise 拒绝:', reason)
  // 同样可以进行记录或上报
})
ipcMain.on('renderer-error', (event, error) => {
  console.error('接收到渲染进程错误:', error)
})

ipcMain.on('renderer-promise-error', (event, data) => {
  console.error('接收到渲染进程 Promise 错误:', data)
})

window.onerror = function (message, source, lineno, colno, error) {
  console.error('渲染进程运行时错误:', { message, source, lineno, colno, error })
  // 你可以将这些信息发送给主进程或远程日志服务器
}

window.addEventListener('unhandledrejection', (event) => {
  console.error('渲染进程未处理的 Promise 拒绝:', event.reason)
  // 阻止默认行为（如控制台警告）
  event.preventDefault()
})

app.setLocale
