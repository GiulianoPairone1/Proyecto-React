import React, { useContext } from 'react'
import { useCart } from '../../hooks/useCart';
import CartItem from '../Cart/CartItem';
import style from './index.module.css'
import { Scrollbars } from 'react-custom-scrollbars';
import { AuthContext } from '../../context/Auth';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const {cart, clearCart, addToCart,removeToCart, removeFromCart} = useCart();
    const total = cart.reduce((a, b) => a + b.price * b.quantity, 0);
    const {modoOscuro}= useContext(AuthContext) 
    
  return (
    
     <div className={style.cart + (!modoOscuro ? ' ' + style.cartDark : '')}> 
         {cart.length===0
            ? <>
                <h3>VACIO</h3>
            
            </>
            : <>
            <div>
            <Scrollbars style={{ width: 800, height:800 }}>
            <ul className={style.containerItems + (!modoOscuro ? ' ' + style.itemsDark : '')}>
            
            <h2>CARRITO DE COMPRAS</h2>
                    {cart.map(product => (
                        <CartItem key={product._id} removeToCart={() => removeToCart(product)} removeFromCart={() => removeFromCart(product)} addToCart={() => addToCart(product)} {...product} />
                    ))}              
               
            </ul>
            
            </Scrollbars>
            <button onClick={clearCart}>BORRAR  CARRITO </button>
            </div>
            <div className={style.total}>
            <h2>TOTAL DEL CARRITO </h2>
                <p>SUBTOTAL: ${total}</p> 
                <p>ENVIO: $20</p> 
                <p>--------------</p> 

                <p>TOTAL: ${total + 20}</p>

                <div className={style.buttons}>
                <Link to="/BuyForm"><button className={style.but}>IR A PAGAR</button></Link>
                <Link className={style.a} to="/Products"><button className={style.com}>CONTINUAR COMPRANDO</button></Link>
                </div>
                
            </div>
        </>
        }
    </div>
  )
}

export default CartPage