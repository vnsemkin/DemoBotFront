import { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Form from './components/Form/Form';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import { useTelegram } from './hooks/useTelegram';

function App() {
    const { tg } = useTelegram();

    useEffect(() => {
        tg.ready();
        tg.expand()
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/telegram-web-app-react/" element={<ProductList />} />
                <Route path="/telegram-web-app-react/form" element={<Form />} />
            </Routes>
        </div>
    );
}

export default App;
