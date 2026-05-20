import { router } from '@inertiajs/react';
import invoke from '@/actions/App/Http/Directory/Controllers/TrackListingEventController';

/**
 * `preserveState` and `preserveScroll` prevent the tracking POST from resetting
 * React component state or jumping the scroll position.
 *
 * `except: ['listings', 'filters']` tells Inertia to ignore the server's updated
 * values for those props in the response — keeping the current directory results
 * intact. Without this, the listing grid would re-render from the server response
 * on every tracking event.
 *
 * Note: using Inertia's router for fire-and-forget analytics is a known tradeoff.
 * A plain fetch() call would be cleaner here and avoid needing these options entirely.
 */
const TRACKING_REQUEST_OPTIONS = {
    preserveScroll: true,
    preserveState: true,
    except: ['listings', 'filters'],
};

export default function useListingActions(id: string, bookingUrl: string | null) {
    const trackSocialClick = (platform: string, url: string) => {
        router.post(invoke({ listing: id, event: platform }), {}, TRACKING_REQUEST_OPTIONS);
        window.open(url, '_blank');
    };

    const onBookCourtClicked = () => {
        router.post(invoke({ listing: id, event: 'book' }), {}, TRACKING_REQUEST_OPTIONS);
        if (bookingUrl) {
            window.open(bookingUrl, '_blank');
        }
    };

    return { trackSocialClick, onBookCourtClicked };
}
