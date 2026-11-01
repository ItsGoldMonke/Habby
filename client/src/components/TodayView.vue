<script setup lang="ts">
import HabitCard from "./HabitCard.vue";
import {onMounted, onUnmounted, ref} from "vue";
import {habits, toggleHabit, getHabitFromId} from "../utils/useHabits.ts";
import HabitForm from "./HabitForm.vue";
import type {Habit} from "../types/habit.ts";
import RemoveModal from "./RemoveModal.vue";

let coolDownTimer: ReturnType<typeof setInterval>;

const props = defineProps<{
  showHabitForm: boolean;
  showRemoveModal: boolean;
}>();

const emit = defineEmits<{
  (event: 'update:showHabitForm', value: boolean): void;
  (event: 'update:showRemoveModal', value: boolean): void;
}>();


onMounted(() => {
  coolDownTimer = setInterval(() => {
    const now = Date.now();

    for (const habit of habits.value) {
      if (
          habit.completedToday &&
          habit.lastCompleted !== null && // Has been completed before
          now >= habit.lastCompleted + habit.intervalMinutes * 60 * 1000 // The time now is over or equal to the time when last completed + the cooldown
      ) {
        habit.completedToday = false; // Makes it not be completed
      }
      else if (
          habit.lastCompleted !== null &&
          now >= habit.lastCompleted + (habit.intervalMinutes * 60 * 1000) * 2 // If cooldown has passed twice
      ) {
        habit.currentStreak = 0; // Reset streak to 0
      }
    }
  }, 1000)
}); // TODO: improve daily streaks

onUnmounted(() => {
  clearInterval(coolDownTimer);
});



const editingHabit = ref<Habit | null>(null);


function closeModal() {
  editingHabit.value = null;
  emit('update:showHabitForm', false);
  emit('update:showRemoveModal', false);
}

function handleEdit(id: string) {
  editingHabit.value = getHabitFromId(id);
  emit('update:showHabitForm', true);
}
function handleRemove(id: string) {
  editingHabit.value = getHabitFromId(id);
  emit('update:showRemoveModal', true);
}

</script>

<template>
  <section>
    <div class="habit-grid">
      <HabitCard @toggle="toggleHabit" @remove="handleRemove" @edit="handleEdit" v-for="habit in habits" :key="habit.id" :habit="habit"/>
    </div>
    <Teleport to="body">
      <Transition name="modal">
        <HabitForm v-if="showHabitForm" :habit="editingHabit" @close-modal="closeModal"/>
      </Transition>
    </Teleport>
    <Teleport to="body">
      <Transition name="modal">
        <RemoveModal v-if="showRemoveModal" :habit="editingHabit" @close-modal="closeModal"/>
      </Transition>
    </Teleport>
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