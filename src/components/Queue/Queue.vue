<template>
  <div v-if="queueLength">
    <ul class="queue">
      <li class="track" :class="{ history: item.ended}" v-for="item in queueItems">
        <gravatar :user="item.user" />
        <div class="content">
          <artist class="artist" :artists="item.artists" />
          <div class="song">{{ item.name }}</div>
        </div>
        <div class="duration" v-if="!item.ended">
          {{ item.duration | time }}
        </div>
        <div class="duration" v-else>
          {{ item.ended | timeAgo }}
        </div>
      </li>
    </ul>
    <div class="meta">
      <a href="#" @click.prevent="toggleHistory">{{ displayHistory ? 'Hide' : 'Show'}} history</a>
      - {{ queueLength }} Songs - Playtime {{ queueTime }} 
    </div>
  </div>
  <div v-else class="empty-queue">
    The queue is empty. Add some songs by dragging them from Spotify to the bottom of the Wejay window or by searching.
  </div>
</template>

<script src="./Queue.js"></script>
<style src="./Queue.css" scoped></style>
