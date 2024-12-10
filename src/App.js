import { useEffect } from 'react'
import './App.css';

function App() {
  	const tg = window.Telegram.WebApp;
  
  useEffect(() => {
    tg.ready()
  }, [])
  
 
  
  return (
    <div className="App">
      work
      
    </div>
  );
}

export default App;
