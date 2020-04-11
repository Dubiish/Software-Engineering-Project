import React from "react"
import Navigation from "./Navigation"
import {Container, Row, Col, Breadcrumb, Card, Badge, Button, ButtonGroup} from "react-bootstrap"

function Default() {
    return(
        <div>
            <Navigation />
            <Container>
                <Row>
                    <Col>
                        <Breadcrumb className="mt-3">
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ButtonGroup aria-label="navigation group">
                            <Button variant="outline-light text-dark">Customers</Button>
                            <Button variant="outline-light text-dark" className="ml-1">Orders</Button>
                            <Button variant="outline-light text-dark" className="ml-1">Users</Button>
                        </ButtonGroup>
                        
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Orders</Card.Title>
                                <Card.Text>
                                    <h1 className="display-3">551
                                        <Badge>
                                            <svg className="bi bi-caret-up-fill  text-success" width="0.5em" height="1em" viewBox="0 0 20 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z"/>
                                            </svg>
                                        </Badge>
                                    </h1>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Customers</Card.Title>
                                <Card.Text>
                                    <h1 className="display-3">85
                                        <Badge>
                                            <svg className="bi bi-caret-up-fill  text-success" width="0.5em" height="1em" viewBox="0 0 20 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z"/>
                                            </svg>
                                        </Badge>
                                    </h1>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Profit</Card.Title>
                                <Card.Text>
                                    <h1 className="display-3">14,586€
                                        <Badge>
                                            <svg className="bi bi-caret-up-fill  text-success" width="0.5em" height="1em" viewBox="0 0 20 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z"/>
                                            </svg>
                                        </Badge>
                                    </h1>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Default;