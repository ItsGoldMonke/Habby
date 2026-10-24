<script setup lang="ts">
import type { Habit } from "../types/habit.ts";

const props = defineProps<{
  habit: Habit
}>()

const emit = defineEmits<{
  toggle: [id: string]
}>()


</script>




<template>
  <article class="habit-card">
    <div>
      <h1>{{habit.name}}</h1>
      <h2>{{habit.label}}</h2>
      <p>🔥 Current Streak: {{habit.currentStreak}}</p>
    </div>
    <button @click="$emit('toggle', habit.id)" >{{ habit.completedToday ? "Completed ✅️" : "Mark as completed"}}</button>
  </article>
</template>

<style scoped>
.habit-card {
  display: flex;
  justify-content: space-between;
  margin: 0.2rem 0.6rem;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #B14AED;
  width: 25rem;
  }
button {
  cursor: pointer;
  background: #7C7C7C;
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  font-size: 2rem;
  color: #EEE5E9;
  height: 60%;
  width: 50%;
}
</style>