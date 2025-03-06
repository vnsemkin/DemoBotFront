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

function App() {
    const { tg } = useTelegram();
    const [favorites, setFavorites] = useState([]);
    const [cart, setCart] = useState([]);// Храним избранные товары

    useEffect(() => {
        tg.ready();
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
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    return (
        <div className="App">
            <Header favoritesCount={favorites.length} cartCount={cart.reduce((total, item) => total + item.quantity, 0)}/>
            <Routes>
                <Route index element={<ProductList onToggleFavorite={toggleFavorite} favorites={favorites} />} />
                <Route path={'form'} element={<Form />} />
                <Route path="product/:id" element={<ProductCard onToggleFavorite={toggleFavorite} addToCart={addToCart} favorites={favorites} />} />
                <Route path="favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
                <Route path="cart" element={<CartPage cart={cart} removeFromCart={removeFromCart} />} />
            </Routes>
        </div>
    );
}

export default App;
