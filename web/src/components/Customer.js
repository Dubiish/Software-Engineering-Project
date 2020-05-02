import React from "react";
import { Container, Row, Col, Jumbotron, Button, Navbar, Nav } from "react-bootstrap";
import Datatable from "react-bs-datatable";
import Navigation from "./Navigation";

class Customer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("http://localhost:4000/customer/get/all", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {

      return response.json();
    }).then((data) => {
      var parsedData = [];
      data.forEach(element => {
        let newObj = {
          customer_id : element.customer_id,
          customer_name: element.customer_name,
          customer_surname: element.customer_surname,
          customer_address: element.street_name + " " + element.house_number + " " + element.city + " " + element.post_code + " " + element.country,
          phone_number: element.phone_number,
          email: element.email,
          note: element.note,
        };
        parsedData.push(newObj);
      });
      this.setState({
        customers: parsedData
      });
    });
  }

  render() {

    const headers = [
      {title: "#", prop: "customer_id", filterable: true, sortable: true},
      {title: "Name", prop: "customer_name", filterable: true, sortable: true},
      {title: "Surname", prop: "customer_surname", filterable: true, sortable: true},
      {title: "Address", prop: "customer_address", filterable: true, sortable: true},
      {title: "Phone Number", prop: "phone_number", filterable: true},
      {title: "E-mail", prop: "email", filterable: true},
    ];

    return (
      <div>
        <Navigation />
        <Navbar bg="secondary" size="small">
          <Navbar.Brand className="text-light">Customers</Navbar.Brand>
          <Nav className="mr-auto">
            <Button variant="info">New customer</Button>
            <Button variant="secondary" className="ml-1">Export</Button>
            <Button variant="secondary" className="ml-1">Import</Button>
          </Nav>
        </Navbar>
        <Container fluid>
          <Row className="mt-4">
            <Col lg={{offset:1, span:10}}>
              <Datatable 
                tableHeaders={headers} 
                tableBody={this.state.customers}
                tableClass="striped hover responsive"
                rowsPerPage={5}
                rowsPerPageOption={[5, 10, 15, 20]}
                classes={{
                  controlRow: "mb-3",
                  filterClearButton: "btn-secondary",
                  paginationOptsFormText: "mr-2 ml-2",
                  paginationButton: "btn-secondary",
                  table: "table-striped table-bordered table-hover"
                }} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Customer;
