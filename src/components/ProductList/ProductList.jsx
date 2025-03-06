import React, { useState, useCallback, useEffect } from 'react';
import styles from './ProductList.module.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import products from "../../data/products";
import ProductCard from "../ProductCard/ProductCard";

const getTotalPrice = (items = []) => {
	return items.reduce((acc, item) => acc + item.price, 0);
};

const ProductList = ({ onToggleFavorite, favorites }) => {
	const [addedItems, setAddedItems] = useState([]);
	const { tg, queryId } = useTelegram();
	const [search, setSearch] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('Все');
	const [selectedProduct, setSelectedProduct] = useState(null);

	const categories = ["Все", ...new Set(products.map(product => product.category))];

	// Отправка данных на сервер
	const onSendData = useCallback(() => {
		const data = {
			products: addedItems,
			totalPrice: getTotalPrice(addedItems),
			queryId,
		};

		fetch('https://courtesy-caused-navigator-bedroom.trycloudflare.com/web-data', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(() => {
				alert('Заказ успешно отправлен!');
				tg.close();
			})
			.catch(() => {
				alert('Ошибка при отправке данных, попробуйте снова.');
			});
	}, [addedItems, queryId, tg]);

	useEffect(() => {
		tg.onEvent('mainButtonClicked', onSendData);
		return () => tg.offEvent('mainButtonClicked', onSendData);
	}, [onSendData, tg]);

	// Добавление/удаление товара в корзину
	const onAdd = (product) => {
		setAddedItems(prev =>
			prev.some(item => item.id === product.id)
				? prev.filter(item => item.id !== product.id)
				: [...prev, product]
		);
	};

	// Открытие карточки товара
	const handleProductClick = (product) => {
		setSelectedProduct(product);
	};

	// Закрытие карточки товара
	const handleCloseDetails = () => {
		setSelectedProduct(null);
	};

	return (
		<div className={styles.productContainer}>
			{/* Если выбран товар, показываем карточку товара */}
			{selectedProduct ? (
				<ProductCard product={selectedProduct} onClose={handleCloseDetails} />
			) : (
				<>
					{/* Заголовок и строка поиска */}
					<div className={styles.header}>
						<h2>Find the best clothes for you</h2>
						<div className={styles.searchBar}>
							<input
								type="text"
								placeholder="Search"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
						</div>
					</div>

					{/* Фильтр категорий */}
					<div className={styles.categoryFilter}>
						{categories.map(category => (
							<button
								key={category}
								className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ""}`}
								onClick={() => setSelectedCategory(category)}
							>
								{category}
							</button>
						))}
					</div>

					{/* Список товаров */}
					<div className={styles.list}>
						{products
							.filter(product =>
								(selectedCategory === "Все" || product.category === selectedCategory) &&
								product.title.toLowerCase().includes(search.toLowerCase())
							)
							.map(product => (
								<ProductItem
									key={product.id}
									product={product}
									onAdd={onAdd}
									onToggleFavorite={onToggleFavorite}
									favorites={favorites} // Передаем актуальные избранные товары
									onClick={() => handleProductClick(product)}
								/>

							))}
					</div>
				</>
			)}
		</div>
	);
};

export default ProductList;
