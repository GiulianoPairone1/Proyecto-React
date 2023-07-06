
import style from './index.module.css';
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

// import required modules
import { Pagination, Autoplay, Navigation, EffectFade } from "swiper";


const SlideBarber = () => {
    return (
        <div className={style.containerSlide}>
            <Swiper



                modules={[Autoplay, EffectFade]}

                autoplay={{
                    delay: 5000
                }}
                effect={"fade"}
                speed={2000}


            >

                <SwiperSlide className={style.SwiperSlide}>
                    <div className={style.swiperBarber + ' ' + style.swiper1}>
                        <div className={style.container1 + ' ' + style.containerText}>

                            <h2 className={style.title}>Cortes de pelo de calidad y estilos impecables</h2>
                            <p className={style.textSlide}>Descubre la excelencia en cortes de pelo y estilos impecables  en NavajaFina. Confía en nuestro equipo de barberos expertos para lucir tu mejor versión en cada visita.</p>

                        </div>
                    </div>

                </SwiperSlide>
                <SwiperSlide className={style.SwiperSlide}>
                    <div className={style.swiperBarber + ' ' + style.swiper2}>

                        <div className={style.container1 + ' ' + style.containerText}>
                            <h2 className={style.title}>Relájate y renueva tu estilo</h2>
                            <p className={style.textSlide}>Disfruta de una experiencia de cuidado personal excepcional en NavajaFina. Relájate en nuestro ambiente acogedor mientras nuestros talentosos barberos te miman con servicios de calidad.</p>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={style.SwiperSlide}>
                    <div className={style.swiperBarber + ' ' + style.swiper3}>

                        <div className={style.container3 + ' ' + style.containerText}>

                            <h2 className={style.title}>Estilo y confianza para hombres con actitud</h2>
                            <p className={style.textSlide}>NavajaFina es el lugar perfecto para hombres con estilo. Descubre tendencias, cortes de pelo y cuidado de la barba personalizados que resaltan tu personalidad y te hacen sentir seguro y elegante.</p>
                            <div className="follow-us">
                                <h2 className={style.title}>Síguenos en nuestras redes sociales</h2>
                                <p className={style.textSlide}>Síguenos en Facebook (@navajafinabarbershop), Instagram (@navajafinabarbershop) y Twitter (@navajafinabarber) para estar al tanto de nuestras últimas promociones, tendencias en cortes de pelo y mucho más. ¡Únete a nuestra comunidad en línea y sé parte de NavajaFina!</p>
                                <div className={style.social}>
                                    <a className={style.socialItem+ '' + style.facebook} href="https://www.facebook.com/navajafinabarbershop" target="_blank" rel="noopener noreferrer">
                                        <FaFacebook className={style.facebook}/>
                                       
                                    </a>
                                    <a className={style.socialItem+ '' + style.instagram} href="https://www.instagram.com/navajafinabarbershop" target="_blank" rel="noopener noreferrer">
                                        <FaInstagram className={style.instagram} />
                                       
                                    </a>
                                    <a className={style.socialItem + '' + style.twitter} href="https://www.twitter.com/navajafinabarber" target="_blank" rel="noopener noreferrer">
                                        <FaTwitter className={style.twitter} />
                                      
                                    </a>
                                </div>

                            </div>
                        </div>

                    </div>
                </SwiperSlide>

            </Swiper>

        </div>
    )
}

export default SlideBarber