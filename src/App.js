import './App.css';
import { useEffect, useState } from "react";
import { useTelegram } from "./hooks/useTelegram";
import Header from "./components/Header/Header";
import { Route, Routes } from 'react-router-dom';
import ProductList from "./components/ProductList/ProductList";
import Form from "./components/Form/Form";
import ProductCard from "./components/ProductCard/ProductCard";
import Favorites from "./components/Favorites/Favorites";

function App() {
    const { tg } = useTelegram();
    const [favorites, setFavorites] = useState([]); // Храним избранные товары

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

    return (
        <div className="App">
            <Header favoritesCount={favorites.length} />
            <Routes>
                <Route index element={<ProductList onToggleFavorite={toggleFavorite} favorites={favorites} />} />
                <Route path={'form'} element={<Form />} />
                <Route path="product/:id" element={<ProductCard onToggleFavorite={toggleFavorite} favorites={favorites} />} />
                <Route path="favorites" element={<Favorites favorites={favorites} toggleFavorite={toggleFavorite} />} />
            </Routes>
        </div>
    );
}

export default App;
