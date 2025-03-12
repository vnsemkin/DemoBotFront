import styles from "./CardPage.module.css";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartPage = ({ cart, removeFromCart, updateQuantity, promoCode, setPromoCode, discount, setDiscount }) => {
    const navigate = useNavigate();

    const subTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 4.00;
    const discountAmount = subTotal * (discount / 100);
    const total = subTotal - discountAmount + shipping;

    const handleApplyPromo = () => {
        if (promoCode.toLowerCase() === "discount10") {
            setDiscount(10);
        } else if (promoCode.toLowerCase() === "discount15") {
            setDiscount(15);
        } else {
            setDiscount(0);
        }
    };

    return (
        <div className={styles.cartContainer}>
            <div className={styles.cartHeader}>
                <button className={styles.backButton} onClick={() => navigate('/')}>
                    <FaArrowLeft />
                </button>
                <h2 className={styles.cartTitle}>Shopping Bag</h2>
            </div>

            {cart.length === 0 ? (
                <p className={styles.emptyCart}>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className={styles.cartItem}
                            onClick={() => navigate(`/product/${item.id}`, { state: item })}
                        >
                            <img
                                src={item.colors[0].images ? item.colors[0].images[0] : item.colors[0].image}
                                alt={item.title}
                                className={styles.cartItemImage}
                            />
                            <div className={styles.secondContainer}>
                                <div className={styles.cartItemDetails}>
                                    <h3>{item.title}</h3>
                                    <p>${item.price.toFixed(2)}</p>
                                    <div className={styles.cartQuantityControlDiv}>
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            updateQuantity(item.id, item.quantity - 1);
                                        }}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            updateQuantity(item.id, item.quantity + 1);
                                        }}>+</button>
                                    </div>
                                </div>
                                <div className={styles.cartQuantityControlSizeTrash}>
                                    <p>{item.sizes[0]}</p>
                                    <button className={styles.cartRemoveButton} onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromCart(item.id);
                                    }}>
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className={styles.cartSummary}>
                        <div className={styles.cartPromo}>
                            <input type="text" placeholder="Promo Code" className={styles.promoInput} value={promoCode}
                                   onChange={(e) => setPromoCode(e.target.value)}/>
                            <button className={styles.applyButton} onClick={handleApplyPromo}>Apply</button>
                        </div>

                        <div className={styles.cartSummaryItem}>
                            <p>Sub Total:</p>
                            <b>${subTotal.toFixed(2)}</b>
                        </div>

                        {discount > 0 && (
                            <div className={`${styles.cartSummaryItem} ${styles.discountApplied}`}>
                                <p>Discount ({discount}%):</p>
                                <b>- ${discountAmount.toFixed(2)}</b>
                            </div>
                        )}

                        <div className={styles.cartSummaryItem}>
                            <p>Shipping:</p>
                            <b>${shipping.toFixed(2)}</b>
                        </div>

                        <div className={`${styles.cartSummaryItem} ${styles.bagTotal}`}>
                            <p>Bag Total:</p>
                            <b>${total.toFixed(2)}</b>
                        </div>

                        <button className={styles.checkoutButton} onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
