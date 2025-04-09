import { app, nativeTheme } from 'electron'

import { getAppDir,getAppUserFilesDir,getAppUserDataDir,getAppResourceDir，getAppLogDir } from './utils/directory'

if (isDev) {
  app.setPath('userData', app.getPath('userData') + 'Dev')
}

export function getAppName() {
  return app.getName()
}

export function getAppVersion() {
  return app.getVersion()
}

export function getPlatform() {
  return process.platform === 'darwin' ? 'mac' : process.platform === 'win32' ? 'windows' : 'linux'
}

export function getSystemLocale() {
  return app.getSystemLocale()
}

export function getLocale() {
  return app.getLocale()
}

export function getTheme() {
  return nativeTheme.themeSource
}

export function getAppInfo() {
  return {
    appName: getAppName(),
    version: getAppVersion(),
    appPath: getAppDir(),
    filesPath: getAppUserFilesDir(),
    appDataPath: getAppUserDataDir(),
    resourcesPath: getAppResourceDir(),
    logsPath: getAppLogDir()
  }
}
