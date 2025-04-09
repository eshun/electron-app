import os from 'node:os'
import path from 'node:path'
import * as fs from 'node:fs'

import { isWin } from '../constant'
import { getAppUserBinDir } from './directory'

export async function getBinaryName(name: string): Promise<string> {
  if (isWin) {
    if (!name.endsWith('.exe')) {
      return `${name}.exe`
    }
  }
  return name
}

export async function getBinaryPath(name: string): Promise<string> {
  const binaryName = await getBinaryName(name)
  const binariesDir = getAppUserBinDir()
  const binariesDirExists = await fs.existsSync(binariesDir)
  return binariesDirExists ? path.join(binariesDir, binaryName) : binaryName
}

export async function isBinaryExists(name: string): Promise<boolean> {
  const cmd = await getBinaryPath(name)
  return await fs.existsSync(cmd)
}
