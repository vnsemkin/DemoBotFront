import './ProductItem.module.css';
import { Link } from "react-router-dom";
import styles from './ProductItem.module.css';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import clsx from "clsx";

const ProductItem = ({ product, className, onToggleFavorite, favorites=[] }) => {
	const isFavorite = favorites.some(item => item.id === product.id);

	const imageUrl = product.colors[0].images
		? product.colors[0].images[0]
		: product.colors[0].image;

	return (
		<Link to={`/product/${product.id}`} className={styles.productLink}>
			<div className={clsx(styles.product, className, styles.customStyle)}>
				<div className={'img'}>
					<button
						className={styles.favoriteButton}
						onClick={(e) => {
							e.preventDefault(); // Останавливаем переход по `Link`
							onToggleFavorite(product);
						}}
					>
						{isFavorite ? <FaHeart className={styles.favoriteActive} /> : <FaRegHeart />}
					</button>
					<img src={imageUrl} alt={product.title} className={styles.productImage} />
				</div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.description}>{product.description}</div>
				<div className={styles.price}>
					<span><b>${product.price.toFixed(2)}</b></span>
				</div>
			</div>
		</Link>
	);
};

export default ProductItem