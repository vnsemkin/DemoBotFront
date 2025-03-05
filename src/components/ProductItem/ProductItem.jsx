import './ProductItem.module.css';
// import Button from '../Button/Button';
import {Link} from "react-router-dom";
import styles from './ProductItem.module.css'
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useState} from "react";
import clsx from "clsx";

const ProductItem = ({ product, className, onAdd }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	// const onAddHandler = () => {
	// 	onAdd(product);
	// };

	// Проверяем, содержит ли colors[0] массив изображений или одно изображение
	const imageUrl = product.colors[0].images
		? product.colors[0].images[0]  // Берем первое изображение из массива
		: product.colors[0].image; // Если массив отсутствует, берем обычное image

	return (
		<Link to={`/product/${product.id}`} className={styles.productLink}>
			<div className={clsx(styles.product, className, styles.customStyle)}>
				<div className={'img'}>
					<button className={styles.favoriteButton} onClick={() => setIsFavorite(!isFavorite)}>
						{isFavorite ? <FaHeart className={styles.favoriteActive}/> : <FaRegHeart/>}
					</button>
					<img src={imageUrl} alt={product.title} className={styles.productImage}/>
				</div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.description}>{product.description}</div>
				<div className={styles.price}>
					<span><b>${product.price.toFixed(2)}</b></span>
				</div>
				{/*<Button className={'add-btn'} onClick={onAddHandler}>*/}
				{/*	Add to Cart*/}
				{/*</Button>*/}
			</div>
		</Link>
	);
};

export default ProductItem;
