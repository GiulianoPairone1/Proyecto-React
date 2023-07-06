import React, { useContext } from 'react';
import { Pagination, Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaRegEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import style from './index.module.css';
import ProductCard from '../ProductCard/ProductCard';
import EffectCardProduct from '../EffectCardProduct/EffectCardProduct';
import  useSWR  from 'swr';
import ContentLoader from 'react-content-loader';
import { AuthContext } from '../../context/Auth';
const fetchProducts = async (url, limit) => {
  const response = await fetch(url, { params: { limit } });
  const data = await response.json();
  return data;
};

const Products = () => {
  const { modoOscuro } = useContext(AuthContext);
  console.log(modoOscuro);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;


  const { data: products, error } = useSWR(`${backendUrl}/api/product?limit=9`, fetchProducts);


  if (error) {
    return <div>Error al cargar los productos.</div>;
  }

  if (!products) {
    return (
      <div className={style.containerPeinadosDark + (modoOscuro ? ' ' + style.containerPeinadosDark : '')}>
        <h1 className={style.title}>PRODUCTOS</h1>
        <div className={style.containerProduct}>
          <EffectCardProduct />
          <div className={style.ContainertextProduct}>
            <p className={style.textProduct}>
              Bienvenidos a la sección de productos de barbería, donde encontrarás una amplia gama de artículos para el cuidado de la barba, el cabello y el afeitado. Nuestra selección incluye productos de alta calidad y herramientas profesionales para ayudarte a lograr un estilo impecable. Explora nuestra variedad y descubre cómo nuestros productos pueden mejorar tu rutina de cuidado personal.
            </p>
            <Link className={style.icontextProduct} to="/products">
              Ver Productos <FaRegEye />
            </Link>
          </div>
        </div>
        <div className={style.mySwiper}>
          {/* Placeholder para el slider de productos */}
          <div className={style.placeholderSlider}>
          <ContentLoader 
    speed={1}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#dfdddd"
    foregroundColor="#ffffff"
    
  >
    <rect x="3" y="435" rx="2" ry="2" width="188" height="22" /> 
    <rect x="-2" y="22" rx="2" ry="2" width="399" height="24" /> 
    <rect x="-1" y="49" rx="2" ry="2" width="400" height="384" /> 
    <rect x="197" y="435" rx="0" ry="0" width="201" height="21" />
  </ContentLoader>
  <ContentLoader 
    speed={1}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#dfdddd"
    foregroundColor="#ffffff"
    
  >
    <rect x="3" y="435" rx="2" ry="2" width="188" height="22" /> 
    <rect x="-2" y="22" rx="2" ry="2" width="399" height="24" /> 
    <rect x="-1" y="49" rx="2" ry="2" width="400" height="384" /> 
    <rect x="197" y="435" rx="0" ry="0" width="201" height="21" />
  </ContentLoader>
  <ContentLoader 
    speed={1}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#dfdddd"
    foregroundColor="#ffffff"
    
  >
    <rect x="3" y="435" rx="2" ry="2" width="188" height="22" /> 
    <rect x="-2" y="22" rx="2" ry="2" width="399" height="24" /> 
    <rect x="-1" y="49" rx="2" ry="2" width="400" height="384" /> 
    <rect x="197" y="435" rx="0" ry="0" width="201" height="21" />
  </ContentLoader>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.containerPeinados + (!modoOscuro ? ' ' + style.containerPeinadosDark : '')}>
      <h1 className={style.title}>PRODUCTOS</h1>
      <div className={style.containerProduct}>
        <EffectCardProduct />
        <div className={style.ContainertextProduct}>
          <p className={style.textProduct}>
            Bienvenidos a la sección de productos de barbería, donde encontrarás una amplia gama de artículos para el cuidado de la barba, el cabello y el afeitado. Nuestra selección incluye productos de alta calidad y herramientas profesionales para ayudarte a lograr un estilo impecable. Explora nuestra variedad y descubre cómo nuestros productos pueden mejorar tu rutina de cuidado personal.
          </p>
          <Link className={style.icontextProduct} to="/products">
            Ver Productos <FaRegEye />
          </Link>
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={170}
        centeredSlides={true}
        className={style.mySwiper}
        modules={[Autoplay, Pagination, Navigation]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
      >
        {products.reduce((acc, product, index) => {
          if (index % 3 === 0) {
            acc.push([]);
          }
          acc[acc.length - 1].push(product);
          return acc;
        }, []).map((group, index) => (
          <SwiperSlide key={index}>
            <div className={style.sliderGroup}>
           
              {group.map((product) => (
                <div
                  className={style.productContainer}
                  tabIndex={0}
                  key={product._id}
                >
                  <ProductCard
                  listView={"grid"}
                   
                     product={product}
                  
                  />
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Products;
