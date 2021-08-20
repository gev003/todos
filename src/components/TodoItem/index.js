import React, { Component, createRef } from "react";
import "./index.css";
import Modal from "./Modal/Modal";

export default class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      todoTitle: null,
      disableContent: false,
      disabledDiv: false,
    };

    this.inputRef = React.createRef();
    this.editableItemID = null;
  }

  setUpdateVal = (inputVal) => {
    this.props.setUpdatedValue(inputVal, this.editableItemID);
  };

  render() {
    return (
      <>
        <ul>
          {this.props.todoList.map((todo, index) => (
            <React.Fragment key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => this.props.isChecked(todo.id)}
              ></input>
              <li ref={this.inputRef} className={todo.completed ? "done" : ""}>
                {todo.title}
              </li>
              <button
                name="checks"
                onClick={() => this.props.deleteBtn(todo.id)}
              >
                &times;
              </button>
              <button
                name="checks"
                onClick={() => {
                  this.setState({
                    modalIsOpen: true,
                    todotitle: todo.title,
                    disableContent: true,
                    disabledDiv: true,
                  });
                  this.editableItemID = todo.id;
                }}
              >
                &#9998;
              </button>
              <br />
            </React.Fragment>
          ))}
        </ul>
        <Modal
          finalState={this.state}
          changeState={() => {
            this.setState({ modalIsOpen: false, disableContent: false });
          }}
          setUpdateVal={this.setUpdateVal}
        />
      </>
    );
  }
}
