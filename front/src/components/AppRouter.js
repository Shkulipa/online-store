import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {authRouters, publicRouters} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context);

    return (
        <Switch>
            {user.isAuth && user.User.role === "ADMIN" && authRouters.map( ({path, Component}) => {
                return <Route key={path} path={path} component={Component} exact />
            })}
            {publicRouters.map( ({path, Component}) => {
                return <Route key={path} path={path} component={Component} exact />
            })}
            <Redirect to={SHOP_ROUTE} />
        </Switch>
    );
};

export default AppRouter;
