import VueI18N from 'vue-i18n'
import Vue from 'vue'
import zh from './zh'
import en from './en'
import { getLocale, setLocale } from '../utils/localStorage'

Vue.use(VueI18N)

const messages = {
    zh,
    en
}

let locale = getLocale()
if (!locale) {
    locale = 'zh'
    setLocale(locale)
}

const i18n = new VueI18N({
    locale,
    messages
})

export default i18n
