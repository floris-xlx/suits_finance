import { useRouter } from 'next/navigation';

const getLocaleFromQuery = () => {
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('locale') || 'default-locale';
    }
    return 'default-locale';
};

export const useLocaleFromQuery = () => {
    const router = useRouter();
    const locale = getLocaleFromQuery();
    return locale === 'default-locale' ? router.locale : locale;
};

export default useLocaleFromQuery;