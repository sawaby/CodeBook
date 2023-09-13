// get product list (used in ProductList.js)
export async function getProductList(searchTerm){
    const response = await fetch(`${process.env.REACT_APP_HOST}/444/products?name_like=${searchTerm ? searchTerm : ""}`);
    if(!response.ok){
        throw new Error({ message: response.statusText, status: response.status });
    }
    const data = await response.json();
    return data;
}


// get individual products (used in ProductDetail.js)
export async function getProduct(id){
    const response = await fetch(`${process.env.REACT_APP_HOST}/444/products/${id}`);
    if(!response.ok){
        throw new Error({ message: response.statusText, status: response.status });
    }
    const data = await response.json();
    return data;
}


// featured products (used in FeaturedProduct.js)
export async function getFeaturedList(){
    const response = await fetch(`${process.env.REACT_APP_HOST}/444/featured_products`);
    if(!response.ok){
        throw new Error({ message: response.statusText, status: response.status });
    }
    const data = await response.json();
    return data;
}