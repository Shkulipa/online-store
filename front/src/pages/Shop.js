import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchBrands, fetchDevice, fetchTypes} from "../http/deviceAPI";
import Pages from "../components/Pages";

const Shop = observer(() => {
    const {device} = useContext(Context);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data));
        fetchBrands().then(data => device.setBrands(data));
        fetchDevice(null, null, 1, 9).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, []);

    useEffect(
        () => {
            if(device.selectedType === "all") {
                    fetchDevice(null, device.selectedBrand.id, device.page, 9).then(data => {
                        device.setDevices(data.rows);
                        device.setTotalCount(data.count);
                    });
                } else {
                    fetchDevice(device.selectedType.id, device.selectedBrand.id, device.page, 9).then(data => {
                        device.setDevices(data.rows);
                        device.setTotalCount(data.count);
                    });
                }
        }, [device.page, device.selectedType, device.selectedBrand],
    );

    return (
        <Container>
            <Row className="mt-3">
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
