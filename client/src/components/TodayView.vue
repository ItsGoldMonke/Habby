<script setup lang="ts">
import type { Habit } from "../types/habit.ts";
import HabitCard from "./HabitCard.vue";
import {onMounted, onUnmounted, ref, watch} from "vue";


const STORAGE_KEY = "habits";
let coolDownTimer: ReturnType<typeof setInterval>;

const newHabitName = ref("");
const intervalValue = ref(1);
const intervalUnit = ref("days");


function loadHabits(): Habit[] {
  try {
    const habits = localStorage.getItem(STORAGE_KEY);
    return habits ? JSON.parse(habits) as Habit[] : [];
  } catch {
    return [];
  }
}

const habits = ref<Habit[]>(loadHabits());

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
});

onUnmounted(() => {
  clearInterval(coolDownTimer);
});


watch(habits, (newHabits) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newHabits));
}, {deep: true});

function addHabit(name: string, intervalMinutes: number) {
  const habit: Habit = {
    id: crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name,
    label: `Every ${intervalValue.value} ${intervalUnit.value}`,
    intervalMinutes, // needs to be implemented in the form later
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

function handleSubmit() {
  const name = newHabitName.value;
  if (!name || intervalValue < 1) return;

  const multipliers = {
    minutes: 1,
    hours: 60,
    days: 1440,
  };

  const intervalMinutes = intervalValue.value * multipliers[intervalUnit.value];

  addHabit(name, intervalMinutes);
}


</script>

<template>
  <section>
    <div class="top-bar">

      <h1>Today's Tasks:</h1>
      <form @submit.prevent="handleSubmit">
        <input
            v-model="newHabitName"
            name="habitName"
            placeholder="Habit Name"
            required
            maxlength="20"
            autocomplete="off"
        />
        <input
            v-model.number="intervalValue"
            type="number"
            name="intervalMinutes"
            min="1"
            max="365"
            required
        />
        <select v-model="intervalUnit">
          <option value="minutes">Minutes</option>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
        </select>
        <button type="submit">+</button>
      </form>

    </div>

    <div class="habit-grid">
      <HabitCard @toggle="toggleHabit" @remove="removeHabit" v-for="habit in habits" :key="habit.id" :habit="habit"/>
    </div>
  </section>
</template>

<style scoped>


.top-bar {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-around;
  gap: 1rem;
}

form {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 600px) {
  form {
    flex-direction: column;
    align-items: end;
  }
}

.top-bar input {
  font-size: 2rem;
  background: #788697;
  border: none;
  outline: none;
  align-content: center;
  width: 11rem;
  border-radius: 5px;
}

.top-bar input[type='number'] {
  width: 4rem;
}

.top-bar select {
  font-size: 2rem;
  background: #788697;
  border: none;
  outline: none;
  align-content: center;
  width: 11rem;
  border-radius: 5px;
}

.top-bar [type='submit'] {
  width: 2.5rem;
  background: #526375;
  font-size: 2rem;
  outline: none;
  border-radius: 5px;
}

h1 {
  font-size: 3rem;
  text-align: center;
}
button {
  font-size: 2rem;
  text-align: center;  border: none;
  outline: none;

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