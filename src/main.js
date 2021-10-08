import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { createI18n } from 'vue-i18n'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'

import en from './i18n/locales/en'
import fr from './i18n/locales/fr'
import es from './i18n/locales/es'
import it from './i18n/locales/it'

import 'normalize.css'
import '@/sass/styles.scss'

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";


const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    globalInjection: true,
    messages: {
      en,
      fr,
      es,
      it
    }
  })
  app.use(i18n)
})
