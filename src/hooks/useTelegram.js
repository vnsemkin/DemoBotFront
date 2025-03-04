/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useMemo, useState } from 'react';

export function useTelegram() {
    const tg = useMemo(() => window.Telegram.WebApp, []);
    const [user, setUser] = useState(null);

    const queryId = tg.initDataUnsafe?.query_id;

    useEffect(() => {
        if (tg.initDataUnsafe?.user) {
            setUser(tg.initDataUnsafe.user);
        }
    }, []);

    const onClose = () => {
        tg.close();
    };

    const onToggleButton = () => {
        if (tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    };

    return {
        onClose,
        onToggleButton,
        tg,
        user, // теперь user хранится в state и обновляется при монтировании
        queryId
    };
}
