import { getAppName } from './constant'

export function registerProtocolClient(app: Electron.App) {
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient(getAppName(), process.execPath, [process.argv[1]])
    }
  }

  app.setAsDefaultProtocolClient(getAppName())
}

export function handleProtocolClient(app: Electron.App) {
  // app.on('open-url', (event, url) => {
  //   event.preventDefault()
  //   const parsedUrl = new URL(url)
  //   const params = Object.fromEntries(parsedUrl.searchParams.entries())
  //   app.emit('protocol-client', parsedUrl.pathname, params)
  // })
}

export function handleProtocolUrl(url: string) {
  if (!url) return
}
