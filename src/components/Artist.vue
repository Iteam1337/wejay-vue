<template>
  <div>{{ artists | concatenate }}</div>
</template>

<script>
import { concatenate } from '@/utils/filters'

export default {
  name: 'artist',
  props: ['artists'],
  filters: { concatenate }
}
</script>

<style scoped>
</style>
