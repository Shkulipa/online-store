import {makeAutoObservable} from "mobx";
import jwt_decode from "jwt-decode";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        makeAutoObservable(this);
        this.checkValidToken = this.checkValidToken.bind(this);
    }

    checkValidToken() {
        let isExpired = false;
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);
        const dateNow = new Date();

        if (decodedToken.exp < dateNow.getTime()){
            isExpired = true;
        }

        return isExpired;
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }

    get User() {
        return this._user;
    }
}
