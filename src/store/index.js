import Vue from 'vue'
import Vuex from 'vuex'

// import loginModules from './modules/loginModules'
import app from './modules/app'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // loginModules,
    app
  },
  getters
})
