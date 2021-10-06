import { createRouter, createWebHashHistory } from 'vue-router'
import generatedRoutes from "virtual:generated-pages";
import { setupLayouts } from 'virtual:generated-layouts'


const router = setupLayouts(generatedRoutes)

export default router