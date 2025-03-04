import './ProductItem.css';
import Button from '../Button/Button';
import {Link} from "react-router-dom";

const ProductItem = ({ product, className, onAdd }) => {
	const onAddHandler = () => {
		onAdd(product);
	};

	// Проверяем, содержит ли colors[0] массив изображений или одно изображение
	const imageUrl = product.colors[0].images
		? product.colors[0].images[0]  // Берем первое изображение из массива
		: product.colors[0].image; // Если массив отсутствует, берем обычное image

	return (
		<Link to={`/product/${product.id}`} className="product-link">
			<div className={'product ' + className}>
				<div className={'img'}>
					<img src={imageUrl} alt={product.title} className="product-image" />
				</div>
				<div className={'title'}>{product.title}</div>
				<div className={'description'}>{product.description}</div>
				<div className={'price'}>
					<span>Стоимость: <b>{product.price}₽</b></span>
				</div>
				<Button className={'add-btn'} onClick={onAddHandler}>
					Add to Cart
				</Button>
			</div>
		</Link>
	);
};

export default ProductItem;
