<script setup lang="ts">
import type { Habit } from "../types/habit.ts";
import HabitCard from "./HabitCard.vue";
import {ref, watch} from "vue";


const STORAGE_KEY = "habits";

function loadHabits(): Habit[] {
  try {
    const habits = localStorage.getItem(STORAGE_KEY);
    return habits ? JSON.parse(habits) as Habit[] : [];
  } catch {
    return [];
  }
}

const habits = ref<Habit[]>(loadHabits());

watch(habits, (newHabits) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newHabits));
}, {deep: true});

/* const habits = ref<Habit[]>([{completedToday: false ,currentStreak: 3,label: 'Morning and Evening', id: '1', name: 'Brush teeth' },
  {completedToday: false ,currentStreak: 5,label: 'Every Day', id: '2', name: 'Code 5 minutes' },
  {completedToday: true ,currentStreak: 0,label: '2 Hours, in blocks', id: '3', name: 'Study for test' },
  {completedToday: false ,currentStreak: 3,label: '1 Hour', id: '4', name: 'Improve linux install' },
  {completedToday: false ,currentStreak: 0,label: '5 Minutes', id: '5', name: 'Work on dots' },
  {completedToday: true ,currentStreak: 2,label: '25 Minutes', id: '6', name: 'Read a book' }]);
*/

function addHabit(name: string) {
  const habit: Habit = {
    id: crypto.randomUUID(),
    name,
    label: 'Every Day',
    currentStreak: 0,
    completedToday: false,
    lastCompleted: null
  }
  habits.value.push(habit)
}

function removeHabit(id: string) {
  habits.value = habits.value.filter(habit => habit.id !== id); // removes habit corresponding to id
}

function toggleHabit(id: string) {
  const habit = habits.value.find((habit) => habit.id === id); // finds the habit corresponding to the id in the list
  if (!habit) return // returns if no habit found matching given id

  const now = Date.now();
  const hours = 1;
  const minutes = 1;
  const cooldown = hours * minutes * 60 * 1000;

  if (habit.completedToday) {
    habit.completedToday = false;
    return;
  }
  if (habit.lastCompleted == null || now - habit.lastCompleted > cooldown) {
    habit.currentStreak++
    habit.lastCompleted = now;

  }

  habit.completedToday = true;
}


</script>

<template>
  <section>
    <div class="top-bar">
      <h1>Today's Tasks:</h1>
      <form @submit.prevent="addHabit(($event.target as HTMLFormElement).habitName.value.trim());
($event.target as HTMLFormElement).reset();">
        <input name="habitName" placeholder="Habit Name" required autocomplete="off" maxlength="20" />
      </form>
    </div>
    <div class="habit-grid">
      <HabitCard @toggle="toggleHabit" @remove="removeHabit" v-for="habit in habits" :habit="habit"/>
    </div>
  </section>
</template>

<style scoped>
.top-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

h1 {
  font-size: 3rem;
  text-align: center;
}
button {
  font-size: 2rem;
  text-align: center;
}
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