import React, {useState} from 'react';
import CategoryItem from "../category-item/category-item";
import {Button} from "@material-ui/core";
import './main-container.css'
import axios from "axios";
import {defaultItems, Categories} from "../../const";


const MainContainer = () => {

    const [state, setState] = useState({
            currentCategory: 'Pets',
            loading: false, // for showing loader while we fetch data
            categoryItems: defaultItems, // default category is Pets, so we show it's items before fetching any other data
            filtered: false,
            filteredItems: [],
        }
    );


    // function handle click on category names, fetch necessary data and change state for rendering new category items
    const handleChangeCategory = (category) => {
        setState({...state, loading: true, currentCategory: category})
        axios.get(`https://run.mocky.io/v3/${Categories[category]}`).then(({data}) => {
            setState({...state, loading: false, categoryItems: data});
        });
    }

    const handleFilterClick = (evt) => {
        const ids = state.categoryItems.map(item => item.id);
        const filtered = state.categoryItems.filter(({id}, index) => !ids.includes(id, index + 1));
        setState({...state, filtered: evt.target.checked, filteredItems: filtered});
    }

    return (
        <div>
            <h2 className='header'>{state.currentCategory}</h2>
            <div className='main-buttons'>
                <Button variant="contained" color="primary" onClick={() => handleChangeCategory('Pets')}>Pets</Button>
                <Button variant="contained" color="primary" onClick={() => handleChangeCategory('Food')}>Food</Button>
                <Button variant="contained" color="primary"
                        onClick={() => handleChangeCategory('Plants')}>Plants</Button>
            </div>
            <div className='filter-checkbox'>
                <input type="checkbox" id="filter" name="filter" onClick={handleFilterClick} checked={state.filtered}/>
                <label htmlFor="filter">Filter duplicates</label>
            </div>
            <div className='category-items'>
                {state.loading ? (<div className="loader">Loading...</div>) : // if loading - shows loader spinner
                    state.categoryItems.map((item) => {
                        return (
                            <CategoryItem item={item} key={item.id}/>
                        )
                    })}

            </div>
        </div>
    );
};

export default MainContainer;