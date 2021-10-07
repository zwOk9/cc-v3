import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import Pages from "vite-plugin-pages";
import Layouts from 'vite-plugin-vue-layouts'
import pugPlugin from "vite-plugin-pug"
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const options = { pretty: true } // FIXME: pug pretty is deprecated!
const locals = { name: "My Pug" }

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
  define: { 'process.env': {} },
  plugins:
    [vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Pages({
      extensions: ['vue']
    }),
    Layouts(),
    pugPlugin(options, locals),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "scss",
        })
      ]
    }),
    VueI18n({
      runtimeOnly: true,
      include: [path.resolve(__dirname, 'src/i18n/locals/**')]
    })
    ]
})
