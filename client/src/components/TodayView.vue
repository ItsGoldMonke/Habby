<script setup lang="ts">
import HabitCard from "./HabitCard.vue";
import {onMounted, onUnmounted} from "vue";
import {habits, removeHabit, toggleHabit} from "../utils/useHabits.ts";

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