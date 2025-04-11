export enum ThemeMode {
  light = 'light',
  dark = 'dark',
  system = 'system'
}

export type Theme = 'system' | 'light' | 'dark'

export type Locale = 'zh-CN' | 'zh-TW' | 'en-US'

export type AppInfo = {
  name: string
  version: string
  appPath: string
  appDataPath: string
  resourcesPath: string
  filesPath: string
  logsPath: string
}

export type DeviceInfo = {
  os: string
  deviceId: string
  machineId: string
  macMachineId: string
  hostname: string
}

export type AppConfig = {
  machineId: string
  quickWindow: WindowState
  window?: WindowState[]
}

export interface DisplayBounds {
  x: number
  y: number
  width: number
  height: number
}

export interface WindowState {
  remoteUrl?: string
  width: number
  height: number
  x?: number
  y?: number
  displayBounds?: DisplayBounds
  center?: boolean
  isMaximized: boolean
  isFullScreen: boolean
}
