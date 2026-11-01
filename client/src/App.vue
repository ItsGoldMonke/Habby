<script setup lang="ts">
import TodayView from "./components/TodayView.vue";
import TopBar from "./components/TopBar.vue";
import {ref} from "vue";

const showHabitForm = ref(false);
</script>

<template>
  <TopBar @open-modal="showHabitForm = true" />
  <TodayView :show-habit-form="showHabitForm" @update:show-habit-form="showHabitForm = $event" />

</template>
