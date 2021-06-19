import React from "react";
import { Link } from "react-router-dom";

export default class Main extends React.PureComponent {
  render() {
    return (
      <div>
        <p>Main</p>
        <br />
        <nav>
          <Link to="/about">About</Link>
        </nav>
      </div>
    );
  }
}
