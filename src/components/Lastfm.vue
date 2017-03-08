<template>
  <form @submit.prevent="getSessionToken({ username, password })">
    <h2>Last.fm</h2>
    <input class="field" v-model="username" placeholder="Username" />
    <input class="field" v-model="password" type="password" placeholder="Password" />
    <button class="button" type="submit">Connect to Last.fm</button>
  </form>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'lastfm',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      ...mapActions([
        'getSessionToken',
      ])
    }
  }
</script>

<style scoped>
  .field {
    background: none;
    border: 0;
    border-bottom: 1px solid rgba(36, 41, 46, 0.5);
    color: rgba(36, 41, 46, 1);
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

  .button {
    background-color: rgba(66, 185, 131, 1);
    border: 0;
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
