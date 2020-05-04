import React from "react";
import { Container, Row, Col, Button, Navbar, Nav, Breadcrumb } from "react-bootstrap";
import Datatable from "react-bs-datatable";
import Navigation from "./Navigation";

class Order extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch("http://localhost:4000/order/get/all", {
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
        fetch(`http://localhost:4000/customer/get/${element.customer_id}`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          }
        }).then((customerResponse) => {
          return customerResponse.json();
        }).then((customerData) => {
          let status = (element.status === 0) ? <span className="text-danger">Closed</span> : <span className="text-success">Open</span>;
          let newObj = {
            order_id : element.order_id,
            customer: "[" + element.customer_id + "] " + customerData[0].customer_name + " " + customerData[0].customer_surname,
            order_date: element.order_date,
            advance_payment: element.paid_upfront + "€",
            total_price: element.total_price + "€",
            book_number: element.book_number,
            note: element.note,
            status: status
          };
          parsedData.push(newObj);
        })
      });
      this.setState({
        orders: parsedData
      });
    });
  }

  render() {

    const headers = [
      {title: "#", prop: "order_id", filterable: true, sortable: true},
      {title: "[ID] Customer", prop: "customer", filterable: true, sortable: true},
      {title: "Date", prop: "order_date", filterable: true, sortable: true},
      {title: "Advance payment", prop: "advance_payment", filterable: true, sortable: true},
      {title: "Total Price", prop: "total_price", filterable: true, sortable: true},
      {title: "Book Number", prop: "book_number", filterable: true},
      {title: "Status", prop: "status", filterable: true},
    ];

    return (
      <div>
        <Navigation />
        <Navbar bg="secondary" size="small">
          <Navbar.Brand className="text-light">Orders</Navbar.Brand>
          <Nav className="mr-auto">
            <Button variant="info">New order</Button>
            <Button variant="secondary" className="ml-1">Export</Button>
            <Button variant="secondary" className="ml-1">Import</Button>
          </Nav>
        </Navbar>
        <Container fluid>
          <Row>
            <Col lg={{offset:1, span:10}}>
              <Breadcrumb className="mt-3">
                <Breadcrumb.Item href="/">Oakify</Breadcrumb.Item>
                <Breadcrumb.Item active>Orders</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col lg={{offset:1, span:10}}>
              <Datatable 
                tableHeaders={headers} 
                tableBody={this.state.orders}
                tableClass="striped hover responsive"
                rowsPerPage={10}
                rowsPerPageOption={[10, 15, 20]}
                classes={{
                  controlRow: "mb-3",
                  filterClearButton: "btn-secondary",
                  paginationOptsFormText: "mr-2 ml-2",
                  paginationButton: "btn-secondary",
                  table: "table-striped table-hover"
                }} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Order;
