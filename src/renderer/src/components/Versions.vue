<script setup lang="ts">
import { reactive } from 'vue'

const versions = reactive({ ...window.electron.process.versions })

///console.info('versions', JSON.stringify(versions))

// setTimeout(() => {
//   throw new Error('Versions.vue: Uncaught Error')
// }, 1000)

// setTimeout(() => {
//   Promise.reject('Versions.vue: unhandledrejection')
// }, 2000)
</script>

<template>
  <ul class="versions">
    <li class="electron-version">Electron v{{ versions.electron }}</li>
    <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
    <li class="node-version">Node v{{ versions.node }}</li>
  </ul>
</template>
