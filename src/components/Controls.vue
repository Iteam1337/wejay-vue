<template>
  <div class="controls">
    <button @click="skip">
      <svg version="1.1" class="skip" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
        <path d="M337,96v141.8L96,96v320l241-141.8V416h79V96H337z"/>
      </svg>

    </button>
    <button @click="pause" v-if="isPlaying">
      <svg version="1.1" class="pause" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
        <rect x="128" y="96" width="79" height="320"/>
        <rect x="305" y="96" width="79" height="320"/>
      </svg>
  </button>
    <button @click="play" v-if="!isPlaying">
      <svg version="1.1" class="play" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
        <path d="M128,96v320l256-160L128,96L128,96z"/>
      </svg>
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'controls',
  computed: mapState({
    song: 'currentSong',
    isPlaying: 'isPlaying'
  }),
  methods: {
    ...mapMutations([
      'playState'
    ]),
    pause () {
      this.$socket.emit('pause', this.$route.params.roomName)
      this.playState(false)
    },
    play () {
      this.$socket.emit('play', this.$route.params.roomName)
      this.playState(true)
    },
    skip () {
      this.$socket.emit('skip', this.song)
    }
  }
}
</script>

<style scoped>
  .controls {
    margin-top: 20px;
  }

  button {
    appearance: none;
    background: none;
    border: 0;
    cursor: pointer;
    padding: 0;

    &:focus,
    &:active {
      outline: none;
    }
  }

  .skip,
  .pause,
  .play {
    fill: rgba(255, 255, 255, .7);
    height: 25px;
    width: 25px;
  }
</style>
