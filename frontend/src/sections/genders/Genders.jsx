// components/genders/Genders.jsx
import React from 'react';
import './Genders.css';
import men from '../../assets/imgs/category-mn.png';
import women from '../../assets/imgs/category-wmn.png';
import { useNavigate } from 'react-router-dom';

const Genders = () => {
    const navigate = useNavigate()


  return (
    <div className="genders-container">
      <div className="gender-card">
        <img src={men} alt="Men Category" className="gender-image" />
        <div className="gender-overlay">
          <h2>For Men</h2>
          <button onClick={()=> navigate('/collection/men')} className="discover-btn">Discover</button>
        </div>
      </div>
      <div className="gender-card">
        <img src={women} alt="Women Category" className="gender-image" />
        <div className="gender-overlay">
          <h2>For Women</h2>
          <button onClick={()=> navigate('/collection/men')} className="discover-btn">Discover</button>
        </div>
      </div>
    </div>
  );
};

export default Genders;
