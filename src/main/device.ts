import os from 'os'

import { DeviceInfo } from '@types'

export function getDeviceId(): string {
  return ''
}

export function getMachineId(): string {
  return os.machine()
}

export function getMacMachineId(): string {
  //const networkInterfaces = os.networkInterfaces()
  return ''
}

export function getHostname(): string {
  return os.hostname()
}

export function getOS(): string {
  // type version release os.arch()
  return os.type() + ' ' + os.arch() + ' ' + os.version()
}

export function getDeviceInfo(): DeviceInfo {
  return {
    os: getOS(),
    deviceId: getDeviceId(),
    machineId: getMachineId(),
    macMachineId: getMacMachineId(),
    hostname: getHostname()
  }
}
