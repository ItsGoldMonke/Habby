<script setup lang="ts">
import type { Habit } from "../types/habit.ts";

const props = defineProps<{
  habit: Habit
}>()

const emit = defineEmits<{
  toggle: [id: string]
  remove: [id: string]
}>()


</script>




<template>
  <article class="habit-card">
    <h1 class="habit-title">{{habit.name}}</h1>

    <div class="habit-content">
    <div class="habit-description">
      <h2>{{habit.label}}</h2>
      <p>🔥Streak: {{habit.currentStreak}}</p>
    </div>
      <div class="habit-buttons">
    <button @click="$emit('toggle', habit.id)" >{{ habit.completedToday ? "Completed ✅️" : "Mark as completed"}}</button>
    <button @click="$emit('remove', habit.id)" >Remove Habit</button>
      </div>
    </div>
  </article>
</template>

<style scoped>

.habit-card {
  display: flex;
  flex-direction: column;
  margin: 0.2rem 0.6rem;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #B14AED;
  width: 100%;
  box-sizing: border-box;

  }


.habit-title {
  text-align: center;
  margin: 0;
  padding-bottom: 0.3rem;
}
.habit-description {
  min-width: 0;
  overflow-wrap: anywhere;
  text-align: center;
  border-radius: 5px;

}

.habit-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

}


.habit-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  }


button {
  cursor: pointer;
  background: #7C7C7C;
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.2rem;
  color: #EEE5E9;
  height: 50%;
  width: 14rem;
  text-align: center;
}
</style>