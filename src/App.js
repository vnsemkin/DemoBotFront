import './App.css';
import { useEffect, useState } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Route, Routes } from 'react-router-dom';
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import ProductCard from "./components/ProductCard/ProductCard";
import Favorites from "./components/Favorites/Favorites";
import CartPage from "./components/CardPage/CardPage";
import Checkout from "./components/Checkout/Checkout";

function App() {
    const { tg } = useTelegram();
    const [favorites, setFavorites] = useState([]);
    const [cart, setCart] = useState([]);// Храним избранные товары
    const [promoCode, setPromoCode] = useState(""); // Теперь промокод сохраняется в App
    const [discount, setDiscount] = useState(0); // Храним размер скидки

    useEffect(() => {
        tg.ready();
        tg.expand();
    }, [tg]);

    const toggleFavorite = (product) => {
        setFavorites((prev) => {
            const isAlreadyFavorite = prev.some(item => item.id === product.id);
            return isAlreadyFavorite
                ? prev.filter(item => item.id !== product.id) // Удаляем если уже есть
                : [...prev, product]; // Добавляем если нет
        });
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + product.quantity } // Учитываем переданное количество
                        : item
                );
            } else {
                return [...prevCart, product]; // Сохраняем товар с нужным количеством
            }
        });
    };


    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        setCart(prevCart => prevCart.map(item =>
            item.id === productId ? { ...item, quantity: Math.max(1, newQuantity) } : item
        ));
    };

    return (
        <div className="App">
            <Header favoritesCount={favorites.length} cartCount={cart.reduce((total, item) => total + item.quantity, 0)}/>
            <Routes>
                <Route index element={<ProductList onToggleFavorite={toggleFavorite} favorites={favorites} />} />
                <Route path={'form'} element={<Form />} />
                <Route path="product/:id" element={<ProductCard onToggleFavorite={toggleFavorite} addToCart={addToCart} favorites={favorites} cart={cart} />} />
                <Route path="favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} cart={cart} />} />
                <Route
                    path="cart"
                    element={<CartPage
                        cart={cart}
                        removeFromCart={removeFromCart}
                        updateQuantity={updateQuantity}
                        promoCode={promoCode}
                        setPromoCode={setPromoCode}
                        discount={discount}
                        setDiscount={setDiscount}
                    />}
                />
                <Route
                    path="checkout"
                    element={<Checkout cart={cart} promoCode={promoCode} discount={discount} />}
                />
            </Routes>
        </div>
    );
}

export default App;
