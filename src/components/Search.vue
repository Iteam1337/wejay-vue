<template>
  <div>
    <div class="toggle" @click="displaySearch = !displaySearch">
      <svg version="1.1" class="icon-search" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" v-if="!displaySearch">
        <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3
        c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2
        c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2
        c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z"/>
      </svg>
      <svg version="1.1" class="icon-close" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" v-else>
        <polygon class="st0" points="340.2,160 255.8,244.3 171.8,160.4 160,172.2 244,256 160,339.9 171.8,351.6 255.8,267.8 340.2,352
          352,340.3 267.6,256 352,171.8 "/>
      </svg>
    </div>
    <transition name="fade">
      <div class="search-wrap" v-if="displaySearch">
        <div class="search-bar-wrap">
          <svg version="1.1" class="icon-search icon-search-field" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="512px" height="512px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
            <path d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3
            c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2
            c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2
            c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z"/>
          </svg>
          <div class="search-bar-content">
            <input class="search-bar" @keyup.enter="search" v-model="query" v-focus placeholder="Find some awesome tunes" />
            <span class="underline"></span>
          </div>
        </div>
        <ul v-if="results.length">
          <li v-for="track in results" @click="addSong(track)">
            <img class="cover" :src="track.album.images[0].url" />
            <div class="track-name">{{ track.name }}</div>
            <artist class="artist" :artists="track.artists" />
          </li>
        </ul>
        <div v-if="empty">
          Nothing found
        </div>
        <div class="meta" v-if="totalCount > 0">
          Searched for {{ previousSearch }} - Found {{ totalCount }} tracks - Showing first {{ results.length }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Artist from './Artist'
  import { wejayTrack } from '@/utils/parsers'

  export default {
    name: 'search',
    data() {
      return {
        displaySearch: false,
        previousSearch: '',
        query: '',
        results: [],
        empty: false,
        totalCount: 0
      }
    },
    components: {
      Artist
    },
    directives: {
      focus: {
        inserted (el) {
          el.focus()
        }
      }
    },
    methods: {
      search: function () {
        this.empty = false

        const spotify = 'https://api.spotify.com/v1/search?q='
        const query = `${encodeURI(this.query)}&type=track&market=SE`

        this.$http.get(`${spotify}${query}`)
          .then(res => res.json())
          .then(data => {
            if (!data.tracks.items.length) {
              this.empty = true
              return false
            }

            this.results = data.tracks.items.slice(0, 10)
            this.previousSearch = this.query
            this.query = ''
            this.totalCount = data.tracks.total
          })
      },
      addSong: function (track) {
        this.$socket.emit('addSong', wejayTrack(track))
        this.displaySearch = false
        this.results = []
      }
    }
  }
</script>

<style scoped>
  :root {
    --overflow: {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .toggle {
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    position: fixed;
    right: 30px;
    top: 30px;
    z-index: 1;
  }

  .icon-search,
  .icon-close {
    fill: rgba(255, 255, 255, .7);
  }

  .icon-search {
    height: 25px;
    width: 25px;
  }

  .icon-search-field {
    height: 35px;
    margin-right: 30px;
    width: 35px;
  }

  .icon-close {
    height: 50px;
    width: 50px;
  }

  .search-wrap {
    align-items: center;
    background: rgba(36, 41, 46, 0.95);
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1;
  }

  .search-bar-wrap {
    display: flex;
    position: absolute;
    top: 60px;
    width: 70vw;
  }

  .search-bar-content {
    flex: 1;
  }

  .search-bar {
    background: none;
    border: 0;
    border-bottom: 2px solid rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.5);
    font-size: 24px;
    padding-bottom: 10px;
    transition: border-bottom-color 200ms ease-in-out;
    width: 100%;

    &:focus {
      outline: none;
    }
  }

  .search-bar:focus + .underline {
    transform: scale(1);
  }

  .underline {
    background-color: rgba(66, 185, 131, 0.8);
    box-sizing: border-box;
    display: inline-block;
    height: 2px;
    position: relative;
    transform: scale(0, 1);
    transition: all 200ms linear;
    top: -15px;
    width: 100%;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    margin: 0;
    max-height: 600px;
    max-width: 70vw;
    overflow: auto;
    padding: 0;
  }

  li {
    cursor: pointer;
    padding-bottom: 5px;
    padding-top: 5px;
    transition: all 200ms ease-in-out;
    flex-basis: 20%;
    margin-bottom: 30px;
    overflow: hidden;
    text-align: center;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  .artist {
    @apply --overflow;

    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
  }

  .cover {
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(33, 33, 33, 0.4);
    height: 160px;
    margin-bottom: 10px;
    width: 160px;
  }

  .track-name {
    @apply --overflow;

    color: rgba(255, 255, 255, 0.8);
    font-size: 14px;
    font-weight: bold;
    line-height: 1.5;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 300ms
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }

  .meta {
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    margin-top: 30px;
  }
</style>
