import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Container, Row, Col } from "react-bootstrap";

function Search(props) {
  return (
    <div>
      <Form
      // onChange={(event) => {
      //   setUsername(event.target.value);
      // }}
      >
        <Form.Group controlId="stock-search">
          <Form.Label>Search NYSE</Form.Label>
          <Form.Control type="stock-search" placeholder="TSLA" />
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Search;
