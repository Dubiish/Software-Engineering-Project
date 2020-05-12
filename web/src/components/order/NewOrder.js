import React from "react"
import { Navbar, Nav, Button, Container, Row, Col, Breadcrumb, Form, Toast, Spinner } from "react-bootstrap"

import Navigation from "../Navigation"

class NewOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showSuccessToast: false,
            showFailToast: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleSuccessToast = this.toggleSuccessToast.bind(this);
        this.toggleFailToast = this.toggleFailToast.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);

        const advancePayment = data.get("advance_payment") ? data.get("advance_payment") : 0;
        const bookNumber = data.get("book_number") ? data.get("book_number") : 0;
        const note = data.get("note") ? data.get("note") : null;

        let parsedData = {
            customer_id: data.get("customer_id"),
            order_date: data.get("order_date"),
            paid_upfront: advancePayment,
            total_price: data.get("total_price"),
            book_number: bookNumber,
            note: note,
            status: (data.get("status") === "Open" ? 1 : 0)
        };

        const settings = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parsedData)
        };

        await fetch(`${this.props.api}order/create/new`, settings).then((res) => {
            if(res.status === 200) {
                this.setState({
                    ...this.state,
                    showSuccessToast: true
                });
            } else {
                this.setState({
                    ...this.state,
                    showFailToast: true
                })
            }
        });
    }

    toggleSuccessToast() {
        this.setState({
            ...this.state,
            showSuccessToast: !this.state.showSuccessToast
        })
    }

    toggleFailToast() {
        this.setState({
            ...this.state,
            showFailToast: !this.state.showFailToast
        })
    }

    render() {
        return(
            <div>
                <Navigation />
                <Navbar bg="secondary" size="small">
                    <Navbar.Brand className="text-light">New Order</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Button variant="info" className="ml-1" disabled>Import from file</Button>
                    </Nav>
                </Navbar>
                <Container fluid>
                    <Row className="mt-3">
                        <Col lg={{span: 8, offset: 2}}>
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">Oakify</Breadcrumb.Item>
                                <Breadcrumb.Item href="/order">Order</Breadcrumb.Item>
                                <Breadcrumb.Item href="/order/new" active >New</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{span: 8, offset: 2}}>
                            <Form onSubmit={this.handleSubmit}>
                                <h5 className="display-4">Add new order</h5>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formCustomerId">
                                        <Form.Label>Customer ID*</Form.Label>
                                        <Form.Control name="customer_id" type="number" placeholder="e.g.: 2"></Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formOrderDate">
                                        <Form.Label>Order date*</Form.Label>
                                        <Form.Control name="order_date" type="date" defaultValue="2020-01-01"></Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formOrderAdvancePayment">
                                        <Form.Label>Advance payment</Form.Label>
                                        <Form.Control name="advance_payment" type="number" placeholder="e.g.: 100"></Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formOrderTotalPrice">
                                        <Form.Label>Total price*</Form.Label>
                                        <Form.Control name="total_price" type="number" placeholder="e.g.: 200"></Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formOrderBookNumber">
                                        <Form.Label>Book number</Form.Label>
                                        <Form.Control name="book_number" type="number" placeholder="e.g.: 5"></Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formOrderStatus">
                                        <Form.Label>Order status</Form.Label>
                                        <Form.Control name="status" as="select" defaultValue="Open">
                                            <option>Open</option>
                                            <option>Closed</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formOrderNote">
                                        <Form.Label>Note</Form.Label>
                                        <Form.Control name="note" as="textarea" rows="4"></Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row className="float-right">
                                    <Button size="lg" variant="success" type="submit" name="submit">Create</Button>
                                </Form.Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <Toast onClose={() => this.toggleSuccessToast()} show={this.state.showSuccessToast} delay={5000} autohide style={{ position: "absolute", top: 125, right: 60 }}>
                    <Toast.Header>
                        <strong className="mr-auto text-success"><Spinner animation="grow" variant="success" size="sm" />Sucess!</strong>
                    </Toast.Header>
                    <Toast.Body>
                        Order created successfully!
                    </Toast.Body>
                </Toast>  
                <Toast onClose={() => this.toggleFailToast()} show={this.state.showFailToast} delay={5000} autohide style={{ position: "absolute", top: 125, right: 60 }}>
                    <Toast.Header>
                        <strong className="mr-auto text-danger"><Spinner animation="grow" variant="danger" size="sm" />Fail!</strong>
                    </Toast.Header>
                    <Toast.Body>
                        Invalid Customer! Please, check if customer is created!
                    </Toast.Body>
                </Toast>
            </div>
        )
    }

}

export default NewOrder