<template>
  <div class="track" v-if="song">
    <div>
      <artist class="artist" :artists="song.artists" />
      <div class="name">{{ song.name }}</div>
      <div class="album" v-if="song.album">{{ song.album.name }}</div>
      <div class="trivia" v-if="hasPlayed">
        <span v-if="playedByArtist > 0">You've played this artist {{ playedByArtist }} times.</span>
        <span v-if="playedTrack > 0">This song has been played {{ playedTrack }} times</span>
      </div>
    </div>
    <gravatar :user="song.user" :size="60" />
  </div>
</template>

<script>
import Artist from './Artist'
import Gravatar from './Gravatar'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'current-song',
  components: {
    Artist,
    Gravatar
  },
  mounted () {
    if (this.song) {
      this.artistPlays(this.song.artists[0].name)
      this.trackPlays({ artist: this.song.artists[0].name, track: this.song.name })
    }
  },
  watch: {
    song (song) {
      if (song) {
        const artist = song.artists[0].name
        this.artistPlays(artist)
        this.trackPlays({ artist, track: song.name })
      }
    }
  },
  computed: {
    hasPlayed () {
      return this.playedByArtist > 0 || this.playedTrack > 0
    },
    ...mapState({
      song: 'currentSong',
      lastfm: ({ lastfm }) => lastfm.lastfmInstance,
      playedByArtist: ({ lastfm }) => lastfm.artistPlays,
      playedTrack: ({ lastfm }) => lastfm.trackPlays
    })
  },
  methods: {
    ...mapActions([
      'artistPlays',
      'trackPlays'
    ])
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
