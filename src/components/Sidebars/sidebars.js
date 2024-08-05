import React from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import "./sidebars.css";

function Sidebars() {
  return (
    <div className="sidebar flex-shrink-0 p-3">
      <a
        href="/"
        className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom"
      >
        <svg className="bi pe-none me-2" width="30" height="24">
          <use href="#bootstrap"></use>
        </svg>
        <span className="fs-5 fw-semibold">Collapsible</span>
      </a>
      <Nav className="flex-column">
        <NavDropdown title="Home" id="home-collapse">
          <NavDropdown.Item href="#">Overview</NavDropdown.Item>
          <NavDropdown.Item href="#">Updates</NavDropdown.Item>
          <NavDropdown.Item href="#">Reports</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Dashboard" id="dashboard-collapse">
          <NavDropdown.Item href="#">Overview</NavDropdown.Item>
          <NavDropdown.Item href="#">Weekly</NavDropdown.Item>
          <NavDropdown.Item href="#">Monthly</NavDropdown.Item>
          <NavDropdown.Item href="#">Annually</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Orders" id="orders-collapse">
          <NavDropdown.Item href="#">New</NavDropdown.Item>
          <NavDropdown.Item href="#">Processed</NavDropdown.Item>
          <NavDropdown.Item href="#">Shipped</NavDropdown.Item>
          <NavDropdown.Item href="#">Returned</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown.Divider />
        <NavDropdown title="Account" id="account-collapse">
          <NavDropdown.Item href="#">New...</NavDropdown.Item>
          <NavDropdown.Item href="#">Profile</NavDropdown.Item>
          <NavDropdown.Item href="#">Settings</NavDropdown.Item>
          <NavDropdown.Item href="#">Sign out</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </div>
  );
}

export default Sidebars;
