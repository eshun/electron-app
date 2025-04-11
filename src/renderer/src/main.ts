import './assets/main.css'

import 'uno.css'
import 'virtual:uno.css'
import 'virtual:unocss-devtools'

import '@unocss/reset/normalize.css'
import '@unocss/reset/sanitize/sanitize.css'
import '@unocss/reset/sanitize/assets.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
