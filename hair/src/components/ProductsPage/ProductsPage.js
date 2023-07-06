import React, { useContext, useEffect, useId, useState } from 'react'
import  style  from './index.module.css';
import ProductCard from '../ProductCard/ProductCard';

import Scrollbars from 'react-custom-scrollbars';
import { motion } from 'framer-motion';
import { FaList, FaTh, FaTimes } from 'react-icons/fa';
import Filters from '../Filters/Filters';
import { FilterContext } from '../../context/filters';
import axios from 'axios';
import { AuthContext } from '../../context/Auth';
const ProductsPage = () => {
  const [listView, setListView] = useState("grid")
  const [products, setProducts] = useState([]);
  const {modoOscuro}= useContext(AuthContext) 
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 767) {
  
        setListView("grid");
      }
    }

    window.addEventListener("resize", handleResize);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, ["resize"]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async (limit) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product`, {
        params: { limit: limit }
      });
  
      const productData = response.data;
      const productsArray = productData;
      setProducts(productsArray);
    } catch (error) {
      console.error(error);
    }
  }
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
  const handlerPriceClear = () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      price: 0,
    }));
    setMinPrice(0);
    document.getElementById(priceId).value = '0';
  };

  const handlerViewList = (value) => {
    value === "grid" ? setListView("grid") : setListView("list")
  }
  const handlerCategoryClear = () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      category: 'all',
    }));
    setCategory('all');
    document.getElementById('category').value = 'all';
  };
  

  const filterProducts = () => {

    return products.filter(product => {
      return ( 
        product.price >= filter.price &&
        (
          filter.category === 'all' ||
          product.category === filter.category
        )
      )
    })
  }
  
  const filteredProducts = filterProducts(products)
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
    className={style.container}>
    <h1 >PAGINA DE PRODUCTOS</h1>
    
    <div className={style.main}>
      
    < Filters  />
        <div className={style.containerFilterProduct + (!modoOscuro ? ' ' + style.mainDark : '')}>
          
          <div className={style.filterItems}>
          {filter.price > 0 ? ( 
            <p style={{display:'flex'}}><FaTimes onClick={handlerPriceClear} className={style.cartClose} />Precio Mínimo: {filter.price}$ </p>
            ): null }
          {filter.category !== 'all' ? ( 
            <p style={{display:'flex'}}> <FaTimes onClick={handlerCategoryClear}  className={style.cartClose}/>Categoria: {filter.category}</p>
            ): null }
              <div className={style.ContainerlistProduct}>
              
                    <FaList onClick={() => handlerViewList("list")} className={listView === "list" ? style.activeList : ""}/>
                    <FaTh onClick={() => handlerViewList("grid")} className={listView === "grid" ? style.activeList : ""}/>
            
              
              </div>
           
            </div>
            
          <div>
            
          </div>
          <Scrollbars style={{ height:'100vh' }}>
          
              <div className={(listView === 'grid' ? style.sliderGroup : style.sliderGroupList) + (!modoOscuro ? ' ' + style.mainDark : '')}>
                  {filteredProducts.length > 0 ? (

                  
                  filteredProducts.map((product) => (
                
                      <div
                          className={style.productContainer}

                          tabIndex={0}
                          key={product._id + product.name}
                      >
                          <ProductCard listView={listView} setListView={setListView}  product={product} />
                      </div>
                      
                  ))
                  ):(  
                    <p>No hay productos disponibles</p>
                  )}

          </div>
         </Scrollbars>
        </div>

    </div>
    </motion.div>
  )
}

export default ProductsPage