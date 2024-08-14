import React, { Component } from "react";

class LikeButton extends Component {
  state = {
    isLiked: false,
  };

  handleClick = () => {
    this.setState({ isLiked: !this.state.isLiked });
  };
  render() {
    const { isLiked } = this.state;
    return (
      <button onClick={this.handleClick} className="btn btn-light">
        <i
          className={isLiked ? "fa fa-heart" : "fa fa-heart-o"}
        ></i>
      </button>
    );
  }
}

export default LikeButton;