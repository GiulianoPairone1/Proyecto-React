import { CartContext } from "../context/cart";

import React, { useContext } from 'react'

export const useCart = () => {
    const context = useContext(CartContext)

    if(context === undefined){
        throw new Error("usecart solo se puede usar en CartProvider")
    }
  return context
}

 