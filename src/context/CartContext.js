import { createContext, useContext, useReducer } from "react"
import { cartReducer } from "../reducers";

const cartIitialState = {
    cartList : [],
    total: 0
}

// cart context
const CartContext = createContext(cartIitialState);

// cart provider
export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, cartIitialState);

    // add to cart
    function addToCart(product){
       const updatedList = state.cartList.concat(product);
       const updateTotal = state.total + product.price;

        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: updatedList,
                total: updateTotal
            }
        })
    }

    // remove from cart
    function removeFromCart(product){
        const updateList = state.cartList.filter(item => item.id !== product.id);
        const updateTotal = state.total - product.price;
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                products: updateList,
                total: updateTotal
            }
        })
    }

    // clear cart
    function clearCart(){
        dispatch({
            type: "CLEAR_CART",
            payload: {
                products: [],
                total: 0
            }
        })
    }

    const value = {
        cartList : state.cartList,
        total: state.total,
        addToCart,
        removeFromCart,
        clearCart
        
    }
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

// use Cart
export const useCart = () => {
    const context = useContext(CartContext);
    return context;
}