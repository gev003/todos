import { Component } from "react";
import "./index.css";

export default class TodoBottom extends Component {
  findTrue = () => {
    let { todos } = this.props;
    let final = [];
    todos.forEach((element) => {
      if (element.completed === true) {
        final.push(element.completed);
      }
    });
    return final.length;
  };

  render() {
    return (
      <div>
        <span>
          {this.findTrue()} / {this.props.todos.length}
        </span>
        <button onClick={this.props.clearCompleted} name="clear">
          Clear Completed
        </button>
      </div>
    );
  }
}
