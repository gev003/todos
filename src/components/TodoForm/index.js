import { Component } from "react";
import React from "react";
import "./index.css";

export default class TodoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.inputValue(this.state.value);
          //   this.inputRef.current.value = null;
          this.setState({ value: "" });

          this.inputRef.current.focus();
        }}
      >
        <input
          type="text"
          value={this.state.value}
          ref={this.inputRef}
          placeholder="Enter Some Text"
          onChange={(evt) => {
            this.setState({ value: evt.target.value });
          }}
        ></input>
        <button type="submit" disabled={!this.state.value}>
          Add
        </button>
      </form>
    );
  }
}
