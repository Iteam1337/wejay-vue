<template>
  <div
    class="backdrop"
    :style="{ backgroundImage: 'url(' + album.images[0].url + ')' }"
    v-if="album">
  </div>
</template>

<script>
export default {
  name: 'backdrop',
  props: ['album']
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
