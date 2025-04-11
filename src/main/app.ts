import { app, nativeTheme } from 'electron'

import { isDev } from './constant'
import { Theme, AppInfo } from '@types'

import {
  getAppDir,
  getAppUserFilesDir,
  getAppUserDataDir,
  getAppResourceDir,
  getAppLogDir,
  getAppUserDir
} from './utils/directory'

if (isDev) {
  app.setPath('userData', app.getPath('userData') + 'Dev')
}

export function getAppName(): string {
  return app.getName()
}

export function getAppVersion(): string {
  return app.getVersion()
}

export function getPlatform(): string {
  return process.platform === 'darwin' ? 'mac' : process.platform === 'win32' ? 'windows' : 'linux'
}

export function getTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone
}

export function getSystemLocale(): string {
  return app.getSystemLocale()
}

export function getLocale(): string {
  return app.getLocale()
}

export function getTheme(): Theme {
  return nativeTheme.themeSource
}

export function getAppInfo(): AppInfo {
  return {
    name: getAppName(),
    version: getAppVersion(),
    appPath: getAppDir(),
    appUserPath: getAppUserDir(),
    appUserDataPath: getAppUserDataDir(),
    resourcesPath: getAppResourceDir(),
    filesPath: getAppUserFilesDir(),
    logsPath: getAppLogDir()
  }
}
