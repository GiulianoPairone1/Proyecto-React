
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import style from './index.module.css';
import "swiper/css";
import "swiper/css/navigation";

import { FaInfo, FaRegEye } from 'react-icons/fa';

import 'react-lazy-load-image-component/src/effects/blur.css'
import BtnCart from './BtnCart';
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AnimatePresence, motion } from 'framer-motion';


const ProductCard = ({product, setListView, listView}) => {

  const [descriptionOn, setDescriptionOn] = useState(false)
  const images = product.images
    .slice(1, -1) // Eliminar los caracteres de apertura y cierre ({})
    .split(",") // Dividir la cadena en elementos individuales
    .map((image) => image.trim());

  const handlerDescription = () => {
    setDescriptionOn(!descriptionOn);
  }
  
  return (
    <div className={listView === 'grid' ? style.containerProduct : style.containerProductList}>
      <p className={style.textProduct + ' ' + style.unselectable}>{product.name}</p>

      <Swiper cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]} className={style.mySwiper}>
        {images.map((imagesrc, index) => (

          <SwiperSlide className={style.swiperSlide} key={index}> <LazyLoadImage src={imagesrc} width={330} height={330} placeholderSrc={imagesrc} effect="blur" className={style.slideBackground} /> </SwiperSlide>
        ))}
      </Swiper>
      <AnimatePresence>
        {descriptionOn ? (

          <motion.section
            animate={{ y: "0px", height: "150px", opacity: 1 }}
            initial={{ y: "150px", height: "0", opacity: 0 }}
            exit={{ y: "150px", height: "0px", opacity: 0 }}
            transition={{ duration: .5 }}
            className={style.containerDescription}>
            <p style={{"color":"#fff"}}>{product.description}</p>
          </motion.section>


        ) : null
        }
      </AnimatePresence>

      <p className={style.textProduct} >${product.price}
        <motion.button
          whileHover={{ scale: 1.15 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={handlerDescription} className={style.info}><FaInfo />
        </motion.button>
      </p>
      <div className={style.ContainertextProduct}>


        <Link className={style.icontextProduct} to={`/products/${product._id}`}>
          Ver Producto <FaRegEye />
        </Link>

        <BtnCart product={product} />

      </div>



    </div>
  )
}

export default React.memo(ProductCard)
