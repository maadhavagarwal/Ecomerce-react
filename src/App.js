//import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Poduct';
import Cart from './Pages/Cart';
import Shop from './Pages/Shop';
import men_banner from './components/Assets/banner_mens.png'
import Wommen_banner from './components/Assets/banner_women.png'
import Kids_banner from './components/Assets/banner_kids.png'
import Login from './Pages/login';
import Profile from './Pages/Profile';
import { ShopContext } from './context/shopcontent';
import { Container } from 'react-bootstrap';
//import ProductDisplay from './components/ProductDisplay/productdisplay';


function App() {
  return (
    <>    <BrowserRouter>  
      
          <Navbar/>
          <main><Container></Container></main>
          <Routes>
            <Route path='/' element={<Shop/>}/>
            
            <Route path='/Mens' element={<ShopCategory  category="men" className="Banner"/>}/>
            <Route path='/Womens' element={<ShopCategory category="women"className="Banner"/>}/>
            <Route path='/Kids' element={<ShopCategory  category="kid"className="Banner"/>}/>
            
            <Route path='/product' element={<Product/>}/>
            <Route path='/product/:productId' element={<Product/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/profile' element={<Profile/>}/>
           
           
           
           

          
          
          
          </Routes>

      </BrowserRouter>
      </>
    );
}

export default App;
