import React, { useState } from 'react'
import { useCart } from '../../hooks/useCart';
import style from './index.module.css';
import { FaTimes } from 'react-icons/fa';
import { MdAdd, MdRemove } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CartItem = ({_id,images,price,name, quantity, addToCart,removeToCart, removeFromCart}) => {
    const [hovered, setHovered] = useState(false);

    const handleMouseOver = () => {
        setHovered(true);
    };

    const handleMouseOut = () => {
        setHovered(false);
    };
    const images1 = images
  .slice(1, -1) // Eliminar los caracteres de apertura y cierre ({})
  .split(",") // Dividir la cadena en elementos individuales
  .map((image) => image.trim());

  const variants ={
    hidden:{
        opacity:0
    },
    visible:{
        opacity:1,
        transition:{
            dutaion:1
        }
    }
  }
    return (
        
        <motion.li
        initial='hidden'
        animate='visible'
        variants={variants}
        exit='hidden'
        layoutId={_id}
        style={{color: hovered ? ' #FF0000' : ''}} >
            <motion.button
             whileHover={{ scale: 1.1, backgroundColor: 'black'}}
             transition={{ type: "spring", stiffness: 700, damping: 10 }}
            name='buton' className={style.removeFromCart} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} onClick={removeFromCart}><FaTimes/></motion.button>
            <Link to={`/products/${_id}`}>
            <img
             style={{filter: hovered ? 'grayscale(1)' : ''}} src={images1[0]} alt='' />
            </Link>
            <div>
                <strong >{name}</strong>
                <strong >${price * quantity}</strong>  
                 
            </div>
            <footer>
                <small >
                    Qty: {quantity}
                </small>
                <button onClick={addToCart}><MdAdd/></button>
                <button onClick={removeToCart}><MdRemove/></button>

            </footer>
        </motion.li>

    )
}

export default CartItem