<script setup lang="ts">
import { AppInfo } from '../types'
import { ref, onMounted } from 'vue'

const appInfo = ref<AppInfo | null>(null)

onMounted(async () => {
  appInfo.value = await window.api.getAppInfo()
})

// 解锁登录
const onOpenPath = async (path?: string) => {
  if (!path) return
  window.api?.openPath(path)
}
</script>

<template>
  <div class="warp">
    <h2>{{ appInfo?.name }}</h2>
    <div class="ver">Version: {{ appInfo?.version }}</div>
    <div @click="onOpenPath(appInfo?.appUserPath)">AppPath: {{ appInfo?.appUserPath }}</div>
  </div>
</template>
