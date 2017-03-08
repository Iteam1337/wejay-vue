<template>
  <div>
    <div v-if="joinedAndPlaying">
      <backdrop />
      <div class="overlay" />
      <droparea />
      <div class="room">
        <settings />
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
    <div v-if="joinedAndNotPlaying" class="empty-room">
      <settings />
      <div class="empty-room-message">
        The room is empty. Drag and drop some songs from Spotify here or add a song from the search to get the party started.
      </div>
      <a href="#" class="remove-room" @click.prevent="removeRoom" >Remove room</a>
      <search />
      <droparea />
    </div>
  </div>
</template>

<script src="./Room.js"></script>
<style src="./Room.css" scoped></style>
