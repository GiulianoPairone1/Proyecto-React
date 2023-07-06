import React from 'react'
import style from './index.module.css';



const NotFoundPage = () => {
  return (
    <div className={style.NotFound}>
    <img src='https://static.guiainfantil.com/pictures/3802-3-dibujo-para-imprimir-de-una-cara-triste.jpg' alt=''/>
    <h3 className={style.title} >404 Page Not Found</h3>
    <p>The requested page could not be found.</p>
  </div>

);
};

export default NotFoundPage