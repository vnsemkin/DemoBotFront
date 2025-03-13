import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Checkout.module.css";
import { useTelegram } from "../../hooks/useTelegram";
import { FaArrowLeft } from "react-icons/fa";

const Checkout = ({ cart, promoCode, discount }) => {
    const navigate = useNavigate();
    const { tg } = useTelegram();

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shippingCost = 5.00;
    const discountAmount = subtotal * (discount / 100);
    const subtotalAfterDiscount = subtotal - discountAmount;
    const finalTotal = subtotalAfterDiscount + shippingCost;

    // Отправка данных в Telegram
    const handleFakePayment = useCallback(async () => {
        tg.MainButton.text = "Processing...";
        tg.MainButton.show();

        // query_id
        const queryId = tg.initDataUnsafe?.query_id;
        if (!queryId) {
            alert("Ошибка: query_id отсутствует!");
            return;
        }

        // Данные заказа
        const orderDetails = cart
            .map((item) => `${item.title} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
            .join("\n");

        // Формируем текст заказа с промокодом (если он есть)
        const promoText = promoCode ? `\n🎟️ *Промокод:* ${promoCode}` : "";

        const requestData = {
            query_id: queryId,
            chatId: tg.initDataUnsafe?.user?.id,
            text: `
🛒 *Ваш заказ:*  
📦 Товары:  
${orderDetails}  

🚚 Доставка: $${shippingCost.toFixed(2)}  
💰 *Итого:* $${finalTotal.toFixed(2)}  
${promoText} 
        `.trim()
        };

        // Показываем alert перед отправкой данных
        alert("Отправляем на сервер:\n" + JSON.stringify(requestData, null, 2));

        // Отправляем запрос на сервер
        await fetch("https://tgshop.duckdns.org:8020/send-message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData)
        });

        // Закрываем WebApp
        setTimeout(() => {
            tg.close();
        }, 1000);
    }, [tg, cart, promoCode, finalTotal, shippingCost]);


    useEffect(() => {
        tg.MainButton.setText(`Pay $${finalTotal.toFixed(2)}`);
        tg.MainButton.show();
        tg.MainButton.onClick(handleFakePayment);

        return () => {
            tg.MainButton.hide();
            tg.MainButton.offClick(handleFakePayment);
        };
    }, [tg, finalTotal, handleFakePayment]);

    return (
        <div className={styles.checkoutContainer}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    <FaArrowLeft />
                </button>
                <h2 className={styles.checkoutTitle}>Checkout</h2>
            </div>

            <p>Confirm your order before payment:</p>

            <div className={styles.orderList}>
                {cart.map((item, index) => (
                    <div key={index} className={styles.orderItem}>
                        <img
                            src={item.colors[0].images ? item.colors[0].images[0] : item.colors[0].image}
                            alt={item.title}
                            className={styles.orderItemImage}
                        />
                        <div className={styles.orderDetails}>
                            <h3>{item.title}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.cartSummary}>
                <div className={styles.cartSummaryItem}>
                    <p>Sub Total:</p>
                    <b>${subtotal.toFixed(2)}</b>
                </div>

                {discount > 0 && (
                    <div className={`${styles.cartSummaryItem} ${styles.discountApplied}`}>
                        <p>Discount ({discount}%):</p>
                        <b>- ${discountAmount.toFixed(2)}</b>
                    </div>
                )}

                <div className={styles.cartSummaryItem}>
                    <p>Shipping:</p>
                    <b>${shippingCost.toFixed(2)}</b>
                </div>

                <div className={`${styles.cartSummaryItem} ${styles.bagTotal}`}>
                    <p>Bag Total:</p>
                    <b>${finalTotal.toFixed(2)}</b>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
