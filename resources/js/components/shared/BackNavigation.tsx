import { router } from '@inertiajs/react';
import BackNavigationBase from './BackNavigationBase';

function BackNavigation() {
    return <BackNavigationBase onClick={() => router.visit(window.history.back()!)} />;
}

export default BackNavigation;
