import { useNavigate, useParams } from "react-router-dom";
import products from "../../data/products";
import { useState } from "react";
import styles from './ProductCard.module.css';
import { FaHeart, FaRegHeart, FaTimes } from "react-icons/fa";

const ProductCard = ({ onToggleFavorite, favorites, addToCart, cart, productOptions, updateProductOptions }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(item => item.id === id);

    // Сначала проверяем, что товар найден


    // Определяем, находится ли товар в избранном
    const isFavorite = favorites.some(item => item.id === product.id);

    // Берём выбранные опции (цвет, размер) из productOptions
    const options = productOptions[product.id];
    const selectedColor = options?.selectedColor || product.colors[0];
    const selectedSize = options?.selectedSize || product.sizes[0];

    // Локальное состояние для количества
    const [quantity, setQuantity] = useState(1);

    // Проверяем, есть ли товар в корзине
    const isInCart = cart.some(item => item.id === product.id);

    const handleToggleFavorite = () => {
        onToggleFavorite({
            ...product,
            selectedSize,
            selectedColor
        });
    };

    const handleAddToCart = () => {
        if (!isInCart) {
            addToCart({
                ...product,
                quantity,
                selectedSize,
                selectedColor
            });
        }
    };

    if (!product) {
        return <h2>Product not found</h2>;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.imageContainer}>
                    <img
                        // Используем optional chaining для безопасного доступа к массиву
                        src={selectedColor.images?.[0] || selectedColor.image}
                        alt={product.title}
                        className={styles.mainImage}
                    />
                    <button className={styles.closeButton} onClick={() => navigate(-1)}>
                        <FaTimes />
                    </button>
                    <button
                        className={styles.favoriteButton}
                        onClick={handleToggleFavorite}
                    >
                        {isFavorite ? <FaHeart style={{ stroke: 'black' }} className={styles.favoriteActive} /> : <FaRegHeart />}
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
                            onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        >
                            -
                        </button>
                        <span className={styles.quantity}>{quantity}</span>
                        <button
                            className={styles.quantityButton}
                            onClick={() => setQuantity(q => q + 1)}
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
        </div>
    );
};

export default ProductCard;
