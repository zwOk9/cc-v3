import _ from 'lodash'
import Vue from 'vue'
import locales from './locales'
import moment from 'moment'
import 'moment/locale/fr'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

if (_.isNull(localStorage.getItem('TS2_LANG'))) {
  let lang = navigator.languages && navigator.languages[0].match(/^\w{2}/g)[0] || navigator.language.match(/^\w{2}/g)[0]

  if (lang !== 'fr' || lang !== 'en' || lang !== 'es' || lang !== 'it') {
    lang = 'en'
  }

  localStorage.setItem('TS2_LANG', lang)
}

Vue.config.lang = localStorage.getItem('TS2_LANG')

moment.locale(Vue.config.lang)

export default new VueI18n({
  silentTranslationWarn: process.env.NODE_ENV === 'production',
  locale: Vue.config.lang,
  messages: locales
})
