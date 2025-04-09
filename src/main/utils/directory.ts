import os from 'node:os'
import path from 'node:path'
import * as fs from 'node:fs'
import { app } from 'electron'
import log from 'electron-log'

import { getAppName } from '../app'

// 应用根目录
export function getAppDir() {
  return app.getAppPath()
}

export function getAppResourceDir() {
  const dir = path.join(app.getAppPath(), 'resources')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  return dir
}

// 应用临时文件夹
export function getAppTempDir() {
  return path.join(app.getPath('temp'), getAppName())
}

// 应用的用户数据存储路径
export function getAppUserDir() {
  return app.getPath('userData')
}

export function getAppUserBinDir() {
  const dir = path.join(getAppUserDir(), 'bin')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  return dir
}

export function getAppUserDataDir() {
  const dir = path.join(getAppUserDir(), 'Data')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  return dir
}

export function getAppUserFilesDir() {
  const dir = path.join(getAppUserDataDir(), 'Files')
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  return dir
}

export function getAppLogDir() {
  return log.transports.file.getFile().path
}
