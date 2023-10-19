import React from 'react'
import { useState  } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Cart from '../Pages/Cart'
import Swal from 'sweetalert2'
import 'flowbite';
import Order from '../Pages/Order'
import Products from '../../public/products.json'

export default function Test({getCart , addCart ,handleStateChange  }) {
  const items = getCart()
  const navigate = useNavigate()
  const urlParams = new URL(window.location.href).searchParams;
  const productID = urlParams.get('id');
  const pushToCart = (id, name, img, price) =>{
    addCart(id, name, img, price)
    handleStateChange ()
    Swal.fire({
      title: name + " added to cart!",
      icon: 'success',
      showDenyButton: true,
      confirmButtonText: 'Contiue Shopping',
      denyButtonText: 'Checkout',
    }).then((result) => {
      if (result.isConfirmed) {
      } else if (result.isDenied) {
        // window.location.href = "/checkout";
        navigate("/checkout")
      }
    })  
  }

  const [produit , setProduit] = useState(Products[productID])
  return (
    <div>
        <br />
        <br />
    {produit ? (
      <div className='productDetails'>
        <center><div className='productImg'>
        <img  className='image' src={produit.productImg} alt="" />
      </div></center>
      <div className='prod-details'>
        <h2 className='prod-name'>{produit.productTitle}</h2>
        <p className='price'>{produit.productPrice} TND</p>
        {produit.inStock ? (
          <p style={{color :"green" , fontWeight :"bold"}}>In Stock </p>
        ): (<p style={{color :"red" , fontWeight : "bold"}}>Sold Out</p>)}
        <h3>Product Details : </h3>
        <p className='prod-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, quam fuga. Suscipit adipisci placeat atque excepturi blanditiis esse ut pariatur tempora corrupti veritatis ea rerum, officiis, magni possimus, odio dignissimos.</p>
        <div className='final-part'>
        <button className='cart-add cart' onClick={()=>pushToCart(produit.id , produit.productTitle , produit.productImg ,produit.productPrice)}>Add To Cart</button>
        </div>
      </div>
    </div>) 
        :(<p style={{textAlign :"center" , fontSize : 40}}>Product not found</p>)}
    <br />
    <br />
    </div>
  )
}
