<script setup lang="ts">
import HabitCard from "./HabitCard.vue";
import {onMounted, onUnmounted} from "vue";
import {habits, removeHabit} from "../utils/useHabits.ts";

const STORAGE_KEY = "habits";
let coolDownTimer: ReturnType<typeof setInterval>;

onMounted(() => {
  coolDownTimer = setInterval(() => {
    const now = Date.now();

    for (const habit of habits.value) {
      if (
          habit.completedToday &&
          habit.lastCompleted !== null &&
          now >= habit.lastCompleted + habit.intervalMinutes * 60 * 1000
      ) {
        habit.completedToday = false;
      }
    }
  }, 1000)
}); // TODO: Implement streak resetting & improve daily streaks

onUnmounted(() => {
  clearInterval(coolDownTimer);
});

function toggleHabit(id: string) {
  const habit = habits.value.find((habit) => habit.id === id); // finds the habit corresponding to the id in the list
  if (!habit) return // returns if no habit found matching given id

  const now = Date.now(); // Current unix time
  const cooldown = habit.intervalMinutes * 60 * 1000; // The cooldown in seconds

  if (habit.lastCompleted !== null && now < habit.lastCompleted + cooldown) {
    return;
  }
  // Only gets here if cooldown has passed or if it has never started

  habit.completedToday = true;
  habit.currentStreak++
  habit.lastCompleted = now;
}




</script>

<template>
  <section>
    <div class="habit-grid">
      <HabitCard @toggle="toggleHabit" @remove="removeHabit" v-for="habit in habits" :key="habit.id" :habit="habit"/>
    </div>
  </section>
</template>

<style scoped>
.habit-grid{
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.habit-grid > * {
  flex: 0 1 30rem;
  max-width: 100%;
}

</style>