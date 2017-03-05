<template>
  <textarea
    class="droparea"
    :class="{ 'droparea-drag': isDragging }"
    @dragleave.prevent="dragleave"
    @dragover.prevent="dragover"
    @drop.prevent="drop"
    @keyup="keyup"
    v-model="droparea"></textarea>
</template>

<script>
  import { wejayTrack } from '@/utils/parsers'

  export default {
    name: 'droparea',
    data () {
      return {
        isDragging: false,
        droparea: ''
      }
    },
    methods: {
      drop: function (e) {
        this.isDragging = false

        const songs = e.dataTransfer
          .getData('text')
          .replace(/https\:\/\/open.spotify.com\/track\//ig, 'https://api.spotify.com/v1/tracks/')
          .split('\n')
          .map(song => this.$http.get(song).then(res => res.json()))


        Promise
          .all(songs)
          .then(tracks => {
            tracks.forEach(track => {
              this.$socket.emit('addSong', wejayTrack(track))
            })
          })
      },
      dragover () {
        this.isDragging = true
      },
      dragleave () {
        this.isDragging = false
      },
      keyup () {
        this.droparea = ''
      }
    }
  }
</script>

<style scoped>
  .droparea {
    background: none;
    border: 0;
    bottom: 0;
    color: transparent;
    cursor: default;
    height: 100%;
    left: 0;
    position: fixed;
    resize: none;
    width: 100%;

    &:focus { outline: none; }
  }

  .droparea-drag {
    background: rgba(66, 185, 131, 0.2);
  }
</style>
