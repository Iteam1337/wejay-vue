import Artist from '../Artist'
import Gravatar from '../Gravatar'
import { duration, timeAgo } from '@/utils/helpers'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'queue',
  data () {
    return {
      displayHistory: false,
      user: JSON.parse(localStorage.user)
    }
  },
  components: {
    Artist,
    Gravatar
  },
  filters: {
    duration,
    timeAgo
  },
  computed: {
    ...mapState([
      'history',
      'queue'
    ]),
    ...mapGetters([
      'queueLength',
      'queueTime'
    ]),
    queueItems () {
      if (this.displayHistory) {
        return this.queue.concat(this.history)
      }

      return this.queue
    }
  },
  methods: {
    removeSong (song) {
      if (song.user.id === this.user.id) {
        this.$socket.emit('removeSong', song)
      }
    },
    toggleHistory () {
      this.displayHistory = !this.displayHistory
    }
  }
}
