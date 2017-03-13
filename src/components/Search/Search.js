import Artist from '@/components/Artist'
import { wejayTrack } from '@/utils/helpers'
import { mapActions, mapState, mapMutations } from 'vuex'
import { focus } from '@/directives/'

export default {
  name: 'search',
  data () {
    return {
      displaySearch: false
    }
  },
  components: {
    Artist
  },
  computed: {
    ...mapState({
      results: ({ search }) => search.results.slice(0, 10),
      totalCount: ({ search }) => search.totalCount,
      previousQuery: ({ search }) => search.previousQuery,
      empty: ({ search }) => search.empty
    })
  },
  directives: {
    focus
  },
  methods: {
    ...mapActions([
      'search',
    ]),
    ...mapMutations([
      'reset'
    ]),
    addSong (track) {
      this.$socket.emit('addSong', wejayTrack(track))
      this.displaySearch = false
      this.reset()
    }
  }
}
