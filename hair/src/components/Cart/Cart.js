import React, { useEffect, useId, useState } from 'react'
import style from './index.module.css';

import { FaCartPlus, FaTimes } from 'react-icons/fa';

import CartItem from './CartItem';
import { useCart } from '../../hooks/useCart';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { AnimatePresence, motion } from 'framer-motion';

const Cart = () => {
    const cartCheckId = useId();
    const {cart, clearCart, addToCart,removeToCart, removeFromCart} = useCart();
    const [numberCart, setNumberCart] = useState(cart.length);
    const [total, setTotal] = useState(cart.reduce((a, b) => a + b.price * b.quantity, 0))
    const [chechbox,setCheckbox] = useState(false)

  

      const changeBox = () => {
        setCheckbox(!chechbox)
      }
        useEffect(() => {
          setNumberCart(cart.length);
          setTotal(cart.reduce((a, b) => a + b.price * b.quantity, 0))
        }, [cart]);

    
   
  return (
    <>

        <motion.label
         className={style.label}
          htmlFor={cartCheckId}
          whileHover={{ scale: 1.15 }}
         transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaCartPlus className={style.cartButton} />
            {cart.length > 0 ? ( 
            
             <motion.p
               className={style.numberCart}
               initial={{ scale: 0  }}
               animate={{ scale: 1 }}
               transition={{
                 duration: 0.2,
                 
               }}
               key={numberCart} // Agrega una clave única para que AnimatePresence detecte el cambio
               layoutId='id'
             >
               {numberCart}
             </motion.p>
         
            ): null}
        </motion.label>
        
        <input className={style.input} id={cartCheckId} onClick={changeBox} type='checkbox' hidden/> 
        <AnimatePresence>
        {chechbox ? (
       
        <motion.aside
          animate={{ x: "0%" }}
          initial={{  x: "100%"}}
          exit={{  x: "100%"}}
        
          layoutId={'layout'}
          transition={{ type: "spring", stiffness: 500, damping: 100 }}
          className={style.cart}
        >
            <h3>CARRITO</h3>
        <motion.label 
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className={style.cartClose} 
        htmlFor={cartCheckId}>
            <FaTimes/>
        </motion.label>
            {cart.length===0
            ? <>
                <h3>VACIO</h3>
            
            </>
            : <>
            <Scrollbars style={{ width: 300, height:'80%', marginBottom:'50px' }}>
                
            <ul className={style.containerItems}>
                <AnimatePresence>
                {cart.map(product => (
                   
                    <CartItem key={product._id} removeToCart={() => removeToCart(product)} removeFromCart={() => removeFromCart(product)} addToCart={() => addToCart(product)} {...product} />
                ))}
                </AnimatePresence>
            
            
            </ul>
            </Scrollbars>
            <div className={style.total}>
                <p>Total: ${total}</p>
                <button onClick={clearCart}>Clear</button>
                <button><Link to="/cart">
                VER CARRITO
                </Link></button>

            </div>
            </>
            
            }
            
        </motion.aside>
        
       
        ): null}
        </AnimatePresence>
    </>
  )
}

export default Cart