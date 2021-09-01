import React, {useState} from 'react';
import Cookies from 'universal-cookie';
import CategoryItem from "../category-item/category-item";
import {Button} from "@material-ui/core";
import './main-container.css'
import axios from "axios";
import {Categories} from "../../const";

const cookies = new Cookies();

const MainContainer = () => {
    // check if we already knows category and items in it
    const currentCategory = cookies.get('category');

    const [state, setState] = useState({
            initialState: false,
            currentCategory: '',
            loading: false, // for showing loader while we fetch data
            categoryItems: [],
            filtered: false,
            filteredItems: [],
        }
    );
    if (!currentCategory) {
        setState({...state, initialState: true});
    }

    // check if we have category from cookies
    if ((state.categoryItems.length < 1) && currentCategory) {
        axios.get(`https://run.mocky.io/v3/${Categories[currentCategory]}`).then(({data}) => {
            const ids = data.slice().map(item => item.id);
            const filtered = data.slice().filter(({id}, index) => !ids.includes(id, index + 1));

            //set cookies with data to render it after page updates
            cookies.set('category-items', data, {path: '/'});
            setState({
                ...state,
                loading: false,
                categoryItems: data,
                filteredItems: filtered,
                initialState: false
            });
        });
    }

    // function handle click on category names, fetch necessary data and change state for rendering new category items
    const handleChangeCategory = (category) => {
        // set new cookie for category
        cookies.set('category', category, { path: '/' });

        // start spinner
        setState({...state, loading: true})

        //fetch data
        axios.get(`https://run.mocky.io/v3/${Categories[category]}`).then(({data}) => {
                const ids = data.slice().map(item => item.id);
                const filtered = data.slice().filter(({id}, index) => !ids.includes(id, index + 1));

                //set cookies with data to render it after page updates
                cookies.set('category-items', data, { path: '/' });
                setState({
                    ...state,
                    currentCategory: category,
                    loading: false,
                    categoryItems: data,
                    filteredItems: filtered,
                    initialState: false
                });
        });
    }

    // have not finished filtered render
    const handleFilterClick = (evt) => {
        setState({...state, filtered: evt.target.checked});
    }

    return (
        <div>
            <h2 className='header'>{state.currentCategory || cookies.get('category')}</h2>
            <div className='main-buttons'>
                <Button variant="contained" color="primary" onClick={() => handleChangeCategory('Pets')}>Pets</Button>
                <Button variant="contained" color="primary" onClick={() => handleChangeCategory('Food')}>Food</Button>
                <Button variant="contained" color="primary"
                        onClick={() => handleChangeCategory('Plants')}>Plants</Button>
            </div>
            {/*<div className='filter-checkbox'>*/}
            {/*    <input type="checkbox" id="filter" name="filter" onClick={handleFilterClick} checked={state.filtered}/>*/}
            {/*    <label htmlFor="filter">Filter duplicates</label>*/}
            {/*</div>*/}
            {state.initialState && <div>Please choose category</div>}
            {state.loading && <div className="loader">Loading...</div>}
            <div className='category-items'>
                {state.categoryItems.map((item) => {
                        return (
                            <CategoryItem item={item} key={item.id}/>
                        )
                    })}
            </div>
        </div>
    );
};

export default MainContainer;