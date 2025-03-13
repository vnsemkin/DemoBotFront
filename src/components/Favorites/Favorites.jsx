import { useNavigate } from "react-router-dom";
import styles from "./Favorites.module.css";
import { FaTimes } from "react-icons/fa";
import ProductItem from "../ProductItem/ProductItem";

const Favorites = ({ favorites, toggleFavorite }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.favoritesContainer}>
            <div className={styles.header}>
                <h2>Favorites</h2>
                <button
                    className={styles.closeButton}
                    onClick={() => navigate(-1)}
                >
                    <FaTimes />
                </button>
            </div>

            {favorites.length === 0 ? (
                <p>No favorites yet</p>
            ) : (
                <div className={styles.favoritesGrid}>
                    {favorites.map((product) => {
                        // Если нет выбранного цвета, берём первый из product.colors
                        const selectedColor = product.selectedColor || product.colors[0];
                        const imageToShow =
                            selectedColor?.images?.[0] ||
                            selectedColor?.image ||
                            product.image;

                        return (
                            <div key={product.id} className={styles.favoriteItem}>
                                <ProductItem
                                    product={{
                                        ...product,
                                        image: imageToShow
                                    }}
                                    onToggleFavorite={toggleFavorite}
                                    favorites={favorites}
                                />
                                <button
                                    className={styles.removeButton}
                                    onClick={() => toggleFavorite(product)}
                                >
                                    Remove
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Favorites;
