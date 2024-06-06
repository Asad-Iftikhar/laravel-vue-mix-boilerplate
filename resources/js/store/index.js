import { createStore } from 'vuex'
import { alert } from './modules/alert.module.js'
import { authentication } from './modules/authentication.module.js'


// Create a new store instance.
export const store = createStore({
  modules: {
    alert,
    authentication,
  },
})

export default store
