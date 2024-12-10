import { useMemo } from 'react'

// const tg = window.Telegram.WebApp;

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
