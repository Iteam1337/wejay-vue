import { mapState, mapMutations } from 'vuex'
import Queue from '@/components/Queue/Queue.vue'
import Backdrop from '@/components/Backdrop'
import Droparea from '@/components/Droparea'
import CurrentSong from '@/components/CurrentSong'
import Position from '@/components/Position'
import Cover from '@/components/Cover'
import Search from '@/components/Search'
import Controls from '@/components/Controls'
import { wejayTrack } from '@/utils/parsers'
import notifications from '@/utils/notifications'

export default {
  name: 'room',
  data () {
    return {
      joined: false
    }
  },
  computed: {
    joinedAndPlaying () {
      return this.joined && this.currentSong
    },
    joinedAndNotPlaying () {
      console.log(this.currentSong)
      return this.joined && !this.currentSong
    },
    ...mapState([
      'currentSong',
      'history',
      'users',
      'queue'
    ])
  },
  components: {
    Backdrop,
    Controls,
    Cover,
    CurrentSong,
    Droparea,
    Position,
    Queue,
    Search
  },
  mounted () {
    const params = {
      roomName: this.$route.params.roomName,
      user: JSON.parse(localStorage.user)
    }

    this.$socket.emit('join', params, (room) => {
      this.setCurrentSong(room.currentSong)
      this.updateHistory(room.history)
      this.updateQueue(room.queue.slice(1))
      this.updateUsers(room.users)
    })
  },
  sockets:{
    userJoined: function () {
      this.joined = true
    },
    queue: function (queue) {
      this.updateQueue(queue.slice(1))
    },
    nextSong: function (song) {
      this.$socket.emit(
        'history',
        this.$route.params.roomName,
        history => {
          this.updateHistory(history)
        })
      this.setCurrentSong(song)

      if (song) {
        notifications(song)
      }
    }
  },
  methods: {
    removeRoom () {
      this.$socket.emit('removeRoom', this.$route.params.roomName)
      this.$router.push('/')
    },
    ...mapMutations([
      'updateHistory',
      'setCurrentSong',
      'updateUsers',
      'updateQueue'
    ])
  }
}
