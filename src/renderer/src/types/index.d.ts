export enum ThemeMode {
  light = 'light',
  dark = 'dark',
  auto = 'auto'
}

export type Locale = 'zh-CN' | 'zh-TW' | 'en-US'

export type AppInfo = {
  version: string
  isPackaged: boolean
  appPath: string
  appDataPath: string
  resourcesPath: string
  filesPath: string
  logsPath: string
}
