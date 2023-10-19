import React, { useState } from 'react'
import { Link, useActionData } from 'react-router-dom';
import 'flowbite';

export default function Cart({quantity , setQuantity ,clearQuantity , removeFromCart}) {
  function getCart() {
    const localCart = localStorage.getItem("cart");
    if (localCart == null) {
        localStorage.setItem("cart", "[]");
        return []; 
    }
    return JSON.parse(localCart);
}

function formatCart(cartItems) {
  let totalPrice = 0;
  const itemQuantities = {};
  for (const item of cartItems) {
    totalPrice += parseInt(item.price);
    if (item.name in itemQuantities) {
      itemQuantities[item.name]++;
    } else {
      itemQuantities[item.name] = 1;
    }
  }
  let cartText = "Products :\n";
  for (const itemName in itemQuantities) {
    cartText += `x${itemQuantities[itemName]} ${itemName}\n`;
  }
  const formattedText = `${totalPrice}.00 TND`;
  return formattedText;
}
const [cart1, setCart1] = useState(
  JSON.parse(localStorage.getItem('cart')) || []
);
const clearCart = () => {
  setCart1([]);
  setQuantity(0)
  localStorage.removeItem('cart');
};
const cart= ()=>{
  setQuantity(parseInt(quantity)+ 1)
}
const removeitems= (x)=>{
  removeFromCart(x.id)
  setQuantity(parseInt(quantity)-1)
}
  const items = getCart()
  const total = formatCart(getCart())
  return (
    <div>
      <br />
      {items != "" ? (
        <>
        <h2 style={{textAlign :"center" , marginTop :20 , fontSize : 35}}>Shopping Cart : </h2> 
        <center><div className='titles'>
          <p>Product</p>
          <p>Total</p>
        </div> </center>
        </>
      ):null}  
      {items!=""? items.map((e)=>(  
        <center><div style={{width : "94%" }} >
          <div className='container'>  
            <div className='cart-info'>
              <div className='img'>
                <img src={e.img} alt="" />
              </div>
              <div className='details'>
                <p style={{fontWeight :"bold"}}>{e.name}</p>
                <p>{e.price}.00 TND</p>
              </div>
            </div>
              <div className='total-price'>
                <p>{e.price}.00 TND</p>
            </div>
            <div>
                  <button className='proceed-checkout' onClick={()=>removeitems(e.id)}>Remove</button>
            </div>
        </div> 
      </div></center>
      )):(
        <div className='cart-empty'>
        <h2 style={{textAlign :"center" , marginTop :20 , fontSize : 50}}>Your Cart is empty</h2>
        <Link to="/" style={{textDecoration :"none" , color :"black"}}><button className='continue'>Contine Shopping</button></Link>
        </div>
      )}
        {items !="" ? (
         <div className='clear'>
          <button className='clear-prod' onClick={clearCart}>Clear All</button>
         </div>
      ) : null}
      {items !="" ? (
         <div className='total'>
         <p>Estimated total :  {total}</p>
       <Link to="/checkout" style={{textDecoration :"none" , color :"black"}}><center><button className='proceed-checkout'>Proceed To Checkout</button></center></Link>
       </div>
      ) : null}
      <br />
      <br />
      <br />
    </div>
  )
}
