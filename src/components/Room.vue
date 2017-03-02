<template>
  <div v-if="currentSong">
    <backdrop :album="currentSong.album" />
    <div class="overlay" />
    <div class="room">
      <cover :album="currentSong.album" />
      <div class="now-playing">
        <current-song :song="currentSong" />
        <queue :history="history" :queue="queue" />
      </div>
    </div>
  </div>
  <div v-else class="empty-room">
    The room is empty. Drag and drop some songs from Spotify here or add a song from the search to get the party started.
  </div>
</template>

<script>
import Queue from './Queue/Queue.vue'
import Backdrop from './Backdrop'
import CurrentSong from './CurrentSong'
import Cover from './Cover'

export default {
  name: 'hello',
  data () {
    return {
      currentSong: {},
      history: [],
      queue: [],
      users: []
    }
  },
  components: {
    Backdrop,
    Cover,
    CurrentSong,
    Queue
  },
  mounted () {
    const params = {
      roomName: this.$route.params.roomName,
      user: 'belli'
    }

    this.$socket.emit('join', params, (room) => {
      this.currentSong = room.currentSong
      this.history = room.history
      this.queue = room.queue.slice(1)
      this.users = room.users
    })
  },
  sockets:{
    queue: function (val) {
      this.queue = val.slice(1)
    },
    nextSong: function (val) {
      this.currentSong = val
    }
  },
  methods: {
    skip: function () {
      this.$socket.emit('skip')
    }
  }
}
</script>

<style scoped>
  .room {
    display: flex;
    margin: 120px auto 0;
    width: 90vw;
    position: relative;
    z-index: 10;
  }

  .overlay {
    background: rgb(36, 41, 46, 0.95);
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  .now-playing {
    flex: 2;
  }

  .empty-room {
    background-color: rgba(255,255,255,0.85);
    border-radius: 5px;
    color: #24292e;
    font-size: 14px;
    letter-spacing: .015em;
    line-height: 1.5;
    margin: 200px auto;
    padding: 20px;
    text-align: center;
    max-width: 400px;
  }
</style>
