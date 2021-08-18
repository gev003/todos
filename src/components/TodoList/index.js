import { Component } from "react";
import TodoItem from "../TodoItem";

export default class TodoList extends Component {
  render() {
    return (
      <div>
        <TodoItem
          todoList={this.props.todos}
          deleteBtn={this.props.deleteBtn}
          isChecked={this.props.isChecked}
        />
      </div>
    );
  }
}
