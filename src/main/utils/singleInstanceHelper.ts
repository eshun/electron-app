function createInstanceChecker() {
  const checkedConstructors = new WeakMap()

  return (obj: any): boolean => {
    if (!(obj && obj instanceof Object)) {
      return false
    }
    if (obj.constructor) {
      const constructor = obj.constructor
      if (checkedConstructors.has(constructor)) {
        return checkedConstructors.get(constructor)
      }
      const isClass = typeof constructor === 'function' || obj instanceof constructor
      checkedConstructors.set(constructor, isClass)
      return isClass
    }

    return false
  }
}

export const isClassInstance = createInstanceChecker()

export default function createOrGet<T>(objectClass: { new (): T }, storageKey?: string): T {
  if (!storageKey) {
    storageKey = objectClass.name
  }
  //isClassInstance({});
  //isClassInstance(new objectClass());
  if (!globalThis[storageKey]) {
    //return new (objectClass as { new(): T })();
    globalThis[storageKey] = isClassInstance(objectClass) ? new objectClass() : objectClass
  }
  return globalThis[storageKey]
}

export function saveOrGet<T>(objectClass: { new (): T }, storageKey?: string): T {
  if (!storageKey) {
    storageKey = objectClass.name
  }
  if (globalThis[storageKey]) {
    globalThis[storageKey] = isClassInstance(objectClass) ? new objectClass() : objectClass
  }
  return createOrGet(objectClass, storageKey)
}
