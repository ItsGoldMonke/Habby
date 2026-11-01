<script setup lang="ts">

import {computed, ref} from "vue";
import type {Habit, IntervalUnit} from "../types/habit.ts";
import {addHabit, editHabit} from "../utils/useHabits.ts";
import { onClickOutside } from "@vueuse/core";
import {Plus} from "@lucide/vue";

const props = defineProps<{
  habit: Habit | null
}>()

const emit = defineEmits<{
  "close-modal": [];
}>()


const newHabitName = ref(props.habit?.name ?? "");
const intervalValue = ref(props.habit?.intervalValue ?? 1);
const intervalUnit = ref<IntervalUnit>(props.habit?.intervalUnit ?? "days");

const formTitle = computed(() =>
    props.habit ? "Editing Habit" : "Adding Habit"
);


function handleSubmit() {
  const habit = props.habit;
  const name = newHabitName.value?.trim() ?? "";
  const multipliers = {
    minutes: 1,
    hours: 60,
    days: 1440,
  };
  const intervalMinutes = intervalValue.value * multipliers[intervalUnit.value];

  if (intervalValue.value < 1 || !name) return;

  if (habit !== null) {
    editHabit(habit, name, intervalMinutes, intervalValue.value, intervalUnit.value);
  }

  else {
    addHabit(name, intervalMinutes, intervalValue.value, intervalUnit.value);
  }

  emit('close-modal')
}
const target = ref(null)
onClickOutside(target, ()=>emit('close-modal'))
</script>

<template>
  <div class="habitModal">
    <div class="habitForm" ref="target">
      <form @submit.prevent="handleSubmit">
        <h2>{{formTitle}}</h2>
        <input
            v-model="newHabitName"
            type="text"
            name="newHabitName"
            :placeholder="props.habit ? 'Habit Name' : 'New Habit'"
            maxlength="20"
            autocomplete="off"
            required
        />
        <br>
        <div class="intervalControls">
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
          <button type='submit' aria-label="Submit Habit"><Plus style="display: block; margin: 0 auto;"  /></button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.habitModal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.habitForm {
  width: 300px;
  margin: 35vh auto;
  padding: 20px 30px;
  background-color: #F5F7F8;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  text-align: center;
}

@media (width < 500px) {
  .habitForm {
    width: 75%;
  }
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px
}

h2 {
  color: #526375;
  font-size: 30px;
  margin: 0 0 5px;
}

.intervalControls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.intervalControls input {
  width: 65px;
}

.intervalControls select {
  flex: 1;
}

input, select {
  border: 1px solid #c5cdd5;
  outline: none;
  border-radius: 6px;
  background-color: #abb2ba;
  padding: 10px;
  font-size: 15px;
  min-width: 0;
}

input:focus, select:focus {
  border-color: #526375;
}

button {
  border: none;
  border-radius: 6px;
  background-color: #abb2ba;
  color: white;
  font-size: 28px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #3d4c5f;
}
</style>