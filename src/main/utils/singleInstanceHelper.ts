// 创建一个实例检查器函数
function createInstanceChecker() {
  // 创建一个弱映射，用于存储已检查的构造函数
  const checkedConstructors = new WeakMap<object, boolean>()

  // 返回一个函数，用于检查传入的对象是否为实例
  return (obj: unknown): boolean => {
    // 如果传入的对象不是对象，则返回false
    if (!(obj && obj instanceof Object)) {
      return false
    }
    // 如果传入的对象有构造函数
    if (obj.constructor) {
      // 获取构造函数
      const constructor = obj.constructor
      // 如果已检查过该构造函数，则返回检查结果
      if (checkedConstructors.has(constructor)) {
        return checkedConstructors.get(constructor) || false
      }
      // 判断传入的对象是否为构造函数的实例
      const isClass = typeof constructor === 'function' || obj instanceof constructor
      // 将构造函数和检查结果存入弱映射
      checkedConstructors.set(constructor, isClass)
      // 返回检查结果
      return isClass
    }

    // 如果传入的对象没有构造函数，则返回false
    return false
  }
}

export const isClassInstance = createInstanceChecker()

// 导出一个默认函数，用于创建或获取一个对象
export default function createOrGet<T>(objectClass: { new (): T }, storageKey?: string): T {
  // 如果没有传入storageKey，则使用objectClass的name属性作为storageKey
  if (!storageKey) {
    storageKey = objectClass.name
  }
  // 如果globalThis中没有该storageKey，则创建一个新的objectClass实例或直接赋值
  if (!globalThis[storageKey]) {
    globalThis[storageKey] = isClassInstance(objectClass) ? new objectClass() : objectClass
  }
  // 返回globalThis中的该storageKey对应的对象
  return globalThis[storageKey]
}

// 导出一个函数，用于保存或获取对象
export function saveOrGet<T>(objectClass: { new (): T }, storageKey?: string): T {
  // 如果没有传入storageKey，则使用objectClass的name作为storageKey
  if (!storageKey) {
    storageKey = objectClass.name
  }
  // 如果globalThis中没有storageKey对应的对象，则创建一个新的对象
  if (!globalThis[storageKey]) {
    globalThis[storageKey] = isClassInstance(objectClass) ? new objectClass() : objectClass
  }
  // 返回创建或获取的对象
  return createOrGet(objectClass, storageKey)
}
