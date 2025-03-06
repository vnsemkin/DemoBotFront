import { useNavigate } from "react-router-dom";
import styles from "./Favorites.module.css";
import { FaTimes } from "react-icons/fa";
import ProductItem from "../ProductItem/ProductItem"; // Импортируем ProductItem

const Favorites = ({ favorites, toggleFavorite }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.favoritesContainer}>
            <div className={styles.header}>
                <h2>Favorites</h2>
                <button className={styles.closeButton} onClick={() => navigate(-1)}>
                    <FaTimes />
                </button>
            </div>

            {favorites.length === 0 ? (
                <p>No favorites yet</p>
            ) : (
                <div className={styles.favoritesGrid}>
                    {favorites.map((product) => (
                        <div key={product.id} className={styles.favoriteItem}>
                            {/* Используем ProductItem */}
                            <ProductItem
                                product={product}
                                onToggleFavorite={toggleFavorite}
                                favorites={favorites}
                            />
                            {/* Кнопка Remove */}
                            <button
                                className={styles.removeButton}
                                onClick={() => toggleFavorite(product)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
