<script setup lang="ts">

import { CirclePlus } from "@lucide/vue";

const emit = defineEmits<{
  "open-modal": []
}>()

</script>

<template>
  <nav class="top-bar">
    <div></div>

    <div class="tasks">
      <h1>Today's Tasks</h1>
    </div>

    <button aria-label="Add new habit" @click="emit('open-modal')">
      <CirclePlus :strokeWidth="2" :size="48" color="white"/>
    </button>
  </nav>
</template>

<style scoped>

.tasks {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  background: #526375;
  border-radius: 0.4rem;
  margin: 1.5rem;
  align-self: center;
}

.top-bar {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  background: #526375;
  border-radius: 0.4rem;
  margin-bottom: 3rem;
  padding: 0.5rem 5rem;
}

h1 {
  font-size: 3rem;
  text-align: center;
  margin: 0;
}
button {
  justify-self: end;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
}
</style>