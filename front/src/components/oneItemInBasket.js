import React, {useContext} from 'react';
import {Button, Card, Col, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import {NavLink} from "react-router-dom";

const OneItemInBasket = ({device}) => {
    const {basket, user} = useContext(Context);

    return (
        <Card key={device.id} style={{width: "100%"}} className="mb-3">
            <Card.Body>
                <Row>
                    <Col xs={4}>
                        <Image src={process.env.REACT_APP_API_URL + device.img} style={{width: "100%", maxWidth: 250}} />
                    </Col>
                    <Col xs={4}>
                        <Row>
                            <Col xs={12}>
                                <b>Title:</b> <NavLink to={`/device/${device.id}`}>{device.name}</NavLink>
                            </Col>
                        </Row>
                        <br/><br/>
                        <Row>
                            <Col xs={12}>
                                <b>Description:</b><br/><br/>
                                {device.info && device.info.length !== 0? device.info.map((info, i) => {

                                    if(i % 2 === 0 ) {
                                        return (
                                            <Row key={info.id}>
                                                <Col xs={6}>
                                                    {info.title}
                                                </Col>
                                                <Col xs={6}>
                                                    {info.description}
                                                </Col>
                                            </Row>
                                        );
                                    } else {
                                        return (
                                            <Row key={info.id} style={{backgroundColor: "lightgray"}}>
                                                <Col xs={6}>
                                                    {info.title}
                                                </Col>
                                                <Col xs={6}>
                                                    {info.description}
                                                </Col>
                                            </Row>
                                        );
                                    }

                                }) : "Description absent"}
                            </Col>
                        </Row>


                    </Col>
                    <Col xs={4}>
                        <Row>
                            <Col xs={12} className="d-flex justify-content-center">
                                {user.isAuth ? <Button variant="outline-dark" onClick={() => basket.setDeleteItemBasket(device, true)}>Delete from Cart</Button>
                                    : <Button variant="outline-dark" onClick={() => basket.setDeleteItemBasket(device)}>Delete from Cart</Button>
                                }
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                Count:
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col xs={12} className="d-flex justify-content-center">
                                <Button variant="outline-dark" onClick={() => basket.setCountDevice(device.id, "+")}>+</Button>
                                <input className="ml-2 mr-2 pl-2 pr-2" style={{width: "20%"}} type="number" onChange={e =>basket.setCountDevice(Number(e.target.value))} value={device.count}/>
                                <Button variant="outline-dark" onClick={() => basket.setCountDevice(device.id, "-")}>-</Button>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col xs={12} className="d-flex justify-content-center">
                                Price: {device.price * device.count} RUB
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
)};

export default OneItemInBasket;
