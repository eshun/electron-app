/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_MAIN_BUNDLE_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface WebConsoleMessage {
  /**
   * Message text
   */
  message: string
  /**
   * Message severity Possible values include `info`, `warning`, `error`, and
   * `debug`.
   */
  level: 'info' | 'warning' | 'error' | 'debug'
  /**
   * Line number in the log source
   */
  lineNumber: number
  /**
   * URL of the log source
   */
  sourceId: string
}

enum LoggerLevel {
  info = 'info',
  warning = 'warning',
  error = 'error',
  debug = 'debug'
}
