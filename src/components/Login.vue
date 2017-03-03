<template>
  <div>
    <ul>
      <li v-for="room in rooms">
        <router-link
          :to="{name: 'Room', params: { roomName: room.roomName }}">
          {{ room.roomName }}
        </router-link>
        <button @click="fbLogin">Facebook login</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      rooms: []
    }
  },
  mounted() {
    this.$socket.emit('rooms', (rooms) => {
      this.rooms = rooms
    })
  },
  methods: {
    fbLogin: function () {
      const valueScope = 'public_profile, email'
      FB.login(response => {
        const authResponse = response.authResponse

        FB.api('/me', { fields: 'id,name,email' }, response => {
          response.status = 'connected'
          response.accessToken = authResponse.accessToken
          response.expiresIn = authResponse.expiresIn
          response.signedRequest = authResponse.signedRequest
          localStorage.setItem('user', JSON.stringify(response))
        })
      }, { scope: valueScope })
    }
  }
}
</script>

<style scoped>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: rgba(66, 185, 131, 0.8);
  }
</style>
