import Artist from '@/components/Artist'
import { wejayTrack } from '@/utils/parsers'
import axios from 'axios'

export default {
  name: 'search',
  data() {
    return {
      displaySearch: false,
      previousSearch: '',
      query: '',
      results: [],
      empty: false,
      totalCount: 0
    }
  },
  components: {
    Artist
  },
  directives: {
    focus: {
      inserted (el) {
        el.focus()
      }
    }
  },
  methods: {
    search () {
      this.empty = false

      const spotify = 'https://api.spotify.com/v1/search?q='
      const query = `${encodeURI(this.query)}&type=track&market=SE`

      axios.get(`${spotify}${query}`)
        .then(({ data }) => {
          if (!data.tracks.items.length) {
            this.empty = true
            return false
          }

          this.results = data.tracks.items.slice(0, 10)
          this.previousSearch = this.query
          this.query = ''
          this.totalCount = data.tracks.total
        })
    },
    addSong (track) {
      this.$socket.emit('addSong', wejayTrack(track))
      this.displaySearch = false
      this.results = []
    }
  }
}
