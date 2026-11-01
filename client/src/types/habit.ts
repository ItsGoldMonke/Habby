export type IntervalUnit = "minutes" | "hours" | "days";

export interface Habit {
    id: string;
    name: string;
    label: string;
    intervalMinutes: number;
    intervalUnit: IntervalUnit;
    intervalValue: number;
    currentStreak: number;
    completedToday: boolean;
    lastCompleted: number | null;
}