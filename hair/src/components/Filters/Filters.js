import React, { useContext } from 'react';
import style from './index.module.css';
import { MdDelete } from 'react-icons/md';
import { FaTimes } from 'react-icons/fa';
import FiltersItems from './FiltersItems';
import { FilterContext } from '../../context/filters';

import { AuthContext } from '../../context/Auth';
const Filters = () => {
  const {
    filter,
    setFilter,
    minPrice,
    setMinPrice,
    priceId,
    setPriceId,
    category,
    setCategory,
  } = useContext(FilterContext);

  const handlePriceChange = (event) => {
    setMinPrice(event.target.value);
    setFilter((prevFilter) => ({
      ...prevFilter,
      price: event.target.value,
    }));
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setFilter((prevFilter) => ({
      ...prevFilter,
      category: event.target.value,
    }));
  };

  const handlerPriceClear = () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      price: 0,
    }));
    setMinPrice(0);
    document.getElementById(priceId).value = '0';
  };

  const handlerCategoryClear = () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      category: 'all',
    }));
    setCategory('all');
    document.getElementById('category').value = 'all';
  };

  const deleteFilters = (event) => {
    handlerPriceClear();
    handlerCategoryClear();
  };
  const {modoOscuro}= useContext(AuthContext) 
  return (
    <main className={style.main + (!modoOscuro ? ' ' + style.mainDark : '')}>
      <div className={style.ContainerFilters}>
        <h2>FILTROS</h2>
        <div className={style.container}>
          <label htmlFor='price'>Precio Mínimo:</label>
          <div className={style.filtersItem}>
            <input
              type='range'
              id={priceId}
              min='0'
              max='1000'
              onChange={handlePriceChange}
            />
            <span>${minPrice}</span>
          </div>
        </div>
        <div className={style.container}>
          <label htmlFor='category'>Categoria:</label>
          <div className={style.filtersItem}>
            <select id='category' onChange={handleCategoryChange}>
              <option value='all'>Todas</option>
              <option value='Tools'>Herraminetas</option>
              <option value='Scissors_Knives'>Tijeras & Navajas</option>
              <option value='Machines'>Maquinas</option>
              <option value='Hair_Care'>Cuidado del Cabello</option>
            </select>
          </div>
        </div>
        <div onClick={deleteFilters} className={style.delete}>
          <MdDelete />
        </div>
      </div>
      {/* <FiltersItems
        handlerPriceClear={handlerPriceClear}
        handlerCategoryClear={handlerCategoryClear}
        
      /> */}
    </main>
  );
};

export default Filters;