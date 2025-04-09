import util from 'node:util'

export function formatArgs(args) {
  return args
    .map((arg) => {
      try {
        return typeof arg === 'object' && arg !== null
          ? util.inspect(arg, { colors: false, depth: null })
          : String(arg)
      } catch {
        return `[Unserializable: ${Object.prototype.toString.call(arg)}]`
      }
    })
    .join(' ')
}
