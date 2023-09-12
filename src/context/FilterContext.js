
import { createContext, useContext, useReducer } from "react";
import { FilterReducer } from "../reducers";

const filterInitialState = {
    productList: [],
    onlyInStock: false,
    bestSellerOnly: false,
    sortBy: null,
    ratings: null
}

const FilterContext = createContext(filterInitialState);

// provider provides all the functions
export const FilterProvider = ({children}) => {

    const [state, dispatch] = useReducer(FilterReducer, filterInitialState);

    // initialize productList
    function initialProductList(products){
        dispatch({
            type: "PRODUCT_LIST",
            payload: {
                products: products
            }
        });
    }

    // returns best seller
    function bestSeller(products){
        // if filter applied return products that are best seller otherwise return the original list
        return state.bestSellerOnly ? products.filter(product => product.best_seller === true) : products;
    }

    // instock
    function inStock(products){
        // if filter applied return products that are in stock otherwise return the original list
        return state.onlyInStock ? products.filter(product => product.in_stock === true) : products;
    }

    // sort 
    function sort(products){
        // sort by low to high
        if(state.sortBy === "lowtohigh"){
            return products.sort((a, b) => Number(a.price) - Number(b.price));
        }

        // sort by high to low
        if(state.sortBy === "hightolow"){
            return products.sort((a, b) => Number(b.price) - Number(a.price));
        }  
        
        // return productlist as it is if filter is not applied
        return products;
    }


    // rating 
    function rating(products){
        if(state.ratings === "4STARABOVE"){
            return products.filter(product => product.rating >= 4);
        }

        if(state.ratings === "3STARABOVE"){
            return products.filter(product => product.rating >= 3);
        }

        if(state.ratings === "2STARABOVE"){
            return products.filter(product => product.rating >= 2);
        }

        if(state.ratings === "1STARABOVE"){
            return products.filter(product => product.rating >= 1);
        }

         // return productlist as it is if filter is not applied
         return products;

    }

    // finding the middle point for all filters by applying all filter functions
    const filteredProductList = rating(sort(inStock(bestSeller(state.productList))));



    const value = {
        state,
        dispatch,
        products: filteredProductList, 
        initialProductList
    }
    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => {
    const context = useContext(FilterContext);
    return context;
}