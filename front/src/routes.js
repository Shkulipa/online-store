import {
    ADMIN_ROUTE,
    BASKET_ROUTE, DEVICE_EDIT_ROUTE,
    DEVICE_ROUTE,
    LOGIN_ROUTE, ORDERING_ROUTE,
    ORDERS_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE
} from './utils/consts';

import Admin from "./pages/Admin";
import Orders from "./pages/Orders";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import BasketCard from "./pages/BasketCard";
import OneOrder from "./pages/OneOrder";
import DevicePageEdit from "./pages/DevicePageEdit";
import Ordering from "./pages/Ordering";


export const authRouters = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: ORDERS_ROUTE,
        Component: Orders
    },
    {
        path: ORDERS_ROUTE + '/:id',
        Component: OneOrder
    },
    {
        path: DEVICE_EDIT_ROUTE + '/:id',
        Component: DevicePageEdit
    },

];

export const publicRouters = [
    {
        path: ORDERING_ROUTE,
        Component: Ordering
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
    {
        path: BASKET_ROUTE,
        Component: BasketCard
    },
];
