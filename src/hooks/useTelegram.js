/* eslint-disable react-hooks/exhaustive-deps */


import { useMemo } from 'react'


export function useTelegram() {
const tg = useMemo(() => window.Telegram.WebApp, []);
    const onClose = () => {
        tg.close()
    }

    const onToggleButton = () => {
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    return {
        onClose,
        onToggleButton,
        tg,
        user: tg.initDataUnsafe?.user,
    }
}
