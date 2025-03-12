import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import products from "../../data/products";
import styles from "./ProductCard.module.css";
import { FaHeart, FaRegHeart, FaTimes } from "react-icons/fa";

const ProductCard = ({ onToggleFavorite, favorites, addToCart, cart }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(item => item.id === id);

    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedImage, setSelectedImage] = useState(
        selectedColor.images ? selectedColor.images[0] : selectedColor.image
    );
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const isInCart = (cart || []).some(item => item.id === product?.id);
    const isFavorite = favorites.some(item => item.id === product.id);

    useEffect(() => {
        setSelectedImage(selectedColor.images ? selectedColor.images[0] : selectedColor.image);
    }, [selectedColor]);


    const handleAddToCart = () => {
        if (!(cart || []).some(item => item.id === product?.id)) {
            addToCart({ ...product, quantity });
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
        }
    };



    if (!product) return <h2>Product not found</h2>;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {/* Основное изображение товара */}
                <div className={styles.imageContainer}>
                    <img src={selectedImage} alt={product.title} className={styles.mainImage} />
                    <button className={styles.closeButton} onClick={() => navigate(-1)}>
                        <FaTimes />
                    </button>
                    <button
                        className={styles.favoriteButton}
                        onClick={() => onToggleFavorite(product)}
                    >
                        {isFavorite ? <FaHeart className={styles.favoriteActive} /> : <FaRegHeart />}
                    </button>
                </div>

                {/* Галерея миниатюр */}
                {selectedColor.images && selectedColor.images.length > 1 && (
                    <div className={styles.gallery}>
                        {selectedColor.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="Thumbnail"
                                className={`${styles.galleryImage} ${selectedImage === img ? styles.active : ""}`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                )}

                {/* Информация о товаре */}
                <div className={styles.details}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>{product.title}</h2>
                        <span className={styles.price}>${product.price.toFixed(2)}</span>
                    </div>

                    {/* Выбор цвета */}
                    <div className={styles.colorsSizes}>
                        <div className={styles.colorPicker}>
                            <span>Color:</span>
                            <div className={styles.colors}>
                                {product.colors.map((color, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.colorOption} ${selectedColor.name === color.name ? styles.active : ""}`}
                                        style={{backgroundColor: color.hex}}
                                        onClick={() => {
                                            setSelectedColor(color);
                                        }}
                                    ></div>
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
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Количество и кнопка добавления в корзину */}
                    <div className={styles.quantityAddtocart}>
                        <div className={styles.quantitySelector}>
                            <button className={styles.quantityButton}
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}>-
                            </button>
                            <span className={styles.quantity}>{quantity}</span>
                            <button className={styles.quantityButton} onClick={() => setQuantity(q => q + 1)}>+</button>
                        </div>
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
                    <p>Product successfully added to cart</p>
                </div>
            )}
        </div>
    );
};

export default ProductCard;
