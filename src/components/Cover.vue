<template>
  <transition name="fade">
    <div class="album-cover" v-if="cover">
      <img class="cover" :src="cover" />
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'cover',
    computed: {
      ...mapGetters([
        'cover'
      ])
    }
  }
</script>

<style scoped>
  .album-cover {
    flex: 1;
    margin-right: 30px;
    max-width: 350px;
    min-width: 300px;
  }

  .queue-album {
    margin-left: 10px;
    margin-right: 0;
    max-width: 30px;
    min-width: 30px;

    .cover {
      border-radius: 0;
    }
  }

  .cover {
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(33, 33, 33, .4);
    max-width: 100%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 300ms
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
