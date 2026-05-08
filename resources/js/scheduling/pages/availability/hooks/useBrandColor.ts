import { useEffect, useState } from 'react';

const STORAGE_KEY = 'lokal-pikol:availability-brand-color';

const BRAND_COLOR_PALETTE = [
    '#FFFFFF',
    '#1A365D',
    '#2B6CB0',
    '#2C7A7B',
    '#276749',
    '#744210',
    '#9B2C2C',
    '#702459',
    '#553C9A',
    '#1A202C',
] as const;

const DEFAULT_COLOR = BRAND_COLOR_PALETTE[1];

function useBrandColor() {
    const [color, setColor] = useState<string>(DEFAULT_COLOR);

    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setColor(stored);
        }
    }, []);

    const updateColor = (next: string) => {
        setColor(next);
        window.localStorage.setItem(STORAGE_KEY, next);
    };

    return { color, setColor: updateColor };
}

export { BRAND_COLOR_PALETTE };
export default useBrandColor;
