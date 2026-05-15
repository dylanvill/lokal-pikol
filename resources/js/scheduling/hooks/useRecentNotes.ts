import { useState } from 'react';

const STORAGE_KEY = 'lokal-pikol:recent-notes';
const MAX_NOTES = 5;

function load(): string[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
        return [];
    }
}

function save(notes: string[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function useRecentNotes() {
    const [recentNotes, setRecentNotes] = useState<string[]>(load);

    const addNote = (note: string) => {
        const trimmed = note.trim();
        if (!trimmed) return;

        const updated = [trimmed, ...recentNotes.filter((n) => n !== trimmed)].slice(0, MAX_NOTES);
        save(updated);
        setRecentNotes(updated);
    };

    return { recentNotes, addNote };
}

export default useRecentNotes;
