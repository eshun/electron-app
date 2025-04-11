import { shell, BrowserWindow } from 'electron'
import log from 'electron-log'
import { join } from 'node:path'
import { is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import { WindowState } from '@types'

import { configManager } from './configManager'
import { registerLogger } from './logger'

let loadingWindow: BrowserWindow | null = null
let welcomeWindow: BrowserWindow | null = null
//mainWindow.webContents.getProcessId|getOSProcessId
export function createWindow(): void {
  const windows = configManager.getWindows()
  if (windows.length > 0) {
    windows.forEach((win) => {
      createUrlWindow(win)
    })
  } else {
    startWelcomeWindow()
  }
}

export function startLodingWindow(): void {
  if (loadingWindow != null && !loadingWindow.isDestroyed()) {
    loadingWindow.show()
    loadingWindow.focus()
    return
  }
  loadingWindow = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    show: true,
    center: true,
    transparent: true,
    alwaysOnTop: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  loadingWindow.on('ready-to-show', () => {
    loadingWindow?.show()
    loadingWindow?.focus()
  })
  loadingWindow.on('close', () => {
    loadingWindow = null
  })
  loadingWindow.loadFile(join(__dirname, '../../public/loading.html'))
}

export function startWelcomeWindow(): void {
  if (welcomeWindow != null && !welcomeWindow.isDestroyed()) {
    welcomeWindow.show()
    welcomeWindow.focus()
    return
  }
  const win = configManager.getQuickWindow()

  welcomeWindow = new BrowserWindow({
    width: win.width,
    height: win.height,
    x: win.x,
    y: win.y,
    center: win.center,
    fullscreen: win.isFullScreen,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  welcomeWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  welcomeWindow.on('ready-to-show', () => {
    loadingWindow?.hide()
    welcomeWindow?.show()
    welcomeWindow?.focus()
    if (win.isMaximized) {
      welcomeWindow?.maximize()
    }
  })
  welcomeWindow.on('focus', () => {})
  welcomeWindow.on('blur', () => {})
  welcomeWindow.on('close', () => {
    welcomeWindow = null
  })
  registerLogger(welcomeWindow)
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    welcomeWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    welcomeWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
  log.info('welcome is show')
}

export function getMainWindow(): BrowserWindow | null {
  return BrowserWindow.getFocusedWindow()
}

export function reloadWindow() {
  const mainWindow = getMainWindow()
  if (mainWindow) {
    mainWindow.reload()
  }
}

export function createUrlWindow(
  win: WindowState,
  url?: string,
  parent?: BrowserWindow
): BrowserWindow | null {
  url = url || win.remoteUrl
  const appWindow = new BrowserWindow({
    width: win.width,
    height: win.height,
    x: win.x,
    y: win.y,
    center: win.center,
    fullscreen: win.isFullScreen,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    parent,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  appWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  appWindow.on('ready-to-show', () => {
    loadingWindow?.hide()
    appWindow?.show()
    appWindow?.focus()
    if (win.isMaximized) {
      appWindow?.maximize()
    }
  })
  appWindow.on('focus', () => {})
  appWindow.on('blur', () => {})
  registerLogger(appWindow)

  if (url) {
    appWindow.loadURL(url)
    return appWindow
  } else {
    appWindow.close()
    return null
  }
}
