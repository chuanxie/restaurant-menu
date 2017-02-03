import React, { Component } from 'react';
import './Search.css'

class Search extends Component {
  handleSearch = (event) => {
    this.props.searchMeal(event.target.value)
  };

  render() {
    return (
      <div className="search-panel">
        <input
          className="search-panel__input"
          type="text"
          placeholder="Search Meals"
          onKeyUp={this.handleSearch}
        />
      </div>
    );
  }
}

export default Search;
