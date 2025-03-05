import {Link, useNavigate} from "react-router-dom";
import styles from "./Favorites.module.css";
import {FaTimes} from "react-icons/fa";

const Favorites = ({ favorites, toggleFavorite }) => {
    const navigate = useNavigate()
    return (
        <div className={styles.favoritesContainer}>
            <div className={styles.header}>
                <h2>Favorites</h2>
                <button className={styles.closeButton} onClick={() => navigate(-1)}>
                    <FaTimes/>
                </button>
            </div>

            {favorites.length === 0 ? (
                <p>No favorites yet</p>
            ) : (
                <div className={styles.favoritesGrid}>
                    {favorites.map((product) => (
                        <div key={product.id} className={styles.favoriteItem}>
                            <Link to={`/product/${product.id}`}>
                                <img src={product.colors[0].image} alt={product.title} className={styles.productImage} />
                                <h3>{product.title}</h3>
                            </Link>
                            <button className={styles.removeButton} onClick={() => toggleFavorite(product)}>
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
