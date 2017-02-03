import React, { Component } from 'react';
// import Scroll from 'react-scroll';

import MealCard from './MealCard';
import Nav from './Nav'
import Search from './Search'

import './Menu.css';
import './CategoryCard.css';
import menu from '../menu.json';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: menu.categories,
      totalPrice: 0,
      basketMealUuids: {},
      showBasket: false
    };
  }

  getTotalBasketItems = () => {
    let totalItems = 0;
     Object.keys(this.state.basketMealUuids).forEach(meal => {
       totalItems += this.state.basketMealUuids[meal].counter;
     });
    return totalItems;
  };

  searchMeal = (query) => {
    if (!query && !query.length) {
      this.setState({categories: menu.categories});
      return;
    }

    query = query.toLowerCase();

    const covert = (meals) => {
      return meals.filter((meal) => {
        return meal.name.toLocaleLowerCase().includes(query) || meal.description.toLocaleLowerCase().includes(query)
      })
    };

    let updatedCategory = [];
    menu.categories.forEach((category) => {
      updatedCategory.push({
        key: category.key,
        categoryDescription: category.categoryDescription,
        meals: covert(category.meals)
      })
    });

    this.setState({categories: updatedCategory});
  };

  updateMealCounter = () => {
    const addedMealUuids = this.state.basketMealUuids;
    this.state.categories.forEach(category => {
      category.meals.forEach(meal => {
        meal.counter = (addedMealUuids[meal.mealUuid] && addedMealUuids[meal.mealUuid].counter) || '';
      })
    });
    this.setState({categories: this.state.categories});

  };

  addMeal = (meal) => {
    const price = this.state.totalPrice + meal.price;
    this.setState({totalPrice: price});
    let updatedMealUuids = null;

    if (this.state.basketMealUuids[meal.mealUuid]) {
      updatedMealUuids = Object.assign({}, this.state.basketMealUuids);
      updatedMealUuids[meal.mealUuid].counter += 1;
    } else {
      const addedMeal = {
        [meal.mealUuid]: {
          name: meal.name,
          mealUuid: meal.mealUuid,
          counter: 1
        }
      };
      updatedMealUuids = Object.assign(this.state.basketMealUuids, addedMeal);
    }

    this.setState({basketMealUuids: updatedMealUuids}, () => {
      this.updateMealCounter();
    });
  };

  onFootClicked = (e) => {
    e.preventDefault();
    this.setState({showBasket: !this.state.showBasket});
  };

  // componentDidMount() {
  // }

  render() {
    const nav = this.state.categories.map((x) => x.key);
    const categories = this.state.categories;
    const totalItems = this.getTotalBasketItems();
    const basketMealUuidsProps = Object.keys(this.state.basketMealUuids);

    const basketDetails = this.state.showBasket &&
      basketMealUuidsProps.map((meal) => {
        const currentMeal = this.state.basketMealUuids[meal];
        return <div
          className="basket-detail"
          style={{display: (this.state.showBasket ? 'flex' : 'none')}}
          key={currentMeal.mealUuid}
        >
            <div className="basket-detail__meal-name">{currentMeal.name}</div>
            <div className="basket-detail__meal-number">{currentMeal.counter}</div>
          </div>;
      });

    const basketFoot = this.state.totalPrice > 0 &&
      <div
        className="basket-footer"
        onClick={this.onFootClicked}
      >
        {basketDetails}
        <div className="basket-footer-wrapper">
          <div className="basket-footer-text">Total {totalItems} item{totalItems > 1 && 's' }</div>
          <div className="basket-footer-text">£{this.state.totalPrice}</div>
        </div>
      </div>;

    return (
      <div className="app-content">
        <div className="left-container">
          <Search searchMeal={this.searchMeal}/>
          <div className="nav-panel">
            <div className="nav-header">menu</div>
            <Nav nav={nav} />
          </div>
        </div>
        <div className="menu-panel">
          {categories.map((category) =>
            <div
              key={category.key}
              classID={category.key}
              className="categories-card"
            >
              <div className="category-card">
                <div className="category-card__header">
                  <div className="category-card__header-title">{category.key}</div>
                </div>
                {category.meals.map((meal) =>
                  <MealCard
                    key={meal.mealUuid.toString()}
                    meal={meal}
                    addMeal={this.addMeal}
                  />
                )}
              </div>
              {basketFoot}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Menu;
