import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Container, Row, Col } from "react-bootstrap";

function Search(props) {
  this.state = {};

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

// class NameForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { value: "" };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({ value: event.target.value });
//   }

//   handleSubmit(event) {
//     alert("A name was submitted: " + this.state.value);
//     event.preventDefault();
//   }

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <label>
//           Name:
//           <input
//             type="text"
//             value={this.state.value}
//             onChange={this.handleChange}
//           />
//         </label>
//         <input type="submit" value="Submit" />
//       </form>
//     );
//   }
// }
