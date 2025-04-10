import path from 'node:path'
import * as fs from 'node:fs'
import { app } from 'electron'
import log from 'electron-log'

import { getAppName } from '../app'
import { getAppLogFile } from '../logger'

// 应用根目录
export function getAppDir(): string {
  return app.getAppPath()
}

export function getAppResourceDir(): string {
  const dir = path.join(app.getAppPath(), 'resources')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  return dir
}

// 应用临时文件夹
export function getAppTempDir(): string {
  return path.join(app.getPath('temp'), getAppName())
}

// 应用的用户数据存储路径
export function getAppUserDir(): string {
  return app.getPath('userData')
}

export function getAppUserBinDir(): string {
  const dir = path.join(getAppUserDir(), 'bin')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  return dir
}

export function getAppUserDataDir(): string {
  const dir = path.join(getAppUserDir(), 'Data')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  return dir
}

export function getAppUserFilesDir(): string {
  const dir = path.join(getAppUserDataDir(), 'Files')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  return dir
}

export function getAppLogDir(): string {
  return getAppLogFile().path
}
