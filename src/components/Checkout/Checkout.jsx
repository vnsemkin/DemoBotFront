import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Checkout.module.css";
import { useTelegram } from "../../hooks/useTelegram";
import { FaArrowLeft } from "react-icons/fa";

const Checkout = ({ cart, promoCode, discount }) => {
    const navigate = useNavigate();
    const { tg } = useTelegram();

    // Вычисляем стоимость товаров
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Учитываем скидку
    const discountAmount = subtotal * (discount / 100);
    const subtotalAfterDiscount = subtotal - discountAmount;

    // Стоимость доставки (фиксированная)
    const shippingCost = 4.00;

    // Итоговая сумма (с учётом скидки и доставки)
    const finalTotal = subtotalAfterDiscount + shippingCost;

    // Оборачиваем в useCallback, чтобы функция не пересоздавалась при каждом рендере
    const handlePayment = useCallback(async () => {
        tg.MainButton.text = "Processing...";
        tg.MainButton.show();

        const response = await fetch("http://localhost:8020/web-data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                queryId: tg.initDataUnsafe?.query_id,
                products: cart,
                promoCode: promoCode
            })
        });

        const data = await response.json();
        if (data.status === "ok") {
            tg.MainButton.text = "Paid!";
            navigate("/success");
        } else {
            tg.MainButton.text = "Payment Failed";
        }

        setTimeout(() => tg.MainButton.hide(), 3000);
    }, [tg, cart, promoCode, navigate]);

    // Показываем MainButton при входе и назначаем обработчик
    useEffect(() => {
        tg.MainButton.setText(`Pay $${finalTotal.toFixed(2)}`);
        tg.MainButton.show();
        tg.MainButton.onClick(handlePayment);

        return () => {
            tg.MainButton.hide();
            tg.MainButton.offClick(handlePayment);
        };
    }, [tg, finalTotal, handlePayment]);

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
