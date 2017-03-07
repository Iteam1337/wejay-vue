<template>
  <div class="gravatar" :style="{ maxWidth: size + 'px' }" v-if="user">
    <img class="image" :src="gravatarSrc" />
  </div>
</template>

<script>
import md5 from 'md5'

export default {
  name: 'gravatar',
  props: ['user', 'size'],
  computed: {
    gravatarSrc () {
      const gravatarBase = 'http://www.gravatar.com/avatar/'
      const facebookProfileUrl = `http://graph.facebook.com/${this.user.id}/picture?type=large`
      const hash = md5(this.user.email)
      let gravatar = `${gravatarBase}${hash}?d=${encodeURIComponent(facebookProfileUrl)}`

      if (this.size) {
        gravatar = `${gravatar}&s=${this.size}`
      }

      return gravatar
    }
  }
}
</script>

<style scoped>
  .gravatar {
    max-width: 30px;
  }

  .image {
    border-radius: 100%;
    display: block;
    max-width: 100%;
  }
</style>
