<template>
  <div class="track" v-if="song">
    <div>
      <artist class="artist" :artists="song.artists" />
      <div class="name">{{ song.name }}</div>
      <div class="album" v-if="song.album">{{ song.album.name }}</div>
    </div>
    <gravatar :user="song.user" :size="60" />
  </div>
</template>

<script>
import Artist from './Artist'
import Gravatar from './Gravatar'
import { mapState } from 'vuex'

export default {
  name: 'current-song',
  components: {
    Artist,
    Gravatar
  },
  computed: {
    ...mapState({
      song: 'currentSong'
    })
  }
}
</script>

<style scoped>
  .track {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  .artist {
    color: rgba(255, 255, 255, 0.9);
    font-size: 24px;
    font-weight: 700;
    line-height: 1.2;
  }

  .name {
    font-size: 18px;
    margin-bottom: 5px;
    margin-top: 5px;
  }

  .album {
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
  }

  .trivia {
    color: rgba(255, 255, 255, 0.3);
    font-size: 14px;
    margin-top: 10px;
  }
</style>
