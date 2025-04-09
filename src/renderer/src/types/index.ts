export enum ThemeMode {
  light = 'light',
  dark = 'dark',
  system = 'system'
}

export type Theme = 'system' | 'light' | 'dark'

export type Locale = 'zh-CN' | 'zh-TW' | 'en-US'

export type AppInfo = {
  appName: string
  version: string
  appPath: string
  appDataPath: string
  resourcesPath: string
  filesPath: string
  logsPath: string
}
