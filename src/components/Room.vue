<template>
  <div v-if="currentSong">
    <backdrop :album="currentSong.album" />
    <div class="overlay" />
    <div class="room">
      <cover :album="currentSong.album" />
      <search />
      <div class="now-playing">
        <current-song :song="currentSong" />
        <controls :song="currentSong" />
        <queue :history="history" :queue="queue" />
      </div>
    </div>
  </div>
  <div v-else class="empty-room">
    The room is empty. Drag and drop some songs from Spotify here or add a song from the search to get the party started.
    <input v-model="query" @keyup.enter="addSong" />
  </div>
</template>

<script>
import Queue from './Queue/Queue.vue'
import Backdrop from './Backdrop'
import CurrentSong from './CurrentSong'
import Cover from './Cover'
import Search from './Search'
import Controls from './Controls'

export default {
  name: 'hello',
  data () {
    return {
      currentSong: {},
      history: [],
      queue: [],
      users: [],
      query: ''
    }
  },
  components: {
    Backdrop,
    Cover,
    CurrentSong,
    Queue,
    Search,
    Controls
  },
  mounted () {
    const params = {
      roomName: this.$route.params.roomName,
      user: JSON.parse(localStorage.user)
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
    addSong: function () {
      const spotify = 'https://api.spotify.com/v1/search?q='
      const query = `${encodeURI(this.query)}&type=track&market=SE`

      fetch(`${spotify}${query}`)
        .then(res => res.json())
        .then(data => {
          const track = data.tracks.items[0]
          const song = {
            album: track.album,
            artists: track.artists,
            duration: track.duration_ms || track.duration,
            name: track.name,
            spotifyId: track.id || track.spotifyId,
            uri: track.uri,
            started: null,
            position: null,
            user: JSON.parse(localStorage.user)
          }

          this.$socket.emit('addSong', song)

          this.query = ''
        })
    }
  }
}
</script>

<style scoped>
  .room {
    display: flex;
    margin: 120px auto 0;
    width: 70vw;
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
