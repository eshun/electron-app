import { ElectronAPI } from '@electron-toolkit/preload'
import { AppInfo } from '@types'

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
