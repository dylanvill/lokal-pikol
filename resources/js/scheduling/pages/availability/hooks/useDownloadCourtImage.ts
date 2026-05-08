import html2canvas from 'html2canvas';
import { useCallback, useState } from 'react';

function slugify(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function useDownloadCourtImage() {
    const [isDownloading, setIsDownloading] = useState(false);

    const download = useCallback(async (node: HTMLElement, courtName: string, date: string) => {
        setIsDownloading(true);
        try {
            const canvas = await html2canvas(node, {
                backgroundColor: null,
                scale: 1,
                useCORS: true,
            });
            const filename = `${slugify(courtName)}-${date}.png`;
            const link = document.createElement('a');
            link.download = filename;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } finally {
            setIsDownloading(false);
        }
    }, []);

    return { isDownloading, download };
}

export default useDownloadCourtImage;
