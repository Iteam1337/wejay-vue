<template>
  <div v-if="queueLength">
    <transition-group class="queue" name="fade" tag="ul">
      <li
        class="track"
        :class="{
          'history': item.ended,
          'userAdded': item.user.id === user.id
        }"
        :key="item.spotifyId"
        v-for="item in queueItems"
        @click="removeSong(item)">
        <gravatar :user="item.user" />
        <div class="content">
          <artist class="artist" :artists="item.artists" />
          <div class="song">{{ item.name }}</div>
        </div>
        <div class="duration" v-if="!item.ended">
          {{ item.duration | duration }}
        </div>
        <div class="duration" v-else>
          {{ item.ended | timeAgo }}
        </div>
      </li>
    </transition-group>
    <div class="meta">
      <span v-if="history.length"><a href="#" @click.prevent="toggleHistory">{{ displayHistory ? 'Hide' : 'Show'}} history</a> - </span>
      {{ queueLength }} Songs - Playtime {{ queueTime | duration }}
    </div>
  </div>
  <div v-else class="empty-queue">
    The queue is empty. Add some songs by dragging them from Spotify to the bottom of the Wejay window or by searching.
  </div>
</template>

<script src="./Queue.js"></script>
<style src="./Queue.css" scoped></style>
