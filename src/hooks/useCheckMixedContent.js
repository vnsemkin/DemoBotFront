import { useEffect } from 'react';

function useCheckMixedContent() {
    useEffect(() => {
        const currentProtocol = window.location.protocol; // 'https:' или 'http:'
        const apiUrl = 'http://95.179.251.170:8020/web-data'; // ваша цель

        console.log('[DEBUG] Текущий протокол:', currentProtocol);
        console.log('[DEBUG] URL сервера:', apiUrl);

        // Если фронт открыт по HTTPS, а запрос указывает на http://, браузер, скорее всего, заблокирует запрос
        if (currentProtocol === 'https:' && apiUrl.startsWith('http://')) {
            console.warn('[WARNING] Возможная проблема Mixed Content: вы пытаетесь обратиться к http-серверу с https-страницы. Запрос может быть заблокирован.');
        }
    }, []);
}

export default useCheckMixedContent;
