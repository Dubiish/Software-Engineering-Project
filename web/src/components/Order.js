import React from 'react';
import {Container, Row, Col} from "react-bootstrap"
import Navigation from "./Navigation"

class Customer extends React.Component {
    render() {
        return(
            <div>
                <Navigation />
                <Container>
                    <Row>
                        <Col>
                            <h1> Hello world! </h1>
                            <p>I am an order article!</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Customer;