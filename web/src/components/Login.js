import React from "react"
import { Navbar, Button, Nav, Container, Row, Col, Form } from "react-bootstrap"

class Login extends React.Component {
    
    render() {
        return (
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Oakify</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                        <Navbar.Text className="mr-1">
                            <a>Sign up</a>
                            <Button variant="info" size="sm" className="ml-3">
                                Log in
                            </Button>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Navbar>

                <Container>
                    <Row className="mt-3">
                        <Col>
                            <h1 className="text-center display-4">Log-in</h1>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col lg={{offset:3, span:6}}>
                            <Form>
                                <Form.Group controlId="formLoginName">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username..." />
                                </Form.Group>

                                <Form.Group controlId="formLoginPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>

                                <Form.Group controlId="formLoginRemember">
                                    <Form.Check type="checkbox" label="Remember username" />
                                </Form.Group>

                                <Button variant="primary" href="/">Log in</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Login