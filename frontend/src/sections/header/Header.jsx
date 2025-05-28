import React from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate()


    return (
        <div className='header'>
            <div className="header-img"></div>
            <div className="header-content">
                <h1>SUMMER TIME COLLECTION </h1>
                <p>Catch our best for the summer fits</p>
                <button onClick={()=> navigate('/collection/featured')}>Discover</button>
            </div>
        </div>
    );
};

export default Header;