import { ElectronAPI } from '@electron-toolkit/preload'

interface Console {
  debug: (...args) => void
  log: (...args) => void
  info: (...args) => void
  warn: (...args) => void
  error: (...args) => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getAppInfo: () => Promise<AppInfo>
      reload: () => void
    }
    console: Console
  }
}
