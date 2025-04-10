import { ElectronAPI } from '@electron-toolkit/preload'
import { AppInfo, DeviceInfo } from '@types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getAppInfo: () => Promise<AppInfo>
      reload: () => Promise<void>
      getDeviceInfo: () => Promise<DeviceInfo>
      file: {
        openPath: (path: string) => Promise<void>
      }
    }
    logger: Console
  }
}
