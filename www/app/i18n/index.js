import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale:'cn',   //语言标识
  messages:{
    'cn':require("./lang/cn.js"),
    'en':require('./lang/en.js')
  }
})

export default i18n
