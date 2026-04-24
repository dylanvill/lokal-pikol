import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import '../css/app.css';
import { Provider } from '@/shared/components/ui/provider';

const appName = import.meta.env.VITE_APP_NAME || 'Lokal Pikol';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => resolvePageComponent(`./scheduling/pages/${name}.tsx`, import.meta.glob('./scheduling/pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Provider>
                <App {...props} />
            </Provider>,
        );
    },
    progress: {
        color: '#FDC20C',
    },
});
