import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { FaTimes } from "react-icons/fa";
import products from "../../data/products";

const ProductCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find(item => item.id === id);

    const [selectedColor, setSelectedColor] = useState(product.colors[0] || null);
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

    if (!product) return <h2>Товар не найден</h2>;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={() => navigate(-1)}>
                    <FaTimes />
                </button>

                <div className={styles.imageContainer}>
                    <img
                        src={selectedColor?.images ? selectedColor.images[0] : selectedColor.image}
                        alt={product.title}
                        className={styles.mainImage}
                    />

                    {selectedColor?.images?.length > 1 && (
                        <div className={styles.gallery}>
                            {selectedColor.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="Доп. фото"
                                    className={styles.galleryImage}
                                    onClick={() => setSelectedColor({ ...selectedColor, images: [img] })}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.details}>
                    <h2 className={styles.title}>{product.title}</h2>
                    <span className={styles.price}>{product.price}₽</span>

                    <div className={styles.colorPicker}>
                        <span>Color:</span>
                        <div className={styles.colors}>
                            {product.colors.map((color, index) => (
                                <div
                                    key={index}
                                    className={`${styles.colorOption} ${selectedColor.name === color.name ? styles.active : ""}`}
                                    style={{ backgroundColor: color.name.toLowerCase() }}
                                    onClick={() => setSelectedColor(color)}
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

                    <button className={styles.addToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
