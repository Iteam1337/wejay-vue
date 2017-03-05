<template>
  <div class="login">
    <div class="login-content" v-if="isLoggedIn">
      <h2 class="rooms-title">Available rooms</h2>
      <ul class="rooms">
        <li class="room" v-for="room in rooms">
          <router-link
            class="room-link"
            :to="{name: 'Room', params: { roomName: room.roomName }}">
            {{ room.roomName }}
          </router-link>
        </li>
      </ul>
      <hr />
      <input v-model="newRoom" placeholder="Add a new room" class="add-input" />
      <router-link :to="{ name: 'Room', params: { roomName: newRoom }}" class="add-button">New room</router-link>
    </div>
    <div class="logged-out" v-else>
      Login with your Facebook account to join the party!
      <button class="fb-login" @click="fbLogin">Facebook login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      rooms: [],
      isLoggedIn: localStorage.user,
      newRoom: ''
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
  .login {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
  }

  .login-content {
    width: 300px;
  }

  .rooms-title {
    font-weight: 300;
  }

  .rooms {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .room {
    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  .room-link {
    background-color: #2d3339;
    border-radius: 3px;
    color: #fff;
    display: block;
    text-decoration: none;
    transition: background-color 200ms ease-in-out;
    padding: 10px 20px;

    &:hover {
      background-color: #363d45
    }
  }

  hr {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.05);
    margin-bottom: 30px;
    margin-top: 30px;
  }

  .logged-out {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .fb-login {
    appearance: none;
    background-color: #3b5998;
    border: 0;
    border-radius: 3px;
    color: #fff;
    display: block;
    font-size: 16px;
    margin-top: 20px;
    padding: 10px 20px;
  }

  /*
  // Add
  // ------------------------------------------------*/
  .add-input {
    background: none;
    border: 0;
    border-bottom: 2px solid rgba(255, 255, 255, 0.15);
    color: #fff;
    font-size: 18px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    transition: border-bottom-color 200ms ease-in-out;
    width: 100%;

    &:focus {
      border-bottom-color: rgba(66, 185, 131, 0.8);
      outline: none;
    }
  }

  .add-button {
    background-color: rgba(66, 185, 131, 1);
    border-radius: 20px;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: block;
    font-size: 14px;
    font-weight: 700;
    opacity: 0.9;
    padding: 10px;
    text-transform: uppercase;
    text-align: center;
    text-decoration: none;
    transition: opacity 200ms ease-in-out;
    width: 100%;

    &:hover {
      opacity: 1;
    }
  }
</style>
