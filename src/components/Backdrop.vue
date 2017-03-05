<template>
  <transition name="fade">
    <div
      class="backdrop"
      :style="{ 'backgroundImage': backdrop }"
      v-if="cover">
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'backdrop',
    computed: {
      backdrop() {
        return `url(${this.cover})`
      },
      ...mapGetters([
        'cover'
      ])
    }
  }
</script>

<style scoped>
  .backdrop {
    background-size: cover;
    background-position: center center;
    bottom: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
