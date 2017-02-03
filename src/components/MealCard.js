import React, { Component } from 'react';
import './MenuCard.css'

class MealCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: props.meal
    };
  }

  addMeal = (mealUuid, name, price) => {
    this.props.addMeal({
      mealUuid,
      name,
      price
    });
  };

  render() {
    const meal = this.state.meal;
    const divStyle = {
      backgroundImage: 'url(' + meal.primaryImageUrl +')'
    };

    const mealCounter = meal.counter > 0 ?
      <div className="menu-card__meal-counter">{meal.counter}</div> : null;


    return (
      <div
        className="menu-card"
      >
        <div className="menu-card__meal-content">
          <span className="menu-card__meal-name">{meal.name}</span>
          <span className="menu-card__meal-des">{meal.description}</span>
          <div className="menu-card__meal-price-row">
            <div className="menu-card__meal-price">£{meal.price}</div>
            {mealCounter}
            <div
              className="menu-card__add"
              onClick={() => this.addMeal(meal.mealUuid, meal.name, meal.price)}
            >+</div>
          </div>
        </div>
        <div
          className="menu-card__meal-img"
          style={divStyle}
        ></div>
      </div>
    );
  }
}

export default MealCard;
