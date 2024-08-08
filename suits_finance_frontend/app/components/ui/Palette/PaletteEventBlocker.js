import {
    GetKeyLocalStorage,
    SetKeyLocalStorage,
} from '@/app/client/caching/LocalStorageRouter';

const PaletteEventBlocker = ({ handleOpenPalette, e }) => {
    if (typeof window === 'undefined') return;

    const handleKeyPress = (e) => {
        const isBlocked =
            GetKeyLocalStorage('BLOCKED_FROM_PALETTE_EVENT') === 'true';
        if (isBlocked) return;

        // prevent left tab key
        if (e.key === 'Tab' && !e.shiftKey) {
            return;
        }


        // keep listening for the F and never initiate solely from the control
        if (e.key === 'Control' && !e.repeat) {
            return;
        }

        if (
            e.target.tagName.toLowerCase() !== 'input' &&
            e.target.tagName.toLowerCase() !== 'textarea' &&
            (e.key.match(/^[a-z]+$/i) || (e.key === 'f' && e.ctrlKey))
        ) {
            handleOpenPalette();
        }
    };
    

    window.addEventListener('keydown', handleKeyPress);

    return () => {
        window.removeEventListener('keydown', handleKeyPress);
    };
};



/// prevent the browser from opening the search bar when pressing ctrl + f
const BlockControlFBrowser = () => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e) => {
        if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) {
            e.preventDefault();
        }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
};

export { PaletteEventBlocker, BlockControlFBrowser };
