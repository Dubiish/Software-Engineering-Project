import React from "react";
import { Container, Row, Col, Button, Navbar, Nav, Breadcrumb, Modal, Form } from "react-bootstrap";
import Datatable from "react-bs-datatable";
import Navigation from "../Navigation";
import * as moment from "moment"

class Order extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			orders: [],
			concreteOrder: {},
			showOrderModal: false
		}

		this.toggleModal = this.toggleModal.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }
    
    componentDidMount() {
        this.fetchData();
    }

	toggleModal() {
		this.setState({
			...this.state,
			showOrderModal: !this.state.showOrderModal
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		const data = new FormData(e.target);
		let orderId = data.get("order_id");
		let formatedData = {
			customer_id : data.get("customer_id"),
			order_date : data.get("order_date"),
			advance_payment : data.get("advance_payment"),
			total_price : data.get("total_price"),
			note : data.get("note"),
			book_number : data.get("book_number"),
			status : (data.get("status") === "Open" ? 1 : 0)
		};
		fetch(`${this.props.api}order/update/order/${orderId}`, {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(formatedData)
		}).then((response) => {
			this.fetchData();
			this.toggleModal();
		})
	}

	handleDelete(id) {
		if(id == null) {
			return;
		} else {
			fetch(`${this.props.api}order/delete/${id}`, {
				method: "DELETE"
			}).then((response) => {
				this.fetchData();
				this.toggleModal();
			})
		}
	}

	async onRowClick(data) {
		let orderId = data.order_id;
		let settings = {
			method: "GET",
			mode: "cors",
			headers: {
				"Content-Type": "application/json"
			}
		};
		await fetch(`${this.props.api}order/get/${orderId}`, settings).then((ordersResponse) => {
			return ordersResponse.json();
		}).then((orderData) => {
			fetch(`${this.props.api}customer/get/${orderData[0].customer_id}`, settings).then((customerResponse) => {
				return customerResponse.json();
			}).then((customerData) => {
				customerData = customerData[0];
				orderData = orderData[0];
				this.setState({
					...this.state,
					concreteOrder: {
						orderId: orderData.order_id,
						customerId: orderData.customer_id,
						customerName: customerData.customer_name,
						customerSurname: customerData.customer_surname,
						orderDate: moment(orderData.order_date).format("YYYY-MM-DD"),
						advancePayment: orderData.paid_upfront,
						totalPrice: orderData.total_price,
						bookNumber: orderData.book_number,
						note: orderData.note,
						status: ((orderData.status === 1) ? "Open" : "Closed")
					}
				}, () => {
					this.toggleModal();
				})
			})
		})
	}

	fetchData() {
		fetch(`${this.props.api}order/get/all`, {
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
				fetch(`${this.props.api}customer/get/${element.customer_id}`, {
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
						order_date: moment(element.order_date).format("DD.MM.YYYY"),
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
			{title: "[ID] Customer", prop: "customer", filterable: true},
			{title: "Date", prop: "order_date", filterable: true},
			{title: "Advance payment", prop: "advance_payment", filterable: true, sortable: true},
			{title: "Total Price", prop: "total_price", filterable: true, sortable: true},
			{title: "Book Number", prop: "book_number", filterable: true, sortable: true},
			{title: "Status", prop: "status", filterable: true, sortable: true},
		];

		let id = null;
		if(this.state.concreteOrder != null) {
			id = this.state.concreteOrder.orderId
		}

		return (
			<div>
				<Modal size="lg" show={this.state.showOrderModal} onHide={this.toggleModal}>
					<Modal.Header closeButton>
						<Modal.Title>Edit Order</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={this.handleSubmit}>
							<Form.Row>
								<Form.Group as={Col} controlId="formOrderId">
									<Form.Label>Order ID</Form.Label>
									<Form.Control name="order_id" type="text" placeholder="ID" readOnly defaultValue={this.state.concreteOrder.orderId} />
								</Form.Group>
								<Form.Group as={Col} controlId="formOrderCustomerId">
									<Form.Label>Customer ID</Form.Label>
									<Form.Control name="customer_id" type="text" placeholder="Customer ID" readOnly defaultValue={this.state.concreteOrder.customerId} />
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formOrderCustomerName">
									<Form.Label>Name</Form.Label>
									<Form.Control name="customer_name" type="text" placeholder="Customer's name" readOnly defaultValue={this.state.concreteOrder.customerName} />
								</Form.Group>
								<Form.Group as={Col} controlId="formOrderCustomerSurname">
									<Form.Label>Surname</Form.Label>
									<Form.Control name="customer_surname" type="text" placeholder="Customer's surname" readOnly defaultValue={this.state.concreteOrder.customerSurname} />
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formOrderDate">
									<Form.Label>Date</Form.Label>
									<Form.Control name="order_date" type="date" placeholder="e.g.: 2020-03-12" defaultValue={this.state.concreteOrder.orderDate} />
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formOrderAdvancePayment">
									<Form.Label>Advance payment</Form.Label>
									<Form.Control name="advance_payment" type="number" placeholder="e.g.: 50" defaultValue={this.state.concreteOrder.advancePayment}  />
								</Form.Group>
								<Form.Group as={Col} controlId="formOrderTotalPrice">
									<Form.Label>Total price</Form.Label>
									<Form.Control name="total_price" type="number" placeholder="e.g.: 100" defaultValue={this.state.concreteOrder.totalPrice} />
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formOrderBookNumber">
									<Form.Label>Book Number</Form.Label>
									<Form.Control name="book_number" type="number" placeholder="e.g.: 5" defaultValue={this.state.concreteOrder.bookNumber} />
								</Form.Group>
								<Form.Group as={Col} controlId="formOrderStatus">
									<Form.Label>Status</Form.Label>
									<Form.Control name="status" as="select" defaultValue={this.state.concreteOrder.status}>
										<option>Open</option>
										<option>Closed</option>
									</Form.Control>
								</Form.Group>
							</Form.Row>
							<Form.Row>
								<Form.Group as={Col} controlId="formOrderNote">
									<Form.Label>Note</Form.Label>
									<Form.Control name="note" as="textarea" rows="4" placeholder="Enter a note..." defaultValue={this.state.concreteOrder.note} />
								</Form.Group>
							</Form.Row>
							<Form.Row className="float-right">
								<Button variant="success" type="submit" name="submit">Save</Button>
								<Button className="ml-1" variant="danger" onClick={() => this.handleDelete(id)}>Delete</Button>
								<Button className="ml-1" variant="secondary" onClick={this.toggleModal}>Close</Button>
							</Form.Row>
						</Form>
					</Modal.Body>
				</Modal>
				<Navigation />
				<Navbar bg="secondary" size="small">
					<Navbar.Brand className="text-light">Orders</Navbar.Brand>
					<Nav className="mr-auto">
						<Button variant="info" href="/order/new">New order</Button>
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
								onRowClick={this.onRowClick}
								classes={{
									controlRow: "mb-3",
									filterClearButton: "btn-secondary",
									paginationOptsFormText: "mr-2 ml-2",
									paginationButton: "btn-secondary",
									table: "table-striped table-hover",
									initialSort: "order_id",
									isAscending: true
								}} />
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

export default Order;
