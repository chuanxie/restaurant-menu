import React, { Component } from 'react';
import './Nav.css'

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: props.nav
    };
  }

  render() {
    const nav = this.state.nav.map((categoryName) =>
      <li
        key={categoryName}
        className="nav-item"
      >{categoryName}</li>
    );
    return (
      <ul className="nav-items">{nav}</ul>
    );
  }
}

export default Nav;
