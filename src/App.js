import { useEffect } from 'react'
import './App.css';
import { Route, Routes } from 'react-router-dom'
import Form from './components/Form/Form'
import Header from './components/Header/Header'
import ProductList from './components/ProductList/ProductList'


const tg = window.Telegram.WebApp;
function App() {
  
  
  useEffect(() => {
    tg.ready()
  }, [])
  
  
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<ProductList/>}/>
        <Route path={'form'} element={<Form/>}/>
      </Routes>
    </div>
  );
}

export default App;
