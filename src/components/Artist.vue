<template>
  <div>{{ artists | concatenate }}</div>
</template>

<script>
export default {
  name: 'artist',
  props: ['artists', 'className'],
  filters: {
    concatenate: function (artists) {
      return (artists || [])
        .map(artist => artist.name)
        .join(', ')
    } 
  }
}
</script>

<style scoped>
</style>
