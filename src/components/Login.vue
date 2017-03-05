<template>
  <div>
    <ul v-if="isLoggedIn">
      <li v-for="room in rooms">
        <router-link
          :to="{name: 'Room', params: { roomName: room.roomName }}">
          {{ room.roomName }}
        </router-link>
      </li>
    </ul>
    <button @click="fbLogin" v-if="!isLoggedIn">Facebook login</button>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      rooms: [],
      isLoggedIn: localStorage.user
    }
  },
  mounted() {
    this.$socket.emit('rooms', (rooms) => {
      this.rooms = rooms
    })

    setTimeout(() => {
      FB.getLoginStatus(response => {
        this.checkLoginState(response)
      })
    }, 200)
  },
  methods: {
    checkLoginState (response) {
      const authResponse = response.authResponse

      FB.api('/me', { fields: 'id,name,email' }, response => {
        response.status = 'connected'
        response.accessToken = authResponse.accessToken
        response.expiresIn = authResponse.expiresIn
        response.signedRequest = authResponse.signedRequest
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(response))
      })
    },
    fbLogin () {
      const valueScope = 'public_profile, email'
      FB.login(this.checkLoginState, { scope: valueScope })
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
