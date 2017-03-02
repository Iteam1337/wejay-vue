<template>
  <div>
    <ul>
      <li v-for="room in rooms">
        <router-link
          :to="{name: 'Room', params: { roomName: room.roomName }}">
          {{ room.roomName }}
        </router-link>
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
