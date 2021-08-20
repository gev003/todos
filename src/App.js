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
    let initial = localStorage.getItem("initialTodos");
    if (!initial) {
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
    } else {
      this.setState({ initialDotos: [...JSON.parse(initial)] });
    }
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
      filteredResult: null,
    });
  };

  deleteBtn = (id) => {
    if (this.state.filteredResult) {
      const filt = [...this.state.filteredResult];
      let filtTodos = [...filt.filter((todo) => todo.id !== id)];
      this.setState({
        filteredResult: filtTodos,
      });
    }

    // if (this.state.filteredResult.length < 1) {
    //   this.setState({ emptySearchResult: true });
    // }

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
    if (this.state.filteredResult) {
      const filt = [...this.state.filteredResult];
      let filtTodos = [...filt.filter((todo) => !todo.completed)];
      this.setState({
        filteredResult: filtTodos,
      });
    }

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
          filteredResult: null,
          initialDotos: [...this.state.initialDotos, ...response],
        });
      });
  };

  checkString = (searchText) => {
    let result = this.state.initialDotos.filter((current) =>
      current.title.includes(searchText)
    );

    if (result.length) {
      this.setState({ filteredResult: result, emptySearchResult: false });
    } else {
      this.setState({ filteredResult: null, emptySearchResult: true });
    }
  };

  setNewValues = (inputVal, id) => {
    const sameItem = this.state.initialDotos.find((obj) => {
      return obj.id === id;
    });
    sameItem.title = inputVal;
    this.setState({ initialDotos: [...this.state.initialDotos] }, () =>
      localStorage.setItem(
        "initialTodos",
        JSON.stringify(this.state.initialDotos)
      )
    );
  };

  componentDidUpdate(prevProps, prevstate) {
    if (prevstate.initialDotos.length !== this.state.initialDotos.length) {
      localStorage.setItem(
        "initialTodos",
        JSON.stringify(this.state.initialDotos)
      );
    }
  }

  render() {
    return (
      <div className="App">
        <form>
          <input
            onChange={(e) => {
              e.preventDefault();
              this.checkString(this.inputRef.current.value);
            }}
            type="text"
            placeholder="Enter text to Search"
            ref={this.inputRef}
          ></input>
        </form>
        <TodoHeader sub={this.inputSubmit} /> <hr />
        <TodoForm inputValue={this.renderState} />
        {!this.state.initialDotos.length ? (
          <div>No Todos To Show</div>
        ) : (
          <>
            {!this.state.emptySearchResult && (
              <TodoList
                todos={this.state.filteredResult || this.state.initialDotos}
                deleteBtn={this.deleteBtn}
                isChecked={this.isChecked}
                setUpdatedValue={this.setNewValues}
              />
            )}
          </>
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
