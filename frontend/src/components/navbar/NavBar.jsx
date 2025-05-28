import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // ✅ Import Link
import './NavBar.css';
import user_outline from '../../assets/icons/user-outline.png';
import user_filled from '../../assets/icons/user-filled.png';
import bag_outline from '../../assets/icons/bag-outline.png';
import bag_filled from '../../assets/icons/bag-filled.png';
import CategoryList from '../category-list/CategoryList';

const NavBar = () => {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredLink, setHoveredLink] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMouseEnter = (link) => {
        setHoveredLink(link);
    };

    const handleMouseLeave = () => {
        setHoveredLink('');
    };

    const shouldApplyScrolledStyle =
        isScrolled ||
        hoveredLink === 'MEN' ||
        hoveredLink === 'WOMEN' ||
        location.pathname !== '/';

    return (
        <div className={`navbar ${shouldApplyScrolledStyle ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <div className="navbar-links">
                    {/* SHOP */}
                    <Link to="/" className="nav-link">
                        <p>SHOP</p>
                    </Link>

                    {/* MEN */}
                    <div
                        className="nav-hover-wrapper"
                        onMouseEnter={() => handleMouseEnter('MEN')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link to="/collection/men/clothing" className="nav-link">
                            <p>MEN</p>
                        </Link>
                        {hoveredLink === 'MEN' && <CategoryList gender="men" />}
                    </div>

                    {/* WOMEN */}
                    <div
                        className="nav-hover-wrapper"
                        onMouseEnter={() => handleMouseEnter('WOMEN')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link to="/collection/women/clothing" className="nav-link">
                            <p>WOMEN</p>
                        </Link>
                        {hoveredLink === 'WOMEN' && <CategoryList gender="women" />}
                    </div>

                    {/* FEATURED */}
                    <Link to="/collection/featured" className="nav-link">
                        <p>FEATURED</p>
                    </Link>
                </div>

                <div className="navbar-title-container">
                    <div className="navbar-title">
                        <h1>ALPHA</h1>
                    </div>
                </div>

                <div className="navbar-icons">
                    <div className="icon-wrapper">
                        <img src={user_outline} alt='account' className='icon icon-outline' />
                        <img src={user_filled} alt='account-filled' className='icon icon-filled' />
                    </div>
                    <Link to="/cart" className="icon-wrapper">
                        <img src={bag_outline} alt='bag' className='icon icon-outline ' />
                        <img src={bag_filled} alt='bag-filled' className='icon icon-filled' />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
