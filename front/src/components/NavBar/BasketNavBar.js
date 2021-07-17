import React, {useContext} from 'react';
import {Image} from "react-bootstrap";
import shop_cart from "../../assets/shopping-basket.png";
import {NavLink} from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {BASKET_ROUTE} from "../../utils/consts";

const BasketNavBar = observer(() => {
    const {basket} = useContext(Context);

    return (
        <div className="d-flex align-items-center mr-3">
            <NavLink to={BASKET_ROUTE} className="d-flex align-items-center">
                <Image src={shop_cart} style={{width: "100%", maxWidth: 30}} alt="basket"/>
                <div className="ml-2" style={{textDecoration: "none", color: "white"}}>{basket.Price} RUB</div>
            </NavLink>
        </div>
    );
});
export default BasketNavBar;


