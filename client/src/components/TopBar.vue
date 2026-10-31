<script setup lang="ts">
import {ref} from "vue";

import type { IntervalUnit } from "../types/habit.ts";

const newHabitName = ref("");
const intervalValue = ref(1);
const intervalUnit = ref<IntervalUnit>("days");
import {addHabit} from "../utils/useHabits.ts";

function handleSubmit() {
  const name = newHabitName.value;
  if (!name || intervalValue.value < 1) return;

  const multipliers = {
    minutes: 1,
    hours: 60,
    days: 1440,
  };

  const intervalMinutes = intervalValue.value * multipliers[intervalUnit.value];

  addHabit(name, intervalMinutes, intervalValue.value, intervalUnit.value);
}

</script>

<template>
<nav class="top-bar">
  <h1>Today's Tasks</h1>
  <form @submit.prevent="handleSubmit">
    <input
        v-model="newHabitName"
        type="text"
        name="newHabitName"
        placeholder="New Habit"
        maxlength="20"
        autocomplete="off"
        required
    />
    <input
        v-model.number="intervalValue"
        type="number"
        name="intervalMinutes"
        min="1"
        max="365"
        autocomplete="off"
        required
    />
    <select v-model="intervalUnit">
      <option value="minutes">Minutes</option>
      <option value="hours">Hours</option>
      <option value="days">Days</option>
    </select>
    <button type='submit'>+</button>
  </form>
</nav>
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
</style>