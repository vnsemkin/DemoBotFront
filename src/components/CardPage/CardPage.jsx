import styles from "./CardPage.module.css"; // Используем модульные стили
import { FaTrash } from "react-icons/fa";

const CartPage = ({ cart, removeFromCart, updateQuantity }) => {
    const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 4.00;
    const total = subTotal + shipping;

    return (
        <div className={styles.cartContainer}>
            <h2 className={styles.cartTitle}>Shopping Bag</h2>

            {cart.length === 0 ? (
                <p className={styles.emptyCart}>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.id} className={styles.cartItem}>
                            <img
                                src={item.colors[0].images ? item.colors[0].images[0] : item.colors[0].image}
                                alt={item.title}
                                className={styles.cartItemImage}
                            />
                            <div className={styles.cartItemDetails}>
                                <h3>{item.title}</h3>
                                <p>${item.price.toFixed(2)}</p>
                                <p>Size: {item.sizes[0]}</p>
                            </div>
                            <div className={styles.cartQuantityControl}>
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                            <button className={styles.cartRemoveButton} onClick={() => removeFromCart(item.id)}>
                                <FaTrash />
                            </button>
                        </div>
                    ))}

                    <div className={styles.cartSummary}>
                        <div className={styles.cartPromo}>
                            <input type="text" placeholder="Promo Code" className={styles.promoInput}/>
                            <button className={styles.applyButton}>Apply</button>
                        </div>
                        <p>Sub Total: <b>${subTotal.toFixed(2)}</b></p>
                        <p>Shipping: <b>${shipping.toFixed(2)}</b></p>
                        <p className={styles.bagTotal}>Bag Total: <b>${total.toFixed(2)}</b></p>
                        <button className={styles.checkoutButton}>Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
