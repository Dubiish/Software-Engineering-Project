import React from "react";
import { Container, Row, Col, Button, Navbar, Nav, Breadcrumb, Form, Modal} from "react-bootstrap";
import Datatable from "react-bs-datatable";
import Navigation from "./Navigation";

class Customer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      showModal: false,
      modalCustomer: null
    }

    this.onRowClick = this.onRowClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.fetchTableData();
  }

  async onRowClick(data) {
    let chosenCustomerId = data.customer_id;
    let flags = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    }
    await fetch(`${this.props.api}customer/get/${chosenCustomerId}`, flags).then((response) => {
      return response.json();
    }).then((extractedData) => {
      if(extractedData[0].note == null) {
        extractedData[0].note = "Empty"
      }
      this.setState({
        ...this.state,
        modalCustomer: extractedData[0]
      }, () => {
        this.toggleModal();
      })
    });
  }

  toggleModal() {
    this.setState({
      ...this.state,
      showModal: !this.state.showModal
    })
  }

  async fetchTableData() {
    let flags = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    }
    await fetch(`${this.props.api}customer/get/all`, flags).then((response) => {
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

    var concreteCustomer;
    if(this.state.modalCustomer != null) {
      concreteCustomer = this.state.modalCustomer;
    }

    return (
      <div>
        <Modal size="lg" show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Form.Group as={Col} controlId="formCustomerId">
                  <Form.Label>Customer ID</Form.Label>
                  <Form.Control name="customer_id" type="text" placeholder="ID" readOnly defaultValue={concreteCustomer ? concreteCustomer.customer_id : null} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formCustomerName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="customer_name" placeholder="Customer's name" defaultValue={concreteCustomer ? concreteCustomer.customer_surname : null} />
                </Form.Group>

                <Form.Group as={Col} controlId="formCustomerSurname">
                  <Form.Label>Surname</Form.Label>
                  <Form.Control type="text" name="customer_surname" placeholder="Customer's surname" defaultValue={concreteCustomer ? concreteCustomer.customer_surname : null} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formStreetName">
                  <Form.Label>Street</Form.Label>
                  <Form.Control type="text" name="street_name" placeholder="Street name" defaultValue={concreteCustomer ? concreteCustomer.street_name : null} />
                </Form.Group>

                <Form.Group as={Col} controlId="formHouseNumber">
                  <Form.Label>House No.</Form.Label>
                  <Form.Control type="text" name="house_number" placeholder="House number" defaultValue={concreteCustomer ? concreteCustomer.house_number : null} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" name="city" placeholder="City" defaultValue={concreteCustomer ? concreteCustomer.city : null} />
                </Form.Group>

                <Form.Group as={Col} controlId="formCountry">
                  <Form.Label>Country/State</Form.Label>
                  <Form.Control type="text" name="country" placeholder="Country/State" defaultValue={concreteCustomer ? concreteCustomer.country : null} />
                </Form.Group>

                <Form.Group as={Col} controlId="formPostCode">
                  <Form.Label>Post code</Form.Label>
                  <Form.Control type="text" name="post_code" placeholder="Post code" defaultValue={concreteCustomer ? concreteCustomer.post_code : null} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formPhoneNumber">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control type="text" name="phone_number" placeholder="Phone number" defaultValue={concreteCustomer ? concreteCustomer.phone_number : null} />
                </Form.Group>

                <Form.Group as={Col} controlId="formEmail">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control type="text" name="email" placeholder="E-mail" defaultValue={concreteCustomer ? concreteCustomer.email : null} />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="formNote">
                  <Form.Label>Note</Form.Label>
                  <Form.Control name="note" as="textarea" rows="5" defaultValue={concreteCustomer ? concreteCustomer.note : "Empty"} />
                </Form.Group>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="success">Save</Button>
          <Button variant="danger">Delete</Button>
          <Button variant="secondary" onClick={this.toggleModal}>Close</Button>
          </Modal.Footer>
        </Modal>
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
          <Row>
            <Col lg={{offset:1, span:10}}>
              <Breadcrumb className="mt-3">
                <Breadcrumb.Item href="/">Oakify</Breadcrumb.Item>
                <Breadcrumb.Item active>Customers</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col lg={{offset:1, span:10}}>
              <Datatable 
                tableHeaders={headers} 
                tableBody={this.state.customers}
                tableClass="striped hover responsive"
                rowsPerPage={10}
                rowsPerPageOption={[10, 15, 20]}
                onRowClick={this.onRowClick}
                classes={{
                  controlRow: "mb-3",
                  filterClearButton: "btn-secondary",
                  paginationOptsFormText: "mr-2 ml-2",
                  paginationButton: "btn-secondary",
                  table: "table-striped table-hover",
                }} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Customer;
