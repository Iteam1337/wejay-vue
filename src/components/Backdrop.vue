<template>
  <div
    class="backdrop"
    :style="{ 'backgroundImage': backdrop }"
    v-if="cover">
  </div>
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
</style>
