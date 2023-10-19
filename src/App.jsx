import React, { useState , useEffect } from 'react'
import Navbar from './Pages/Navbar'
import Hero from './Pages/Hero'
import Category from './Pages/Category'
import Cart from './Pages/Cart'
import Footer from './Pages/Footer'
import Feedback from './Pages/Feedback'
import Contact from './Pages/Contact'
import CategoryPage from './ProductsPages/CategoryPage'
import { Route , Routes } from 'react-router-dom'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import Products from '../public/products.json'
import ProductPage from './ProductsPages/ProductPage'
import Order from './Pages/Order'
import Header from './Pages/Header'

export default function App() {
  const  [quantity , setQuantity] = useState(
    localStorage.getItem("quantity") || 0 ,
  )
  useEffect(() => {
    localStorage.setItem('quantity', quantity);
  }, [quantity]);
  const handleStateChange = () => {
    setQuantity(parseInt(quantity)+ 1);
  };
  const clearQuantity= ()=>{
    setQuantity(0)
  }
  function getCart() {
    const localCart = localStorage.getItem("cart");
    if (localCart == null) {
        localStorage.setItem("cart", "[]");
        return []; 
    }
    return JSON.parse(localCart);
} 
const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

const removeFromCart = (itemId) => {
  const updatedCart = cart.filter(item => item.id !== itemId);
  setCart(updatedCart);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};
  
  function addCart(id, name, img, price) {
      let localCart = getCart();
      localCart.push({"id": id, "name": name, "img": img, "price": price}); 
      localStorage.setItem("cart", JSON.stringify(localCart));
}

  return (
    <div>
      <div className='section-container'>
      <Header quantity={quantity} setQuantity={setQuantity}></Header>
      </div>
      <Routes>
        <Route path='/cart' element={<Cart getCart={getCart} addCart={addCart}  quantity={quantity} setQuantity={setQuantity} clearQuantity={clearQuantity} removeFromCart={removeFromCart}  />}></Route>
        <Route path='/product' element={<ProductPage  getCart={getCart} addCart={addCart } handleStateChange={handleStateChange}/>}></Route>
        <Route path='/category' element={<CategoryPage   getCart={getCart} addCart={addCart} quantity={quantity} setQuantity={setQuantity}/>} ></Route>
        <Route path='/' element={<Hero/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/checkout' element={<Order clearQuantity={clearQuantity} quantity={quantity} setQuantity={setQuantity}  removeFromCart={removeFromCart} />}></Route>
      </Routes>
      <div id='footer'>
      <Footer></Footer>
      </div>
    </div>
  )
}
