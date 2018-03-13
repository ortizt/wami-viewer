// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import io from 'socket.io-client'

Vue.config.productionTip = false

require('./assets/styles.css')

Vue.prototype.$socket = io('http://localhost:3000')
// require('./assets/styles/leaflet.css')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
