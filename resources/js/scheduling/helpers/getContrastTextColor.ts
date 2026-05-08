function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const normalised = hex.replace('#', '');
    const value = normalised.length === 3
        ? normalised.split('').map((c) => c + c).join('')
        : normalised;

    return {
        r: parseInt(value.substring(0, 2), 16),
        g: parseInt(value.substring(2, 4), 16),
        b: parseInt(value.substring(4, 6), 16),
    };
}

function relativeLuminance({ r, g, b }: { r: number; g: number; b: number }): number {
    const channel = (value: number) => {
        const v = value / 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function getContrastTextColor(backgroundHex: string): '#000000' | '#FFFFFF' {
    return relativeLuminance(hexToRgb(backgroundHex)) > 0.5 ? '#000000' : '#FFFFFF';
}

export default getContrastTextColor;
