export const isMac = process.platform === 'darwin'
export const isWin = process.platform === 'win32'
export const isLinux = process.platform === 'linux'
export const isDev = process.env.NODE_ENV === 'development'

export const DEFAULT_WINDOW_State = {
  width: 900,
  height: 670,
  x: 0,
  y: 0,
  isMaximized: false,
  isFullScreen: false
}
