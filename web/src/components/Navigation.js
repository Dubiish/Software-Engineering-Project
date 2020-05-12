import React from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavDropdown } from "react-bootstrap";

function Navigation() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Oakify</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Dashboard</Nav.Link>
                    <Nav.Link href="/customer">Customers</Nav.Link>
                    <Nav.Link href="/order">Orders</Nav.Link>
                    <Nav.Link href="/users">Users</Nav.Link>
                    <NavDropdown title="Settings" id="dropdown-settings">
                        <NavDropdown.Item href="/backup">Backup</NavDropdown.Item>
                        <NavDropdown.Item href="/logs">Logs</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form> */}
                <Navbar.Text className="mr-1">
                    <svg
                        className="bi bi-people-fill mr-1"
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 100-6 3 3 0 000 6zm-5.784 6A2.238 2.238 0 015 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 005 9c-4 0-5 3-5 4s1 1 1 1h4.216zM4.5 8a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                            clipRule="evenodd"
                        />
                    </svg>
          Signed in as:{" "}
                    <a href="/" className="ml-1">
                        Lukáš Solvar
          </a>
                    <Button variant="info" size="sm" className="ml-3">
                        Log out
          </Button>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigation;
