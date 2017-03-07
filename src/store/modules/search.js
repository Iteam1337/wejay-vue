import Vue from 'vue'
import axios from 'axios'
import * as types from '../mutation-types'

/**
 * Initial state
 */
const initialState = () => ({
  empty: false,
  previousQuery: '',
  query: '',
  results: [],
  totalCount: 0
})

/**
 * Actions
 */
const actions = {
  search ({ commit }, query) {
    const spotify = 'https://api.spotify.com/v1/search?q='
    const params = `${encodeURI(query)}&type=track&market=SE`

    commit(types.SEARCH_EMPTY, false)

    axios.get(`${spotify}${params}`)
      .then(({ data }) => {
        if (!data.tracks.items.length) {
          return commit(types.SEARCH_EMPTY, true)
        }

        commit(types.SEARCH_RESULTS, {
          results: data.tracks.items,
          totalCount: data.tracks.total,
          previousQuery: query,
          query: ''
        })
      })
  }
}

/**
 * Mutations
 */
const mutations = {
  [types.SEARCH_RESULTS] (state, payload) {
    for (const key in payload) {
      Vue.set(state, key, payload[key])
    }
  },

  [types.SEARCH_EMPTY] (state, value) {
    state.empty = value
  },

  reset (state) {
    const resetState = initialState()

    for (const key in resetState) {
      Vue.set(state, key, resetState[key])
    }
  }
}

export default {
  state: initialState(),
  actions,
  mutations
}
