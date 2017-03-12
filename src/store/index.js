import Vue from 'vue'
import Vuex from 'vuex'
import search from './modules/search'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    previousSong: {},
    currentSong: {},
    history: [],
    queue: [],
    users: [],
    isPlaying: true
  },
  modules: {
    search
  },
  getters: {
    queueLength (state) {
      return state.queue.length
    },
    queueTime (state) {
      return state.queue.reduce((a, b) => a + b.duration, 0)
    },
    cover (state) {
      if (!state.currentSong.album) {
        return false
      }

      return state.currentSong.album.images[0].url
    }
  },
  mutations: {
    updateQueue (state, payload) {
      state.queue = payload
    },
    updateHistory (state, payload) {
      state.history = payload
    },
    setCurrentSong (state, payload) {
      state.previousSong = state.currentSong
      state.currentSong = payload
    },
    updateUsers (state, payload) {
      state.users = payload
    },
    playState (state, payload) {
      state.isPlaying = payload
    }
  }
})
