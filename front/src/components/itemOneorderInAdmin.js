import React, {useState} from 'react';
import {Button, Col, ListGroup, Modal, Row} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {fetchChangeStatusOrder, fetchDeleteOrder} from "../http/ordersAPI";
import {ORDERS_ROUTE} from "../utils/consts";

const ItemOneOrderInAdmin = ({id, complete, mobile, createdAt, updatedAt, userId, reRender}) => {
    const [modalDelete, setShowDelete] = useState(false);
    const [modalStatus, setShowStatus] = useState(false);

    //modal delete
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const deleteOrder = () => {
        fetchDeleteOrder({id}).then(() => {
            setShowStatus(false);
            setTimeout(() => reRender(), 250);
        })
    }

    //modal status
    const handleCloseStatus = () => setShowStatus(false);
    const handleShowStatus = () => setShowStatus(true);
    const changeStatusOrder = () => {
        fetchChangeStatusOrder({complete: !complete, id}).then(() => {
            setShowStatus(false);
            setTimeout(() => reRender(), 250);
        })
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
        <>
            <ListGroup.Item className="mt-3" key={id}>
                <Row>
                    <Col md={8}>
                        <Row>
                            <Col xs={12}>
                                <NavLink to={ORDERS_ROUTE + `/${id}`}>id: {id}</NavLink>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                Phone: <a href={`tel:${mobile}`}>{mobile}</a>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                Order created: {formatDate(createdAt)}
                            </Col>
                        </Row>
                        {complete ? <Row>
                            <Col xs={12}>
                                Order completed: {formatDate(updatedAt)}
                            </Col>
                        </Row> : false}
                        <Row>
                            <Col xs={12}>
                                {userId ? "Buyer: Registered" : "Buyer: Not registered"}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                Status: {complete ? "Completed" : "In progress"}
                            </Col>
                        </Row>
                    </Col>
                    <Col md={4}>
                        <Row style={{height: "100%"}} className="d-flex align-items-center">
                            <Col xs={6} className="d-flex justify-content-center">
                                {complete ?
                                    <Button variant="success" onClick={handleShowStatus}>Make not complete</Button>
                                    :
                                    <Button variant="warning" onClick={handleShowStatus}>Make Completed</Button>}
                            </Col>
                            <Col xs={6} className="d-flex justify-content-center">
                                <Button variant="danger" onClick={handleShowDelete}>Delete</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ListGroup.Item>

            {/*modal confirm change status*/}
            <Modal show={modalStatus} onHide={handleCloseStatus}>
                <Modal.Header closeButton>
                    <Modal.Title>Please confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want changes status for this order(id: {id}), from {complete ? '\'Completed\'' : '\'In progress\''} to {complete ? '\'In progress\'' : '\'Completed\''}?
                    <br/><br/>
                    Data:
                    <ul>
                        <li>mobile: {mobile}</li>
                        <li>Order CreatedAt: {formatDate(createdAt)}</li>
                        {complete ? `Order completed: ${formatDate(updatedAt)}` : false}
                        <li>Status: {complete ? 'Completed' : `In progress`}</li>
                        <li>{userId ? 'Buyer registered' : `Buyer not registered`}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseStatus}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={changeStatusOrder}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*modal confirm delete order*/}
            <Modal show={modalDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Please confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Do you want delete this order(id: {id})?
                    <br/><br/>
                    Data:
                    <ul>
                        <li>mobile: {mobile}</li>
                        <li>Order CreatedAt: {formatDate(createdAt)}</li>
                        {complete ? `Order completed: ${formatDate(updatedAt)}` : false}
                        <li>Status: {complete ? 'Completed' : `In progress`}</li>
                        <li>{userId ? 'Buyer registered' : `Buyer not registered`}</li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={deleteOrder}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
};

export default ItemOneOrderInAdmin;
