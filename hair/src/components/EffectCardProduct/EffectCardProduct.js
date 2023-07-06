import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper";

import style from './index.module.css';

const EffectCardProduct = () => {
  return (
    <Swiper
    effect={"cards"}
    grabCursor={true}
  
    modules={[EffectCards]}
    className="user__swiper"
    style={{
      backgroundSize: "cover",
      backgroundPosition: "center",
      maxWidth: "180px",
      height: "240px", // Ajustamos la altura para que se ajuste al contenido
      marginTop: "1rem",
      overflow: "visible", // Permitimos que el contenido se muestre fuera del contenedor
      position: "relative",
    }}
    
    >
      <SwiperSlide className={style.swiperSlide} style={{ backgroundPosition: "center",backgroundSize: "cover", backgroundImage: "url('https://www.barbershop.com.ar/product_images/l/674/2056__68568_zoom.jpg')" }}>
       
      </SwiperSlide>
      <SwiperSlide className={style.swiperSlide} style={{ backgroundPosition: "center",backgroundSize: "cover", backgroundImage: "url('https://images-ext-2.discordapp.net/external/_IeQK5Q5GAC6fsSlG5SXHdD8mDhVcN4Ebp8f6tKTIfU/https/www.barbershop.com.ar/product_images/u/764/15357__31275_zoom.jpg?width=589&height=589')" }}>
        
      </SwiperSlide>
      <SwiperSlide className={style.swiperSlide} style={{ backgroundPosition: "center",backgroundSize: "cover", backgroundImage: "url('https://www.barbershop.com.ar/product_images/u/975/515789__68760_zoom.jpg')" }}>
        
      </SwiperSlide>
      <SwiperSlide className={style.swiperSlide} style={{ backgroundPosition: "center",backgroundSize: "cover", backgroundImage: "url('https://www.barbershop.com.ar/product_images/d/065/534492__97769_zoom.jpg')" }}>
        
      </SwiperSlide>
      <SwiperSlide className={style.swiperSlide} style={{ backgroundPosition: "center",backgroundSize: "cover", backgroundImage: "url('https://www.barbershop.com.ar/product_images/z/391/5608__02909_zoom.jpg')" }}>
        
      </SwiperSlide>
    </Swiper>
  );
};

export default EffectCardProduct;