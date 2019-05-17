// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//import BootstrapVue from 'bootstrap-vue'
import VueFire from 'vuefire'
import { VueHammer } from 'vue2-hammer'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import Vue2Filters from 'vue2-filters'
import VueSimpleContextMenu from 'vue-simple-context-menu'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css'

// import the global data store (Vuex)
import store from './store.js'


//import './../node_modules/bulma/css/bulma.css'
//import './../node_modules/materialize-css/dist/css/materialize.min.css'
//import './../node_modules/materialize-css/dist/js/materialize.min.js'


Vue.config.productionTip = false



//Vue.use(BootstrapVue);
Vue.use(VueFire);
Vue.use(VueHammer);
Vue.use(Vuetify)
Vue.use(Vuex);
Vue.use(Vue2Filters);

/* eslint-disable no-new */
new Vue({
  el: '#mountHere', //mount on element , css selector #app,
  store,
  components: { App },
  template: '<App/>'
})
