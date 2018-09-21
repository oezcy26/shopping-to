// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import VueFire from 'vuefire'
import { VueHammer } from 'vue2-hammer'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import './../node_modules/bulma/css/bulma.css'
//import './../node_modules/materialize-css/dist/css/materialize.min.css'
//import './../node_modules/materialize-css/dist/js/materialize.min.js'


Vue.config.productionTip = false


Vue.use(BootstrapVue);
Vue.use(VueFire);
Vue.use(VueHammer);

/* eslint-disable no-new */
new Vue({
  el: '#mountHere', //mount on element , css selector #app
  components: { App },
  template: '<App/>'
})
