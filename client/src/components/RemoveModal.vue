<script setup lang="ts">
import {CircleX, Trash} from "@lucide/vue";
import {removeHabit} from "../utils/useHabits.ts";
import type {Habit} from "../types/habit.ts";
import {ref} from "vue";
import {onClickOutside, onKeyStroke } from "@vueuse/core";


const props = defineProps<{
  habit: Habit | null
}>()

const emit = defineEmits<{
  "close-modal": [];
}>()

const target = ref(null)
onClickOutside(target, ()=>emit('close-modal'))
onKeyStroke("Escape", () => emit('close-modal'))

function handleSubmit() {
  if (!props.habit) return;


  removeHabit(props.habit.id);
  emit('close-modal')
}

</script>

<template>
  <div class="habitModal">
    <div class="habitForm" ref="target">
        <div class="formTitleBar">
          <div class="formTitleText">
            <h2>Are you sure?</h2>
            <p>Are you sure you want to delete {{ habit?.name }}?</p>
          </div>
          <button @click="emit('close-modal')" aria-label="Close modal"><CircleX class="closeIcon" style="display: block; margin: 0 auto;" nonScalingStroke :strokeWidth="3" :size="28"/></button>
        </div>
          <button @click="handleSubmit()" aria-label="Submit Habit"><Trash class="trashIcon" />  Delete Habit</button>
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
  width: 450px;
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

h2 {
  color: #526375;
  font-size: 30px;
  margin: 0 0 5px;
}

p {
  color: #526375;
  font-size: 14px;
  margin: 0 0 10px;
  text-align: left;
}
.formTitleBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.formTitleText {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}



.formTitleBar button {
  width: 40px;
  height: 40px;
  background-color: transparent;
}
.formTitleBar button:hover {
  color: white;
  background-color: transparent;
}

.formTitleBar button:hover .closeIcon {
  color: #1e1c1c;
  transition: color 0.2s;
}

.closeIcon {
  color: #526375
}

.trashIcon {
  display: block;
  margin: 0 auto;
}

button {
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 6px;
  background-color: #d44a34;
  color: white;
  font-size: 28px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #6c1407;
}
</style>