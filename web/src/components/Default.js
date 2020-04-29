import React from "react";
import Navigation from "./Navigation";
import { Container, Row, Col, Breadcrumb, Card, Badge, Button, ButtonGroup, CardDeck, Toast } from "react-bootstrap";

class Default extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      totalOrders: 0,
      totalCustomers: 0,
      profit: 0,
      openOrders: 0,
      closedOrders: 0,
      welcomeToast: true
    }
  }

  toggleWelcomeToast() {
    this.setState({
      ...this.state,
      welcomeToast: !this.state.welcomeToast
    });
  }

  componentDidMount() {
    this.fetchData();
    this.timer = setInterval(() => this.fetchData(), 20000);
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null;
  }

  fetchData() {
    var result = {
      customersCount: 0,
      ordersCount : 0,
      profit: 0,
      openOrders: 0,
      closedOrders : 0
    }

    let details = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
    }

    fetch("http://localhost:4000/order/get/count", details).then((ordersResponse) => {
      return ordersResponse.json();
    }).then((data) => {
      result["ordersCount"] = data[0].count;
      fetch("http://localhost:4000/customer/get/count", details).then((customersResponse) => {
        return customersResponse.json();
      }).then((customersData) => {
        result["customersCount"] = customersData[0].Count;
        fetch("http://localhost:4000/order/get/profit/sum", details).then((profitResponse) => {
          return profitResponse.json();
        }).then((profitData) => {
          result["profit"] = profitData[0].profit;
          fetch("http://localhost:4000/order/get/status/sum", details).then((statusResponse) => {
            return statusResponse.json();
          }).then((statusData) => {
            result["openOrders"] = statusData[0].count;
            result["closedOrders"] = statusData[1].count;
            this.setState({
              ...this.state,
              totalOrders : result.ordersCount,
              totalCustomers : result.customersCount,
              profit : result.profit,
              openOrders : result.openOrders,
              closedOrders : result.closedOrders,
            }); 
          });
        });
      });
    });

  }

  render() {
    return (
      <div style={{ height: "100vh" }} className="bg-light">
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
                <Button variant="text-dark">Customers</Button>
                <Button variant="text-dark" className="ml-1">
                  Orders
                </Button>
                <Button variant="text-dark" className="ml-1">
                  Users
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <CardDeck>
                <Card>
                  <Card.Body>
                    <Card.Title>Total Orders</Card.Title>
                    <Card.Text>
                      <span className="display-3">
                        {this.state.totalOrders}
                        <Badge>
                          <svg
                            className="bi bi-caret-up-fill  text-success"
                            width="0.5em"
                            height="1em"
                            viewBox="0 0 20 40"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z" />
                          </svg>
                        </Badge>
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title>Total Customers</Card.Title>
                    <Card.Text>
                      <span className="display-3">
                        {this.state.totalCustomers}
                        <Badge>
                          <svg
                            className="bi bi-caret-up-fill  text-success"
                            width="0.5em"
                            height="1em"
                            viewBox="0 0 20 40"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z" />
                          </svg>
                        </Badge>
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title>Profit for last 30 days</Card.Title>
                    <Card.Text>
                        <span className="display-3">
                          {this.state.profit}€
                          <Badge>
                            <svg
                              className="bi bi-caret-up-fill  text-success"
                              width="0.5em"
                              height="1em"
                              viewBox="0 0 20 40"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 00.753-1.659l-4.796-5.48a1 1 0 00-1.506 0z" />
                            </svg>
                          </Badge>
                        </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </CardDeck>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <CardDeck>
                <Card>
                  <Card.Body>
                    <Card.Title>Quick Menu</Card.Title>
                    <Card.Text>
                      <span className="list-unstyled">
                        <li className="mt-4">
                          <Button variant="outline-dark" className="pr-4">
                            <svg
                              className="bi bi-file-plus mr-2"
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9 1H4a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V8h-1v5a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1h5V1z" />
                              <path
                                fillRule="evenodd"
                                d="M13.5 1a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13V1.5a.5.5 0 01.5-.5z"
                                clipRule="evenodd"
                              />
                              <path
                                fillRule="evenodd"
                                d="M13 3.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Create order
                          </Button>
                        </li>
                        <li className="mt-2">
                          <Button variant="outline-dark">
                            <svg
                              className="bi bi-person-plus mr-2"
                              width="1em"
                              height="1em"
                              viewBox="0 0 16 16"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM1.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM6 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0zm4.5 0a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13V5.5a.5.5 0 01.5-.5z"
                                clipRule="evenodd"
                              />
                              <path
                                fillRule="evenodd"
                                d="M13 7.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Add Customer
                          </Button>
                        </li>
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title>Open Orders</Card.Title>
                    <Card.Text>
                      <span className="display-2">{this.state.openOrders}</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Body>
                    <Card.Title>Closed Orders</Card.Title>
                    <Card.Text>
                      <span className="display-2">{this.state.closedOrders}</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </CardDeck>
            </Col>
          </Row>
          <Toast
            onClose={() => this.toggleWelcomeToast()}
            show={this.state.welcomeToast}
            delay={5000}
            autohide
            style={{ position: "absolute", top: 75, right: 20 }}
          >
            <Toast.Header>
              <strong className="mr-auto">Welcome!</strong>
              <small>3 minutes ago</small>
            </Toast.Header>
            <Toast.Body>
              Looks like this is your first time. Show me some <u>tips!</u>
            </Toast.Body>
          </Toast>
        </Container>
      </div>
    );
  }
}

export default Default;
