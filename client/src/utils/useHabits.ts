import {ref, watch} from "vue";
import type {Habit, IntervalUnit} from "../types/habit.ts";


const STORAGE_KEY = "habits";


function loadHabits(): Habit[] {
    try {
        const habits = localStorage.getItem(STORAGE_KEY);
        return habits ? JSON.parse(habits) as Habit[] : [];
    } catch {
        return [];
    }
}

export const habits = ref<Habit[]>(loadHabits());

watch(habits, (newHabits) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHabits));
}, {deep: true});

export function addHabit(
    name: string,
    intervalMinutes: number,
    intervalValue: number,
    intervalUnit: IntervalUnit) {
    const habit: Habit = {
        id: crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name,
        label: `Every ${intervalValue} ${intervalUnit}`,
        intervalMinutes, // needs to be implemented in the form later
        currentStreak: 0,
        completedToday: false,
        lastCompleted: null
    }

    habits.value.push(habit)
}


export function removeHabit(id: string) {
    habits.value = habits.value.filter(habit => habit.id !== id); // removes habit corresponding to id
}