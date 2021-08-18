import "./App.css";
import React, { Component } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodoBottom from "./components/TodoBottom";
import TodoHeader from "./components/TodoHeader";

const karlos = [
  {
    title: "Learn CSS",
    completed: false,
  },
  {
    title: "Learn JS",
    completed: false,
  },
  {
    title: "Learn ReactJS",
    completed: false,
  },
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialDotos: [],
      filteredResult: null,
    };

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/todos?_limit=5";
    fetch(url)
      .then((stream) => stream.json())
      .then((response) => {
        karlos.forEach((item) => {
          item.id =
            Date.now().toString(36) + Math.random().toString(36).substr(2);
        });
        this.setState({
          initialDotos: [...response, ...karlos],
        });
      });
  }

  renderState = (val) => {
    this.setState({
      initialDotos: [
        ...this.state.initialDotos,
        {
          id: this.state.initialDotos.length
            ? this.state.initialDotos[this.state.initialDotos.length - 1].id + 1
            : 1,
          title: val,
          completed: false,
        },
      ],
    });
  };

  deleteBtn = (id) => {
    const prevState = [...this.state.initialDotos];
    let filteredTodos = [...prevState.filter((todo) => todo.id !== id)];
    this.setState({
      initialDotos: filteredTodos,
    });
  };

  isChecked = (id) => {
    const val = this.state.initialDotos.find((valid) => {
      return valid.id === id;
    });
    val.completed = !val.completed;
    this.setState({ val });
  };

  clearCompleted = () => {
    const previousState = [...this.state.initialDotos];
    let filteredArray = [...previousState.filter((todo) => !todo.completed)];
    this.setState({
      initialDotos: filteredArray,
    });
  };

  inputSubmit = (val) => {
    fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${val}`)
      .then((stream) => stream.json())
      .then((response) => {
        response.forEach((elem) => {
          elem.id =
            Date.now().toString(36) + Math.random().toString(36).substr(2);
        });
        this.setState({
          initialDotos: [...this.state.initialDotos, ...response],
        });
      });
  };

  checkString = (arr, searchText) => {
    let result = arr.filter((obj) => {
      const values = Object.values(obj);
      for (let i = 0; i < values.length; i++) {
        if (("" + values[i]).search(searchText) !== -1) {
          return true;
        }
      }
      return false;
    });

    if (result.length) {
      this.setState({ filteredResult: result, emptySearchResult: null });
    } else {
      this.setState({ filteredResult: [], emptySearchResult: true });
    }
  };

  // componentDidUpdate(prevProps, prevstate) {
  //   setTimeout(() => {
  //     if (this.inputRef.current.value === "") {
  //       this.setState({ initialDotos: [...prevstate] });
  //     }
  //   }, 1000);
  // }

  render() {
    return (
      <div className="App">
        <form>
          <input
            onChange={(e) => {
              e.preventDefault();
              this.checkString(
                this.state.initialDotos,
                this.inputRef.current.value
              );
            }}
            type="text"
            placeholder="Enter some text"
            ref={this.inputRef}
          ></input>
        </form>
        <TodoHeader sub={this.inputSubmit} /> <hr />
        <TodoForm inputValue={this.renderState} />
        {!this.state.initialDotos.length ? (
          <div>No Todos To Show</div>
        ) : (
          <TodoList
            todos={this.state.filteredResult || this.state.initialDotos}
            deleteBtn={this.deleteBtn}
            isChecked={this.isChecked}
          />
        )}
        {this.state.emptySearchResult && <div>No Search Result</div>}
        <TodoBottom
          todos={this.state.initialDotos}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}
