<template>
  <div v-if="joinedAndPlaying">
    <backdrop />
    <div class="overlay" />
    <droparea />
    <div class="room">
      <cover />
      <search />
      <div class="now-playing">
        <current-song />
        <controls />
        <queue />
        <position />
      </div>
    </div>
  </div>
  <div v-else class="empty-room">
    <div class="empty-room-message">
      The room is empty. Drag and drop some songs from Spotify here or add a song from the search to get the party started.
    </div>
    <a href="#" class="remove-room" @click.prevent="removeRoom" >Remove room</a>
    <search />
    <droparea />
  </div>
</template>

<script src="./Room.js"></script>
<style src="./Room.css" scoped></style>
