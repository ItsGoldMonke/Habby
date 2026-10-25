export interface Habit {
    id: string;
    name: string;
    label: string;
    intervalMinutes: number;
    currentStreak: number;
    completedToday: boolean;
    lastCompleted: number | null;
}