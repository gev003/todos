import React, { Component, createRef } from "react";
import "./Modal.css";

export default class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleBtn: false,
    };

    this.inputRef = React.createRef();
    this.buttonRef = React.createRef();
  }

  toggle = () => {
    this.inputRef.current.disabled = false;
    this.inputRef.current.focus();
    this.buttonRef.current.style.display = "none";
    this.setState({ toggleBtn: true });
  };

  show = () => {
    this.setState({ toggleBtn: false });
    this.inputRef.current.disabled = true;
    this.buttonRef.current.style.display = "inline-block";
  };

  setValue = () => {
    this.props.setUpdateVal(this.inputRef.current.value);
    this.props.changeState();
    this.setState({ toggleBtn: false });
  };

  render() {
    // console.log(this.inputRef);
    return (
      <React.Fragment>
        {this.props.finalState.modalIsOpen && (
          <div className="modal">
            <input
              disabled
              type="text"
              ref={this.inputRef}
              defaultValue={this.props.finalState.todotitle}
            ></input>
            <button
              className="btn"
              name="checks"
              onClick={() => {
                this.props.changeState();
                this.setState({ toggleBtn: false });
              }}
            >
              X
            </button>
            <button ref={this.buttonRef} name="checks" onClick={this.toggle}>
              &#9998;
            </button>
            {this.state.toggleBtn && (
              <>
                <button name="checks" onClick={this.setValue}>
                  &#10003;
                </button>{" "}
                <button name="checks" onClick={this.show}>
                  &#10006;
                </button>
              </>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}
