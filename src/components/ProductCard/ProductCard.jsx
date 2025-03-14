import { useNavigate, useParams } from "react-router-dom";
import products from "../../data/products";
import { useEffect, useState } from "react";
import styles from './ProductCard.module.css';
import { FaHeart, FaRegHeart, FaTimes } from "react-icons/fa";

const ProductCard = ({
                         onToggleFavorite,
                         favorites,
                         addToCart,
                         cart,
                         productOptions,
                         updateProductOptions,
                         updateQuantity
                     }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(item => item.id === id);



    // Проверяем, находится ли товар в избранном
    const isFavorite = favorites.some(item => item.id === product.id);

    // Получаем выбранные опции (цвет, размер) для товара
    const options = productOptions[product.id];
    const selectedColor = options?.selectedColor || product.colors[0];
    const selectedSize = options?.selectedSize || product.sizes[0];

    // Локальное состояние для количества, если товар ещё не в корзине
    const [localQuantity, setLocalQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);

    // Проверяем, есть ли товар в корзине и находим его
    const isInCart = cart.some(item => item.id === product.id);
    const globalItem = cart.find(item => item.id === product.id);
    // Если товар в корзине, используем глобальное количество, иначе локальное
    const quantity = isInCart ? globalItem.quantity : localQuantity;

    const handleToggleFavorite = () => {
        onToggleFavorite({
            ...product,
            selectedSize,
            selectedColor
        });
    };

    const handleDecrease = () => {
        if (isInCart) {
            updateQuantity(product.id, Math.max(1, globalItem.quantity - 1));
        } else {
            setLocalQuantity(q => Math.max(1, q - 1));
        }
    };

    const handleIncrease = () => {
        if (isInCart) {
            updateQuantity(product.id, globalItem.quantity + 1);
        } else {
            setLocalQuantity(q => q + 1);
        }
    };

    const handleAddToCart = () => {
        if (!isInCart) {
            addToCart({
                ...product,
                quantity, // используем текущее значение quantity
                selectedSize,
                selectedColor
            });
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 2000);
        }
    };

    // Эффект синхронизации: если товар уже в корзине, обновляем его опции и количество
    useEffect(() => {
        if (isInCart) {
            updateProductOptions(product.id, selectedSize, selectedColor, quantity);
        }
    }, [quantity, isInCart, product.id, selectedSize, selectedColor, updateProductOptions]);

    if (!product) {
        return <h2>Product not found</h2>;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.imageContainer}>
                    <img
                        src={selectedColor.images?.[0] || selectedColor.image}
                        alt={product.title}
                        className={styles.mainImage}
                    />
                    <button className={styles.closeButton} onClick={() => navigate(-1)}>
                        <FaTimes />
                    </button>
                    <button className={styles.favoriteButton} onClick={handleToggleFavorite}>
                        {isFavorite ? (
                            <FaHeart style={{ stroke: 'black' }} className={styles.favoriteActive} />
                        ) : (
                            <FaRegHeart />
                        )}
                    </button>
                </div>

                <div className={styles.details}>
                    <h2 className={styles.title}>{product.title}</h2>
                    <span className={styles.price}>${product.price.toFixed(2)}</span>

                    {/* Выбор цвета */}
                    <div className={styles.colorPicker}>
                        <span>Color:</span>
                        <div className={styles.colors}>
                            {product.colors.map((color, index) => (
                                <div
                                    key={index}
                                    className={`${styles.colorOption} ${selectedColor.name === color.name ? styles.active : ""}`}
                                    style={{ backgroundColor: color.hex }}
                                    onClick={() => updateProductOptions(product.id, selectedSize, color)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Выбор размера */}
                    <div className={styles.sizePicker}>
                        <span>Size:</span>
                        <div className={styles.sizes}>
                            {product.sizes.map((size) => (
                                <button
                                    key={size}
                                    className={`${styles.sizeOption} ${selectedSize === size ? styles.active : ""}`}
                                    onClick={() => updateProductOptions(product.id, size, selectedColor)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Количество и добавление в корзину */}
                    <div className={styles.quantityAddtocart}>
                        <button
                            className={styles.quantityButton}
                            onClick={handleDecrease}
                        >
                            -
                        </button>
                        <span className={styles.quantity}>{quantity}</span>
                        <button
                            className={styles.quantityButton}
                            onClick={handleIncrease}
                        >
                            +
                        </button>

                        <button
                            className={`${styles.addToCart} ${isInCart ? styles.addedToCart : ""}`}
                            onClick={handleAddToCart}
                            disabled={isInCart}
                        >
                            {isInCart ? "Added to Cart" : "Add to Cart"}
                        </button>
                    </div>
                </div>
            </div>
            {showPopup && (
                <div className={styles.popup}>
                    Product successfully added to cart!
                </div>
            )}
        </div>
    );
};

export default ProductCard;
