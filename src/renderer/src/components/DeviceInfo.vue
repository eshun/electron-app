<script setup lang="ts">
import { DeviceInfo } from '../types'
import { ref, onMounted } from 'vue'

const deviceInfo = ref<DeviceInfo | null>(null)

onMounted(async () => {
  deviceInfo.value = await window.api.getDeviceInfo()
})
</script>

<template>
  <div class="text">
    <div class="os">OS: {{ deviceInfo?.os }}</div>
    <div>Hostname: {{ deviceInfo?.hostname }}</div>
    <div>DeviceId: {{ deviceInfo?.deviceId }}</div>
  </div>
</template>
