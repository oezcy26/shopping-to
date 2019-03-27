import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        persItems: []
    },
    mutations: {
        addPersItem(state, persItemTitle) {
            state.persItems.push(persItemTitle);
        },
        removePersItem(state, idx) {
            state.persItems.splice(idx, 1);
        }
    }
    // use 'actions' for async-call (i.e. after db call)
})