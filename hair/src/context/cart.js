import { createContext, useReducer, useState } from "react";
import { CartInitialState, cartReducer } from "../reducer/cart";

// se crea el contexto
export const CartContext = createContext()

function useCartReducer (){
    const [state, dispatch] = useReducer(cartReducer, CartInitialState)
        
    const addToCart = product => dispatch({
       type: 'ADD_TO_CART',
       payload: product
       
    })
    const removeToCart = product => dispatch({
        type: 'REMOVE_TO_CART',
        payload: product
        
     })
    const clearCart = () => dispatch({
        type: 'CLEAR_CART'
    })
    const removeFromCart = product => dispatch({
        type: 'REMOVE_FROM_CART',  
        payload: product
    })
    return {state,addToCart,removeToCart,clearCart,removeFromCart}
}

export function CartProvider({ children }){
    
    const { state, addToCart,removeToCart,removeFromCart,clearCart} = useCartReducer()
    
    return (
        <CartContext.Provider value={{ 
            cart: state,
            addToCart,
            removeToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    )

}