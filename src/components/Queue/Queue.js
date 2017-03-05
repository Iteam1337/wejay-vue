import Artist from '../Artist'
import Gravatar from '../Gravatar'
import { time, timeAgo } from '@/utils/parsers'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'queue',
  data() {
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
    time,
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
    queueItems: function () {
      if (this.displayHistory) {
        return this.queue.concat(this.history)
      }

      return this.queue
    }
  },
  methods: {
    removeSong: function (song) {
      if (song.user.id === this.user.id) {
        this.$socket.emit('removeSong', song)
      }
    },
    toggleHistory: function () {
      this.displayHistory = !this.displayHistory
    }
  }
}
