// Dependencies
import React from "react"
import { Container, Row, Col, Card, Breadcrumb, Navbar, Nav, Button } from "react-bootstrap"

// Components
import Navigation from "../Navigation"

class User extends React.Component {
    
    constructor(props) {
        
        super(props)

        this.state = {
            users: []
        }

        this.fetchUsers = this.fetchUsers.bind(this);

    }

    componentDidMount() {
        this.fetchUsers();
    }

    async fetchUsers() {

        let users = [];

        await fetch(`${this.props.api}user/get/all`, {
            method: "GET",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            data.forEach(element => {
                let user = {
                    id: element.user_id,
                    name: element.user_name,
                    status: element.status,
                    gender: element.gender
                }
                users.push(user);
            });
        })

        this.setState({
            ...this.state,
            users: users
        }, () => {
            console.log(this.state);
        });

    }

    render() {
        return(
            <div>
                <Navigation />
                <Navbar bg="secondary" size="small">
                    <Navbar.Brand className="text-light">Users</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Button variant="info" href="/user/new" disabled>New user</Button>
                    </Nav>
                </Navbar>
                <Row className="mt-3">
                    <Col lg={{offset: 2, span: 8}}>
                        <Breadcrumb>
                            <Breadcrumb.Item href="/">Oakify</Breadcrumb.Item>
                            <Breadcrumb.Item href="/user" active>Users</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Container>
                    <Row>
                        {
                            this.state.users.map((user) => {
                                return(
                                    <Card className="mt-2 ml-2 btn-light text-dark" style={{width: "14rem"}}>
                                        <Card.Img variant="top" src={require(`../../resources/avatar_${user.gender === 1 ? "f" : "m"}${Math.floor(Math.random() * 4) + 1}.png`)} />
                                        <Card.Body className="text-center">
                                            <Card.Title>{`[${user.id}] ${user.name}`}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                )
                            })
                        }
                        <Card className="mt-2 ml-2 btn btn-light" style={{width: "14rem"}}>
                            <Card.Img variant="top" src={require(`../../resources/add_new.png`)} />
                            <Card.Body>
                                <Card.Title className="text-center">New User</Card.Title>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            </div>
        )
    }

}

export default User