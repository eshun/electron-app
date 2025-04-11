import { defineConfig } from '@unocss/vite'
import presetUno from '@unocss/preset-uno'
import presetAttributify from '@unocss/preset-attributify'
import presetIcons from '@unocss/preset-icons'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  content: {
    pipeline: {
      exclude: ['node_modules', 'out', '.git', '.husky', '.vscode', 'public', 'build', 'mock']
    }
  },
  presets: [
    presetUno({ dark: 'class' }),
    presetAttributify({}),
    presetIcons({
      autoInstall: false
    })
  ],
  transformers: [transformerDirectives()],
  shortcuts: {
    'wh-full': 'w-full h-full',
    'flex-center': 'flex justify-center items-center'
  },
  rules: [
    [/^m-([.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
    [/^p-([.\d]+)$/, ([_, num]) => ({ padding: `${num}px` })]
  ],
  theme: {}
})
