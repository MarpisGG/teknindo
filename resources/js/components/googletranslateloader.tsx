import { useEffect } from 'react';

declare global {
    interface Window {
        googleTranslateElementInit?: () => void;
        google?: {
            translate: {
                TranslateElement: any;
                TranslateElementOptions?: any;
                InlineLayout: {
                    SIMPLE: any;
                };
            };
        };
    }
}

const GoogleTranslateLoader = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        document.body.appendChild(script);

        window.googleTranslateElementInit = function () {
            if (window.google && window.google.translate) {
                new window.google.translate.TranslateElement(
                    {
                        pageLanguage: 'en',
                        includedLanguages: 'id,zh-CN', // Only Indonesian and Chinese
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    },
                    'google_translate_element',
                );
            }
        };
    }, []);

    return null;
};

export default GoogleTranslateLoader;
