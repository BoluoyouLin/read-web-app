import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book'
import bookMall from './modules/bookMall'
import getters from './getters'
import actions from './actions'
import shelf from './modules/shelf'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book,
    bookMall,
    shelf,
    user
  },
  getters,
  actions
})
