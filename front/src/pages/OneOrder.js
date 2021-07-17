import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Row, Spinner} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {getOneOrderDevices} from "../http/ordersAPI";

const OneOrder = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        getOneOrderDevices(id).then(data => {
            setOrder(data);
            setLoading(false);
            console.log(order);
        })
    }, []);

    if(loading) {
        return <Spinner animation="grow"/>
    }

    //Format date (createdAt)
    const formatDate = (propsDate) => {
        const date = new Date(Date.parse(propsDate));
        const options = {
            weekday: "short",
            hour: 'numeric',
            minute: 'numeric',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timezone: 'UTC'
        };
        return date.toLocaleString("en-US", options);
    }

    return (
        <Container className="d-flex flex-column">
            Order id: {id} <br />
            Complete: {order?.descr.complete ? "Completed" : "Not complete"} <br />
            User: {order?.descr.userId ?  order.descr.userId : "User didn't register"} <br />
            Created: {formatDate(order?.descr.createdAt)} <br />
            {order?.descr.complete ? formatDate(order.descr.complete.updatedAt) : false }
            <a href={`tel:${order?.descr.mobile}`}>Mobile: {order?.descr.mobile}</a>
            <br />

            {order?.devices.map( ({count,descr}, i) => {
                return (
                    <Row key={i} className="mb-5">
                        <Col xs={2}>
                            <Image width={150} src={process.env.REACT_APP_API_URL + descr.img}/>
                        </Col>
                        <Col xs={10}>
                            Brand: {descr.brand.name}<br />
                            Type: {descr.type.name}<br />
                            Name: {descr.name}<br />
                            Price: {descr.price} RUB<br />
                            Count: {count}<br />
                            Total price: {count * descr.price} RUB
                        </Col>
                    </Row>
                )
            })}

        </Container>
    );
};

export default OneOrder;
