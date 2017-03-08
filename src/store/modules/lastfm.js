import Lastfm from 'simple-lastfm'
import md5 from 'md5'

/**
 * Initial state
 */
const state = {
  lastfmInstance: localStorage.lastfm ? new Lastfm({
    api_key: '319a72fffa73a294ac4154c71f9f0050',
    api_secret: 'becb3059b9f909011ccb89df8355a19a',
    username: localStorage.lastfmUser,
    password: localStorage.lastfmPassword,
    session_key: localStorage.lastfm
  }) : {},
  artistPlays: 0,
  trackPlays: 0
}

/**
 * Actions
 */
const actions = {
  getSessionToken ({ commit }, { username, password }) {
    const lastfm = new Lastfm({
      api_key: '319a72fffa73a294ac4154c71f9f0050',
      api_secret: 'becb3059b9f909011ccb89df8355a19a',
      username,
      password
    })

    localStorage.lastfmUser = username
    localStorage.lastfmPassword = md5(username + md5(password))

    lastfm.getSessionKey(({ session_key }) => {
      localStorage.lastfm = session_key
    })

    commit('setInstance', lastfm)
  },
  artistPlays ({ commit, state }, artist) {
    state.lastfmInstance.getPlays({
      artist,
      callback: (response) => {
        commit('artistPlays', response.plays)
      }
    })
  },
  trackPlays ({ commit, state }, { artist, track }) {
    state.lastfmInstance.getPlays({
      artist,
      track,
      callback: (response) => {
        commit('trackPlays', response.plays)
      }
    })
  }
}

/**
 * Mutations
 */
const mutations = {
  setInstance (state, payload) {
    state.lastfmInstance = payload
  },
  artistPlays (state, payload) {
    state.artistPlays = payload
  },
  trackPlays (state, payload) {
    state.trackPlays = payload
  }
}

export default {
  state,
  actions,
  mutations
}
