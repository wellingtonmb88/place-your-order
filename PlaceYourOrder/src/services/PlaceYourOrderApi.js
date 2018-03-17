
const api = "http://api-vanhack-event-sp.azurewebsites.net";


export const authCustomer = (email, password) =>
    fetch(`${api}/api/v1/Customer/auth?email=${email}&password=${password}`,
        {
            method: 'post',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(data => {
            return data._bodyInit;
        });


export const getProductList = (token) =>
    fetch(`${api}/api/v1/Product`,
        {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
            Authorization: token
        })
        .then(data => {
            return data._bodyInit;
        });