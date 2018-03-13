import Vue from 'vue'
import Router from 'vue-router'
import Wami from '@/components/Wami'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Wami',
      component: Wami,
      props: true
    }
  ]
})
