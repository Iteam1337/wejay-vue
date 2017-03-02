<template>
  <div class="album-cover" v-if="album">
    <img class="cover" :src="album.images[0].url" />
  </div>
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
    margin-right: 20px;
  }

  .cover {
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(33, 33, 33, .4);
    max-width: 100%;
  }
</style>
