import React, { useContext }  from 'react'
import style from './index.module.css';

import "swiper/css";

import "swiper/css/pagination";




import SlideBarber from '../SlideBarber/SlideBarber';
import Products from './Products';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/Auth';


const Main = () => {
  const {modoOscuro}= useContext(AuthContext) 

  return (
    
    <motion.div 
    initial={{opacity:0}}
    animate={{
      opacity:1,
        transition:{
            dutaion:1
        },
    }}
    exit={{opacity:0}}
    
    className={style.main + (!modoOscuro ? ' ' + style.mainDark : '')}>
      
       <Products />
      <SlideBarber />
     

      {/* <div className={style.containerTurno}>

        <p>PEDI TU TURNO</p>

      </div> */}

    </motion.div>
  )
}

export default Main