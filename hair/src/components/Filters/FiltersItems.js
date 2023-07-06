import React, { useContext } from 'react';
import style from './index.module.css';
import { FaTimes } from 'react-icons/fa';
import { FilterContext } from '../../context/filters';




const FiltersItems = (handlerPriceClear, handlerCategoryClear ) => {
    const { filter} = useContext(FilterContext);
    return (
    <div className={style.filterItems}>
      {filter.price > 0 ? (
        <p style={{ display: 'flex' }}>
          <FaTimes onClick={handlerPriceClear} className={style.cartClose} />
          Precio Mínimo: {filter.price}$
        </p>
      ) : null}
      {filter.category !== 'all' ? (
        <p style={{ display: 'flex' }}>
          <FaTimes onClick={handlerCategoryClear} className={style.cartClose} />
          Categoria: {filter.category}
        </p>
      ) : null}
    </div>
  );
};

export default FiltersItems;
