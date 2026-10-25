export interface Habit {
    id: string;
    name: string;
    label: string;
    currentStreak: number;
    completedToday: boolean;
    lastCompleted: number | null;
}