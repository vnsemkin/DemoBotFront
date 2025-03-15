import './App.css';
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Route, Routes } from 'react-router-dom';
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import ProductCard from "./components/ProductCard/ProductCard";
import Favorites from "./components/Favorites/Favorites";
import CartPage from "./components/CardPage/CardPage";
import Checkout from "./components/Checkout/Checkout";
import { useCallback, useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocaltorage";

function App() {
    const { tg } = useTelegram();

    const [favorites, setFavorites] = useLocalStorage('favorites', []);
    const [cart, setCart] = useLocalStorage('cart', []);
    const [promoCode, setPromoCode] = useLocalStorage('promoCode', "");
    const [discount, setDiscount] = useLocalStorage('discount', 0);
    const [productOptions, setProductOptions] = useLocalStorage('productOptions', {});

    useEffect(() => {
        tg.ready();
        tg.expand();
    }, [tg]);

    const updateProductOptions = useCallback((productId, newSize, newColor, newQuantity) => {
        // Обновляем локальное состояние с опциями товара
        setProductOptions(prevOptions => ({
            ...prevOptions,
            [productId]: { selectedSize: newSize, selectedColor: newColor }
        }));

        // Если товар уже в избранном – обновляем его опции
        setFavorites(prevFavorites =>
            prevFavorites.map(item =>
                item.id === productId
                    ? { ...item, selectedSize: newSize, selectedColor: newColor }
                    : item
            )
        );

        // Если товар уже в корзине – обновляем его опции и, если передано, количество
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId
                    ? {
                        ...item,
                        selectedSize: newSize,
                        selectedColor: newColor,
                        quantity: newQuantity !== undefined ? newQuantity : item.quantity
                    }
                    : item
            )
        );
    }, [setProductOptions, setFavorites, setCart]);


    // Добавить/убрать из избранного
    const toggleFavorite = useCallback((product) => {
        setFavorites(prevFavorites => {
            const existingItem = prevFavorites.find(item => item.id === product.id);
            if (existingItem) {
                // Удаляем товар из избранного, если он там уже есть
                return prevFavorites.filter(item => item.id !== product.id);
            } else {
                // Добавляем товар с учётом выбранных опций
                const options = productOptions[product.id] || {};
                return [
                    ...prevFavorites,
                    {
                        ...product,
                        selectedSize: options.selectedSize || product.sizes[0],
                        selectedColor: options.selectedColor || product.colors[0],
                    }
                ];
            }
        });
    }, [productOptions, setFavorites]);

    // Добавление в корзину
    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + product.quantity,
                            selectedSize: product.selectedSize,
                            selectedColor: product.selectedColor
                        }
                        : item
                );
            } else {
                return [...prevCart, product];
            }
        });
    };

    // Удаление из корзины
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    // Обновление количества
    const updateQuantity = (productId, newQuantity) => {
        setCart(prevCart => prevCart.map(item =>
            item.id === productId
                ? { ...item, quantity: Math.max(1, newQuantity) }
                : item
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <div className="App">
            <Header
                favoritesCount={favorites.length}
                cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
            />

            <Routes>
                <Route
                    index
                    element={
                        <ProductList
                            onToggleFavorite={toggleFavorite}
                            favorites={favorites}
                        />
                    }
                />
                <Route path="form" element={<Form />} />

                <Route
                    path="product/:id"
                    element={
                        <ProductCard
                            onToggleFavorite={toggleFavorite}
                            addToCart={addToCart}
                            favorites={favorites}
                            cart={cart}
                            productOptions={productOptions}
                            updateProductOptions={updateProductOptions}
                            updateQuantity={updateQuantity}
                        />
                    }
                />

                <Route
                    path="favorites"
                    element={
                        <Favorites
                            favorites={favorites}
                            toggleFavorite={toggleFavorite}
                            cart={cart}
                        />
                    }
                />

                <Route
                    path="cart"
                    element={
                        <CartPage
                            cart={cart}
                            removeFromCart={removeFromCart}
                            updateQuantity={updateQuantity}
                            promoCode={promoCode}
                            setPromoCode={setPromoCode}
                            discount={discount}
                            setDiscount={setDiscount}
                        />
                    }
                />

                <Route
                    path="checkout"
                    element={
                        <Checkout
                            cart={cart}
                            promoCode={promoCode}
                            discount={discount}
                            clearCart={clearCart}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
