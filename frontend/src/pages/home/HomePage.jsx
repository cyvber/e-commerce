import React from 'react';
import './HomePage.css'
import Header from '../../sections/header/Header';
import Featured from '../../sections/featured/Featured';
import Genders from '../../sections/genders/Genders';

const HomePage = () => {
    return (
        <div className='home'>
            <Header />
            <Featured title="Featured Products" purpose="featured" />
            <Featured title="Discounts" purpose="discount" />
            <Featured title="Best Sellers" purpose="best" />
            <Genders />
        </div>
    );
};

export default HomePage;