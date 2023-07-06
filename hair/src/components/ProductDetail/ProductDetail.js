import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './index.module.css';
import { SlideshowLightbox } from 'lightbox.js-react';
import 'lightbox.js-react/dist/index.css';
import { FaCartPlus } from 'react-icons/fa';
import BtnCart from '../ProductCard/BtnCart';
import { motion } from 'framer-motion';
import axios from 'axios';

const ProductDetail = ({ products }) => {

  
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [lightboxKey, setLightboxKey] = useState(0); // Agregar clave única para el componente SlideshowLightbox
// console.log(products)

useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/product/${id}`);
      setProduct(response.data);
      setSelectedImage('');
      setLightboxKey((prevKey) => prevKey + 1); // Actualizar la clave del componente SlideshowLightbox
    } catch (error) {
      console.error(error);
    }
  };

  fetchProduct();
}, [id]);
  if (!product) {
    return <div className={style.main}>Producto no encontrado</div>;
  }

  const { name, price, description } = product;

  const openLightbox = (image) => {
    setSelectedImage(image);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const images = product.images
  .slice(1, -1) // Eliminar los caracteres de apertura y cierre ({})
  .split(",") // Dividir la cadena en elementos individuales
  .map((image) => image.trim());

  return (
    <motion.div
    animate={{ x: "0%" }}
    initial={{  x: "100%" }}
 
    className={style.main}>
      <div className={style.ProductDetail}>
        <div className={style.imagesContainer}>
          <SlideshowLightbox key={lightboxKey} className={style.containerimages}>
            {images.map((image, index) => (
              <img
                key={index}
                className={style.images}
                src={image}
                alt={name}
                onClick={() => openLightbox(image)}
              />
            ))}
          </SlideshowLightbox>
        </div>
        <div className={style.detailsContainer}>
          <h2 className={style.name}>{name}</h2>
          <p className={style.price}>Precio: ${price}</p>
          <p className={style.description}>{description}</p>
          <BtnCart product={product} />
        </div>
      </div>

      {lightboxOpen && (
        <div className={style.lightboxContainer} onClick={closeLightbox}>
          <div className={style.lightboxContent}>
            <img src={selectedImage} alt={name} />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductDetail;