<template>
  <div
    class="position"
    @mouseover="mouseover"
    @mouseleave="mouseleave">
    <div
      class="bar"
      :class="{ 'hover': isHovering }">
      <transition-group name="fade">
        <div class="current" key="current" v-if="isHovering">{{ position | time }}</div>
        <div class="duration" key="duration" v-if="isHovering">{{ song.duration | time }}</div>
      </transition-group>
      <div
        class="bar-position"
        :style="{ 'width': bar }" />
    </div>
  </div>
</template>

<script>
  import { time } from '@/utils/parsers'
  import { mapState } from 'vuex'

  export default {
    name: 'position',
    data () {
      return {
        id: '',
        position: 0,
        timer: null,
        isHovering: false
      }
    },
    filters: {
      time
    },
    mounted () {
      this.timer = setInterval(this.estimateTime, 1000)
    },
    watch: {
      isPlaying (currentState) {
        if (currentState === false) {
          clearInterval(this.timer)
        } else {
          this.timer = setInterval(this.estimateTime, 1000)
        }
      }
    },
    computed: {
      bar() {
        return `${this.position / this.song.duration * 100}%`
      },
      ...mapState({
        song: 'currentSong',
        isPlaying: 'isPlaying'
      })
    },
    methods: {
      estimateTime () {
        if (!this.song) {
          clearInterval(this.timer)
          return false
        }

        if (this.song.spotifyId !== this.id) {
          this.position = 0
          this.id = this.song.spotifyId
        }

        this.position = this.position > 0 ? this.position + 1000 : this.song.position ? this.song.position : 1000
      },
      mouseover() {
        this.isHovering = true
      },
      mouseleave() {
        this.isHovering = false
      }
    }
  }
</script>

<style scoped>
  .position {
    align-items: flex-end;
    bottom: 0;
    color: #f0f0f0;
    display: flex;
    height: 50px;
    left: 0;
    position: fixed;
    z-index: 20;
    width: 100%
  }

  .bar {
    background: transparent;
    flex: 1;
    height: 5px;
    position: relative;
    transition: height 200ms ease-in-out;
  }

  .hover {
    height: 30px;

    & .bar-position {
      height: 30px;
    }
  }

  .current,
  .duration {
    bottom: 7px;
    display: inline;
    font-size: 14px;
    font-weight: bold;
    position: absolute;
    z-index: 1;
  }

  .current {
    left: 10px;
  }

  .duration {
    right: 10px;
  }

  .bar-position {
    background: rgba(66, 185, 131, 0.6);
    border-radius: 0 2px 0 0;
    height: 5px;
    position: absolute;
    top: 0;
    transition: all 200ms ease-in-out;
    left: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 200ms
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
