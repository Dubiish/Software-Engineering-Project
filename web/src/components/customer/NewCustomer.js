import React from "react"
import { Container, Form, Nav, Navbar, Button, Row, Col, Breadcrumb, Toast, Spinner } from "react-bootstrap"

import Navigation from "../Navigation"

class NewCustomer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: null,
            surname: null,
            street: null,
            houseNumber: null,
            city: null,
            country: null,
            postCode: null,
            email: null,
            phoneNumber: null,
            note: null,
            successToast: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleSuccessToast = this.toggleSuccessToast.bind(this);
    }

    handleChange(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let data = {
            name: this.state.name,
            surname: this.state.surname,
            street: this.state.street,
            houseNumber: this.state.houseNumber,
            city: this.state.city,
            country: this.state.country,
            postCode: this.state.postCode,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber,
            note: this.state.note
        }
        fetch(`${this.props.api}customer/add`, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        }).then((response) => {
            this.toggleSuccessToast();
        })
    }

    toggleSuccessToast() {
        this.setState({
            ...this.state,
            successToast: !this.state.successToast
        })
    }

    render() {
        return(
            <div>
                <Navigation />
                <Navbar bg="secondary" size="small">
                    <Navbar.Brand className="text-light">New Customer</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Button variant="info" className="ml-1" disabled>Import from file</Button>
                    </Nav>
                </Navbar>
                <Container fluid>
                    <Row className="mt-3">
                        <Col lg={{span:8, offset:2}}>
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">Oakify</Breadcrumb.Item>
                                <Breadcrumb.Item href="/customer">Customer</Breadcrumb.Item>
                                <Breadcrumb.Item href="/customer/new" active>New</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{span:8, offset:2}}>
                            <Form onSubmit={this.handleSubmit}>
                                <h5 className="display-4">Create new customer</h5>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formCustomerName">
                                        <Form.Label>Name*</Form.Label>
                                        <Form.Control value={this.state.name} onChange={this.handleChange} name="name" type="text" placeholder="Enter name" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formCustomerSurname">
                                        <Form.Label>Surname*</Form.Label>
                                        <Form.Control value={this.state.surname} onChange={this.handleChange} name="surname" type="text" placeholder="Surname" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formCustomerStreet">
                                        <Form.Label>Street name*</Form.Label>
                                        <Form.Control value={this.state.street} onChange={this.handleChange} name="street" type="text" placeholder="e.g.: Fairfield Avenue" />
                                    </Form.Group>
                                    
                                    <Form.Group as={Col} controlId="formHouseNumber">
                                        <Form.Label>House number*</Form.Label>
                                        <Form.Control value={this.state.houseNumber} onChange={this.handleChange} name="houseNumber" type="text" placeholder="e.g.: 32A" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formCity">
                                        <Form.Label>City*</Form.Label>
                                        <Form.Control value={this.state.city} onChange={this.handleChange} name="city" type="text" placeholder="e.g.: Stockholm" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formCountry">
                                        <Form.Label>Country*</Form.Label>
                                        <Form.Control value={this.state.country} onChange={this.handleChange} name="country" type="text" placeholder="e.g.: Sweeden" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formPostCode">
                                        <Form.Label>Post code*</Form.Label>
                                        <Form.Control value={this.state.postCode} onChange={this.handleChange} name="postCode" type="text" placeholder="e.g.: 122 00" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formEmail">
                                        <Form.Label>E-mail*</Form.Label>
                                        <Form.Control value={this.state.email} onChange={this.handleChange} name="email" type="text" placeholder="e.g.: address@domain.com" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formPhoneNumber">
                                        <Form.Label>Phone number*</Form.Label>
                                        <Form.Control value={this.state.phoneNumber} onChange={this.handleChange} name="phoneNumber" type="text" placeholder="e.g.: +35 556 214" />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formNote">
                                        <Form.Label>Note</Form.Label>
                                        <Form.Control value={this.state.note} onChange={this.handleChange} as="textarea" rows="4"></Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Button size="lg" className="float-right" variant="success" name="submit" type="submit">Create</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <Toast
                    onClose={() => this.toggleSuccessToast()}
                    show={this.state.successToast}
                    delay={5000}
                    autohide
                    style={{ position: "absolute", top: 125, right: 60 }}
                >
                    <Toast.Header>
                        <strong className="mr-auto text-success"><Spinner animation="grow" variant="success" size="sm" />Sucess!</strong>
                    </Toast.Header>
                    <Toast.Body>
                        Customer created successfully!
                    </Toast.Body>
                </Toast>    
            </div>
        )
    }
}

export default NewCustomer