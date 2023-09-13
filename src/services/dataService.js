
function getSession(){
    // get user information, token and id   
    const token = JSON.parse(sessionStorage.getItem("token"));
    const cbid = JSON.parse(sessionStorage.getItem("cbid"));
    return {token, cbid}
}

// get user (used in checkout.js, dropdownloggedin.js)

export async function getUser(){
    const browserData = getSession();

    // send the request to API to get uesr information
    const requestOptions = {
        method: "GET",
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`}
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/600/users/${browserData.cbid}`, requestOptions);
    if(!response.ok){
        throw new Error({ message: response.statusText, status: response.status });
    }
    const data = await response.json();
    return data;
}

// get user order history (used in dashboard.js)
export async function getUserOrders(){
    const browserData = getSession();
    const requestOptions = {
        method: 'GET',
        headers: {"Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`}
    }
    // fetch order information
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders?user.id=${browserData.cbid}`, requestOptions);
    if(!response.ok){
        throw new Error({ message: response.statusText, status: response.status });
    }
    const data = await response.json();
    return data;
}

// create order, this function is used in checkout.js
export async function createOrder(cartList, total, user){
    const browserData = getSession();
    const order = {
        cartList: cartList,
        amount_paid: total,
        quantity: cartList.length,
        user: {
            name: user.name,
            email: user.email,
            id: user.id
        }
    }
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${browserData.token}`},
        body: JSON.stringify(order)
    }
    const response = await fetch(`${process.env.REACT_APP_HOST}/660/orders`, requestOptions);
    if(!response.ok){
        throw new Error({ message: response.statusText, status: response.status });
    }
    const data = await response.json();
    return data;
}

