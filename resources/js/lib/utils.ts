import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

// Utility functions for Lokal Pikol
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(amount);
}

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

export function formatTime(date: Date): string {
    return new Intl.DateTimeFormat('en-PH', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(date);
}
