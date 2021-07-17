import {makeAutoObservable} from "mobx";
import {deleteDeviceFromBasket} from "../http/deviceAPI";

export default class BasketStoreStore {
    constructor() {
        this._totalPrice = 0;
        this._basket = [];
        makeAutoObservable(this);
    }

    async setDeleteItemBasket(device, isAuth = false) {
        if(isAuth) {
            await deleteDeviceFromBasket(device.id).then(() => {
                this._basket = this._basket.filter(item => item.id !== device.id);
                this._totalPrice -=  device.price * device.count;
            });
        } else {
            this._basket = this._basket.filter(item => item.id !== device.id);
            this._totalPrice -=  device.price * device.count;

            localStorage.setItem("basket", JSON.stringify(this._basket));
        }
    }

    setBasket(item, isAuth = false) {
        const checkDeviceInBasket = this._basket.findIndex(device => device.id === item.id);
        if(checkDeviceInBasket < 0) {
            this._basket = [...this._basket, { count: 1, ...item}];
            let totalPrice = 0;
            this._basket.forEach(device => totalPrice += Number(device.price * device.count));
            this._totalPrice = totalPrice;
        }

        if(!isAuth) {
            localStorage.setItem("basket", JSON.stringify(this._basket));
        }
    }

    setDeleteAllDeviceFromBasket() {
        this._totalPrice = 0;
        return this._basket = [];
    }

    setCountDevice(deviceId, action, isAuth = false) {
        const itemInd = this._basket.findIndex(item => item.id === deviceId);
        const itemInState = this._basket.find(device => device.id === deviceId);
        if (action === "+") {
            const newItem = {
                ...itemInState,
                count: ++itemInState.count
            }
            this._basket = [...this._basket.slice(0, itemInd), newItem, ...this._basket.slice(itemInd + 1)]
        } else {
            const newItem = {
                ...itemInState,
                count: itemInState.count === 1 ? 1 : --itemInState.count
            }
            this._basket = [...this._basket.slice(0, itemInd), newItem, ...this._basket.slice(itemInd + 1)]
        }

        if(!isAuth) {
            localStorage.setItem("basket", JSON.stringify(this._basket));
        }

        let totalPrice = 0;
        this._basket.forEach(device => totalPrice += Number(device.price * device.count));
        this._totalPrice = totalPrice;
    }

    resetBasket() {
        this._basket = [];
        this._totalPrice = 0;
        localStorage.removeItem('basket');
    }


    get Basket() {
        return this._basket;
    }

    get Price() {
        return this._totalPrice;
    }
}
