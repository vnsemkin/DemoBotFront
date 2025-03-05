import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";
import products from "../../data/products";
import styles from "./ProductCard.module.css";
import {FaHeart, FaRegHeart, FaTimes} from "react-icons/fa";


const ProductCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(item => item.id === id);

    const defaultColor = product.colors?.[0] || {};

    const [selectedColor, setSelectedColor] = useState(product?.colors[0] || null);
    const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
    const [mainImage, setMainImage] = useState(defaultColor.images?.[0] || defaultColor.image || "");
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    if (!product) return <h2>Товар не найден</h2>;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {/*<button className={styles.closeButton} onClick={() => navigate(-1)}>*/}
                {/*    <FaTimes />*/}
                {/*</button>*/}

                <div className={styles.imageContainer}>
                    <img
                        src={selectedColor?.images ? selectedColor.images[0] : selectedColor.image}
                        alt={product.title}
                        className={styles.mainImage}
                    />
                    <button className={styles.closeButton} onClick={() => navigate(-1)}>
                        <FaTimes/>
                    </button>
                    <button className={styles.favoriteButton} onClick={() => setIsFavorite(!isFavorite)}>
                        {isFavorite ? <FaHeart className={styles.favoriteActive}/> : <FaRegHeart/>}
                    </button>
                    {selectedColor?.images?.length > 1 && (
                        <div className={styles.gallery}>
                            {selectedColor.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="Доп. фото"
                                    className={`${styles.galleryImage} ${selectedColor.images[0] === img ? styles.active : ""}`}
                                    onClick={() => setSelectedColor({...selectedColor, images: [img]})}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.details}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>{product.title}</h2>
                        <span className={styles.price}>{product.price}₽</span>
                    </div>

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
                                            setMainImage(color.images?.[0] || color.image || "");
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>

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

                    <div className={styles.quantityAddtocart}>
                        <div className={styles.quantitySelector}>
                            <div className={styles.quantityControls}>
                                <button className={styles.quantityButton}
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}>-
                                </button>
                                <span className={styles.quantity}>{quantity}</span>
                                <button className={styles.quantityButton} onClick={() => setQuantity(q => q + 1)}>+
                                </button>
                            </div>
                        </div>

                        <button className={styles.addToCart}>Add to Cart</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductCard;