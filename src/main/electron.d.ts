declare global {
  namespace Electron {
    interface App {
      name: string
      version: string
    }
  }
}

export {}
