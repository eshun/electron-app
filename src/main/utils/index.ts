import util from 'node:util'

// 将参数转换为字符串
export function formatArgs(args): string {
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
