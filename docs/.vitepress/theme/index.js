import './tailwind.css'
import DefaultTheme from 'vitepress/theme'
import VueLiveWithLayout from './components/vue-live-with-layout'
const modules = import.meta.glob('../../../src/components/**/*.vue', { eager: true })

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('VueLive', VueLiveWithLayout)
    Object.entries(modules).forEach(([filePath, mod]) => {
      const name = mod.default?.name || mod.name || filePath.split('/').pop().replace(/\..+$/, '')
      app.component(name, mod.default)
    })
  }
}
