import { app } from 'electron'
import Store from 'electron-store'

import { Locale, Theme, WindowState } from '@types'

import { DEFAULT_WINDOW_State } from './constant'
import { createOrGet } from './utils'
import { getSystemLocale } from './app'

export class ConfigManager {
  private store: Store
  private subscribers: Map<string, Array<(newValue: any) => void>> = new Map()

  constructor() {
    this.store = new Store()
  }

  getLocale(): Locale {
    let locale = this.store.get('locale') as Locale
    if (locale === undefined) {
      locale = getSystemLocale() as Locale
      this.setLocale(locale)
    }
    return locale
  }

  setLocale(locale: Locale) {
    this.store.set('locale', locale)
  }

  getTheme(): Theme {
    return this.store.get('theme', 'system') as Theme
  }

  setTheme(theme: Theme) {
    this.store.set('theme', theme)
  }

  getWindows(): WindowState[] {
    const windows = this.store.get('windows') as WindowState[]
    if (!windows) {
      return []
    }
    return windows
  }

  getQuickWindow(): WindowState {
    return this.store.get('quickWindow', DEFAULT_WINDOW_State) as WindowState
  }

  setQuickWindow(win: WindowState): void {
    this.store.set('quickWindow', win)
  }

  subscribe<T>(key: string, callback: (newValue: T) => void): void {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, [])
    }
    this.subscribers.get(key)!.push(callback)
  }

  unsubscribe<T>(key: string, callback: (newValue: T) => void): void {
    const subscribers = this.subscribers.get(key)
    if (subscribers) {
      this.subscribers.set(
        key,
        subscribers.filter((subscriber) => subscriber !== callback)
      )
    }
  }

  private notifySubscribers<T>(key: string, newValue: T): void {
    const subscribers = this.subscribers.get(key)
    if (subscribers) {
      subscribers.forEach((subscriber) => subscriber(newValue))
    }
  }

  set(key: string, value: any): void {
    this.store.set(key, value)
  }

  get(key: string): any {
    return this.store.get(key)
  }
}

export const configManager = createOrGet(ConfigManager)
