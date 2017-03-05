import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Room from '@/components/Room/Room.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/room/:roomName',
      name: 'Room',
      component: Room
    }
  ]
})
