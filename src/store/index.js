import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentSong: {},
    history: [],
    queue: [],
    users: [],
    isPlaying: true
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
