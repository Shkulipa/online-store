import React, {useEffect, useState} from 'react';
import {Button, Dropdown, Modal} from "react-bootstrap";
import {deleteBrand, deleteType, fetchBrands, fetchTypes} from "../../http/deviceAPI";

const DeleteBrandOrType = ({show, onHide, showSuccessMsgFunc}) => {
    const [brandOrType, setBrandOrType] = useState("Brand");
    const [brands, setBrands] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectBrand, setSelectBrand] = useState({name: "A Brand not selected"});
    const [selectType, setSelectType] = useState({name: "A type not selected"});
    const [showMsgErr, setShowMsgErr] = useState(false);
    const [msgErr, setMsgErr] = useState('');

    useEffect(() => {
        fetchTypes().then(data => setTypes(data));
        fetchBrands().then(data => setBrands(data));
    }, []);

    const Delete = async () => {
        if(brandOrType === "Brand") {
            if(selectBrand.name !== "A Brand not selected") {
                await deleteBrand(selectBrand.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectBrand({name: "A Brand not selected"});
                });
            } else {
                setMsgErr("Please choose Brand");
                setShowMsgErr(true);
            }
        } else {
            if(selectType.name !== "A Type not selected") {
                await deleteType(selectType.id).then(data => {
                    showSuccessMsgFunc(data);
                    onHide();
                    setSelectType({name: "A type not selected"});
                });
            } else {
                setMsgErr("Please choose Type");
                setShowMsgErr(true);
            }
        }
    };

    useEffect(() => setShowMsgErr(false), [selectType, selectBrand, brandOrType])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete Type or Brand
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {showMsgErr &&
                    <>
                        <p style={{color: "red", textAlign: "center"}}>{msgErr}</p>
                    </>
                }

                Choose Category:
                <Dropdown className="mb-3" style={{margin: "0 auto"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {brandOrType}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {brandOrType === "Brand" ? <Dropdown.Item disabled>Brand</Dropdown.Item> : <Dropdown.Item onClick={() => setBrandOrType("Brand")}>Brand</Dropdown.Item>}
                        {brandOrType === "Type" ? <Dropdown.Item disabled>Type</Dropdown.Item> : <Dropdown.Item onClick={() => setBrandOrType("Type")}>Type</Dropdown.Item>}
                    </Dropdown.Menu>
                </Dropdown>

                Choose item of {brandOrType === "Brand" ? "Brand" : "Type"}
                <Dropdown className="mb-3" style={{margin: "0 auto"}}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {brandOrType === "Brand" ? selectBrand.name : selectType.name}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {brandOrType === "Brand" ?
                            brands.map(({id, name}) =>
                                selectBrand.name === name ? <Dropdown.Item disabled key={id}>{name}</Dropdown.Item> : <Dropdown.Item  key={id} onClick={() => setSelectBrand({id, name})}>{name}</Dropdown.Item>
                            )
                            :
                            types.map(({id, name}) =>
                                selectType.name === name ? <Dropdown.Item disabled  key={id}>{name}</Dropdown.Item> : <Dropdown.Item  key={id} onClick={() => setSelectType({id, name})}>{name}</Dropdown.Item>
                            )
                        }

                    </Dropdown.Menu>
                </Dropdown>


            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Close</Button>
                <Button variant="outline-success" onClick={Delete}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteBrandOrType;
