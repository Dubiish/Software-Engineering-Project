import React from "react"
import { Container, Form, Nav, Navbar, Button, Row, Col, Breadcrumb, Toast, Spinner } from "react-bootstrap"

import Navigation from "../Navigation"

class NewUser extends React.Component {

    constructor(props) {

        super(props)

        this.state = {
            successToast: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleSuccessToast = this.toggleSuccessToast.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const gender = data.get("gender") == "Male" ? 0 : 1;
        const status = data.get("status") == "Admin" ? 0 : 1;

        let parsedData = {
            username: data.get("username"),
            password: data.get("password"),
            status: status,
            gender: gender
        }

        const settings = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parsedData)
        }

        await fetch(`${this.props.api}user/add`, settings).then((response) => {
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
        return (
            <div>
                <Navigation />
                <Navbar bg="secondary" size="small">
                    <Navbar.Brand className="text-light">New User</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Button variant="info" className="ml-1" disabled>Import from file</Button>
                    </Nav>
                </Navbar>
                <Container fluid>
                    <Row className="mt-3">
                        <Col lg={{span:8, offset:2}}>
                            <Breadcrumb>
                                <Breadcrumb.Item href="/">Oakify</Breadcrumb.Item>
                                <Breadcrumb.Item href="/user">User</Breadcrumb.Item>
                                <Breadcrumb.Item href="/user/new" active>New</Breadcrumb.Item>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{span:8, offset:2}}>
                            <Form onSubmit={this.handleSubmit}>
                                <h5 className="display-4">Create new user</h5>
                                <Form.Row>
                                    <Form.Group as={Col} lg={{span:6}} controlId="formUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" name="username" placeholder="Enter username..."></Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} lg={{span:3}}  controlId="formGender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Control as="select" name="gender">
                                            <option>Male</option>
                                            <option>Female</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col} lg={{span:6}} controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Strong password" />
                                    </Form.Group>
                                    <Form.Group as={Col} lg={{span:3}} controlId="formStatus">
                                        <Form.Label>Access rights</Form.Label>
                                        <Form.Control as="select" name="status">
                                            <option>Admin</option>
                                            <option>Employee</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Button size="lg" variant="success" name="submit" type="submit">Create</Button>
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

export default NewUser