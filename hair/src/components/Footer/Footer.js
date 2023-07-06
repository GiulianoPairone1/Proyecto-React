import React from 'react'
import  style  from './index.module.css';

import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';




const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.horarios}>
        <h3>Horarios de atencion:</h3>
        <ul>Lunes a Viernes de  9:00 a 20:00</ul>
        <ul>Sabados de 10:00 a 20:00</ul>
      </div>

      <div className={style.ubication}>
        <h3>Nos encontramos en Zeballos 1341 Rosario, Santa Fe</h3>
        <ul>Telefono fijo 341499999</ul>
        <ul>WhatsApp 3415399999</ul>

      </div>

      <div className={style.Social}>
        <h3>Seguinos en nueustras redes</h3>
        <div className={style.logos}>

          <FaFacebook className={style.facebook} />
          <FaTwitter className={style.twitter} />
          <FaInstagram className={style.instagram}/>

        </div>

      </div>
    </div>
  )
}

export default Footer 