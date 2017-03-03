<template>
  <transition name="fade">
    <div class="album-cover" v-if="album">
      <img class="cover" :src="album.images[0].url" />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'album-cover',
  props: ['album']
}
</script>

<style scoped>
  .album-cover {
    flex: 1;
    margin-right: 30px;
    max-width: 350px;
    min-width: 300px;
  }

  .cover {
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(33, 33, 33, .4);
    max-width: 100%;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
