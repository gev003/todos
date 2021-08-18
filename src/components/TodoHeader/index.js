import { Component, createRef } from "react";
import React from "react";
import "./index.css";

export default class TodoHeader extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  render() {
    return (
      <form
        className="form"
        onSubmit={(evt) => {
          evt.preventDefault();
          this.props.sub(this.inputRef.current.value);
        }}
      >
        <input
          type="number"
          placeholder="Num"
          max="20"
          min="1"
          ref={this.inputRef}
        ></input>
        <button type="submit">Add</button>
      </form>
    );
  }
}
