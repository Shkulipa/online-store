import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useHistory} from "react-router-dom";

import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context);
    const history = useHistory();
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let data;
            if(isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data);
            user.setIsAuth(true);
            history.push(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? "Authorization" : "Registration"}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Input your Email..."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Input password..."
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3 align-items-center">
                        {isLogin ?
                            <div>
                                Haven't account? <NavLink to={REGISTRATION_ROUTE}>Sign In</NavLink>
                            </div>
                            :
                            <div>
                                Has account? <NavLink to={LOGIN_ROUTE}>Login</NavLink>
                            </div>
                        }

                        <Button
                            className="align-self-end"
                            variant="outline-success"
                            onClick={click}
                        >
                            {isLogin ? "Login" : "Registration"}
                        </Button>
                    </Row>
                </Form>
            </Card>

        </Container>
    );
});

export default Auth;
