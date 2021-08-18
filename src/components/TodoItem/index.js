import React, { Component } from "react";
import "./index.css";

export default class TodoItem extends Component {
  state = {};

  render() {
    return (
      <ul>
        {this.props.todoList.map((todo, index) => (
          <React.Fragment key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => this.props.isChecked(todo.id)}
            ></input>
            <li className={todo.completed ? "done" : ""}> {todo.title} </li>
            <button name="checks" onClick={() => this.props.deleteBtn(todo.id)}>
              &times;
            </button>
            <br />
          </React.Fragment>
        ))}
      </ul>
    );
  }
}
