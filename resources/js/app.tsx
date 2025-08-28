import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import axios from 'axios';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import 'leaflet/dist/leaflet.css';
import { createRoot } from 'react-dom/client';
import 'react-quill-new/dist/quill.snow.css';
import './i18n'; // Import i18n configuration

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (token) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name.toLowerCase()}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />
            </>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});
