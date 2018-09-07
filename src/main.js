// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//import './../node_modules/bulma/css/bulma.css'
//import './../node_modules/materialize-css/dist/css/materialize.min.css'
//import './../node_modules/materialize-css/dist/js/materialize.min.js'

Vue.config.productionTip = false

/* eslint-disable no-new */
var app = new Vue({
  el: '#mountHere', //mount on element , css selector #app
  components: { App },
  template: '<App/>'
})

console.log(app);
