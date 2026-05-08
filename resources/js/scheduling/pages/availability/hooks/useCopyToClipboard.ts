import { useCallback, useEffect, useRef, useState } from 'react';

const COPIED_FEEDBACK_MS = 2000;

function useCopyToClipboard() {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const copy = useCallback(async (text: string) => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
    }, []);

    return { copied, copy };
}

export default useCopyToClipboard;
