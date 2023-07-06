import { createContext, useId, useReducer, useState } from "react";


// se crea el contexto
export const FilterContext = createContext()


export const FIlterProvider = ({ children }) => {
    const [filter, setFilter] = useState({price:0, category:'all'});
    const [minPrice, setMinPrice] = useState(0);
    const [priceId, setPriceId] = useState(useId());
    const [category, setCategory] = useState('all');
  
    return (
      <FilterContext.Provider
        value={{ filter, setFilter, minPrice, setMinPrice, priceId, setPriceId, category, setCategory }}
      >
        {children}
      </FilterContext.Provider>
    );
  };