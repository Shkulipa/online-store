import {$authHost, $host} from "./index";

export const sendOrder = async ({auth, mobile, basket}) => {
    if(auth) {
        const {data} = await $authHost({method:'POST', url: 'api/orders', data: {mobile, basket}})
        return data;
    } else {
        const {data} = await $host({method:'POST', url: 'api/orders', data: {mobile, basket}});
        return data;
    }
}

export const fetchOrders = async ({limit, page, complete}) => {
    const {data} = await $authHost.get(`api/orders?limit=${limit}&page=${page}&complete=${complete}`);
    return data;
}

export const fetchChangeStatusOrder = async ({complete, id}) => {
    const {data} = await $authHost.put('api/orders', {complete, id});
    return data;
}

export const fetchDeleteOrder = async ({id}) => {
    const {data} = await $authHost({method:'DELETE', url: 'api/orders', data: {id}});
    return data;
}

export const getOneOrderDevices = async (id) => {
    const {data} = await $authHost.get('api/orders/' + id);
    return data;
}

