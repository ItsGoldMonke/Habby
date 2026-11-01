<script setup lang="ts">

import { CirclePlus } from "@lucide/vue";

const emit = defineEmits<{
  "open-modal": []
}>()

</script>

<template>
<nav class="top-bar">
  <h1>Today's Tasks</h1>
  <button aria-label="Add new habit" @click="emit('open-modal')"><CirclePlus style="display: block" :strokeWidth="2" :size="64" color="white"/></button>
</nav>
</template>

<style scoped>
.top-bar {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  gap: 1rem;
  background: #526375;
  border-radius: 0.4rem;
  margin-bottom: 3rem;
}

h1 {
  font-size: 3rem;
  text-align: center;
}
button {
  font-size: 4rem;
  text-align: center;  border: none;
  outline: none;
  background: #526375;
}
</style>