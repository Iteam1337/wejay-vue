import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Spotify from '@/components/Spotify'
import Room from '@/components/Room/Room.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
    },
    {
      path: '/spotify',
      name: 'Spotify',
      component: Spotify
    }
  ]
})
