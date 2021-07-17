import React, {useEffect, useState} from 'react';
import {Col, Container, Dropdown, ListGroup, Pagination, Row, Spinner} from "react-bootstrap";
import {fetchOrders} from "../http/ordersAPI";
import ItemOneOrderInAdmin from "../components/itemOneorderInAdmin";

const Orders = () => {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [filter, setFilter] = useState("All");
    const [rerender, setRerender] = useState(false);

    //pagination
    const limit = 5;
    const pageCount = Math.ceil(Number(count) / limit);
    const pages = [];

    useEffect(() => {
        fetchOrders({limit, page: 1}).then(data => {
            setOrders(data);
            setLoading(false);
            setCount(data.count);
        })
    }, []);

    useEffect(() => {
        setLoading(true);
        fetchOrders({limit, page: currentPage}).then(data => {
            setOrders(data);
            setLoading(false);
        })
    }, [currentPage]);

    useEffect(() => {
        setLoading(true);
        fetchOrders({limit, page: 1, complete: filter}).then(data => {
            setOrders(data);
            setLoading(false);
            setCount(data.count);
            setCurrentPage(1);
        })
    }, [filter]);

    //re-render after change status, or delete some order
    useEffect(() => {
        setLoading(true);
        fetchOrders({limit, page: currentPage, complete: filter}).then(data => {
            setOrders(data);
            setLoading(false);
            setCount(data.count);
            setCurrentPage(1);
        })
    }, [rerender]);

    const reRender = () => {
        setRerender(!rerender);
    }

    if(loading) {
        return <Spinner animation="grow"/>
    }

    for (let number = 1; number < pageCount + 1; number++) {
        pages.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <Container className="d-flex flex-column">
            <Row>
                <Col xs={12} className="mt-3 d-flex justify-content-center align-items-center">
                    <div className="mr-3">Filter:</div>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {filter}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {filter === "all" ? <Dropdown.Item disabled>All</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("all")}>All</Dropdown.Item>}
                            {filter === "completed" ? <Dropdown.Item disabled>Completed</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("completed")}>Completed</Dropdown.Item>}
                            {filter === "not-completed" ? <Dropdown.Item disabled>Not Completed</Dropdown.Item> : <Dropdown.Item onClick={() => setFilter("not-completed")}>Not Completed</Dropdown.Item>}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <ListGroup>
                {orders.rows?.map( ({id, complete, mobile, createdAt, updatedAt, userId}) =>
                    <ItemOneOrderInAdmin
                        key={id}
                        id={id}
                        complete={complete}
                        mobile={mobile}
                        createdAt={createdAt}
                        updatedAt={updatedAt}
                        userId={userId}
                        reRender={reRender}/>)}
            </ListGroup>
            <Pagination size="sm" className="mt-4 mb-4" style={{margin: "0 auto"}}>
                {pages}
            </Pagination>
        </Container>
    );
};

export default Orders;
