<script setup lang="ts">
import type { Habit } from "../types/habit.ts";
import HabitCard from "./HabitCard.vue";
import {ref} from "vue";
const habits = ref<Habit[]>([{completedToday: false ,currentStreak: 3,label: 'fahgfadgsh', id: '1', name: 'Brush teeth' },
  {completedToday: false ,currentStreak: 5,label: 'fgfdgdfgahh', id: '2', name: 'Code 5 minutes' },
  {completedToday: true ,currentStreak: 0,label: 'faadsdahh', id: '3', name: 'Study for test' },
  {completedToday: false ,currentStreak: 3,label: 'fahdsadash', id: '4', name: 'Improve linux install' },
  {completedToday: false ,currentStreak: 0,label: 'fahh', id: '5', name: 'Work on dots' },
  {completedToday: true ,currentStreak: 2,label: 'fahhfadf', id: '6', name: 'betterfs' }]);

function toggleHabit(id: string) {
  const habit = habits.value.find((habit) => habit.id === id); // finds the habit corresponding to the id in the list
  if (!habit) return // returns if no habit found matching given id

  habit.completedToday = !habit.completedToday; // toggles the completion state
}

</script>

<template>
  <section>
    <h1>Today's Tasks:</h1>
    <div class="habit-grid">
      <HabitCard @toggle="toggleHabit" v-for="habit in habits" :habit="habit"/>
    </div>
  </section>
</template>

<style scoped>
h1 {
  font-size: 3rem;
  text-align: center;
}
.habit-grid{
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
</style>