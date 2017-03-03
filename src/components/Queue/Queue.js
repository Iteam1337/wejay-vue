import Artist from '../Artist'
import Gravatar from '../Gravatar'
import { time, timeAgo } from '@/utils/parsers'

export default {
  name: 'queue',
  props: ['queue', 'history'],
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
    queueItems: function () {
      if (this.displayHistory) {
        return this.queue.concat(this.history)
      }

      return this.queue
    },
    queueLength: function () {
      return this.queue.length
    },
    queueTime: function () {
      return time(this.queue.reduce((a,b) => a + b.duration, 0))
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
