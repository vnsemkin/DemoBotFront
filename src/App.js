import { useEffect } from 'react'
import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Form from './components/Form/Form'
import Header from './components/Header/Header'
import ProductList from './components/ProductList/ProductList'
import { useTelegram } from './hooks/useTelegram'

function App() {
    const { tg } = useTelegram();

    useEffect(() => {
        tg.ready();
        tg.expand(); // Расширяет WebView до полной высоты
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Router basename="/telegram-web-app-react">
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/form" element={<Form />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;