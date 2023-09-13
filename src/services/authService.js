// login used in login.js
export async function login(authDetail){
    // send the request
    const requestOptions = {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(authDetail)
    }
    // access detail
    const response = await fetch("http://localhost:8000/login", requestOptions);
    if(!response.ok){
        throw { message: response.statusText, status: response.status };
    }
    const data = await response.json();
    

    // store info in auth token
    if (data.accessToken){
        sessionStorage.setItem("token", JSON.stringify(data.accessToken));
        sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
    }
    return data;
}
// register (used in register.js)
export async function register(authDetail){
    const requestOptions = {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify(authDetail)
    }
    // post request to fetch register information
    const response = await fetch("http://localhost:8000/register", requestOptions);
    
    if(!response.ok){
        throw { message: response.statusText, status: response.status };
    }const data = await response.json();
    
    if (data.accessToken){
      sessionStorage.setItem("token", JSON.stringify(data.accessToken));
      sessionStorage.setItem("cbid", JSON.stringify(data.user.id));
    }
    return data;
}


// logout used in DropdownLoggedIn.js
export function logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("cbid");
}