import { shell } from 'electron'
import logger from 'electron-log'

export const openPath = async (_: Electron.IpcMainInvokeEvent, path: string): Promise<void> => {
  shell.openPath(path).catch((err) => logger.error('[IPC - Error] Failed to open file:', err))
}
