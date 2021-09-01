import React, {useState} from 'react';
import {Button} from "@material-ui/core";
import './category-item.css'

const CategoryItem = ({item}) => {
    const [state, setState] = useState(false)

    // function handle click to arrow which opens details and close it
    const handleClick = () => {
        setState(prevState => !prevState)
    }

    return (
        <div className='category-single-item'>
            <div className='item-image' style={{backgroundImage: `url(${item.image})`}}></div>
            <div className={state ? `item-details opened` : `item-details`}>
                <div className={state ? `toggle-button top` : `toggle-button`} onClick={handleClick}>↓</div>
                <div className='item-title'>{item.title}</div>
                <div className='item-desc'>{item.description}</div>
                <Button variant="contained" color="primary" className='item-button'>Got for it!</Button>
            </div>
        </div>
    );
};

export default CategoryItem;