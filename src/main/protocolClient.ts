import { getAppName } from './app'

export function registerProtocolClient(app: Electron.App): void {
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient(getAppName(), process.execPath, [process.argv[1]])
    }
  }

  app.setAsDefaultProtocolClient(getAppName())
}

export function handleProtocolClient(app: Electron.App): void {
  // app.on('open-url', (event, url) => {
  //   event.preventDefault()
  //   const parsedUrl = new URL(url)
  //   const params = Object.fromEntries(parsedUrl.searchParams.entries())
  //   app.emit('protocol-client', parsedUrl.pathname, params)
  // })
}

export function handleProtocolUrl(url: string): void {
  if (!url) return
}
