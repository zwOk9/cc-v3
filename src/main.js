import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'

import 'normalize.css'
import '@/sass/styles.scss'

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";


const routes = setupLayouts(generatedRoutes)

export const createApp = ViteSSG(App, { routes })
