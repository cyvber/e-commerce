import React from 'react';
import { useSelector } from 'react-redux';
import './CategoryList.css';
import { Link } from 'react-router-dom';
import menImage from '../../assets/imgs/category-mn.png';
import womenImage from '../../assets/imgs/category-wmn.png';

const CategoryList = ({ gender }) => {
  const groupedTypes = useSelector((state) => state.productTypes.data);
  const categories = groupedTypes?.[gender] || { clothing: [], accessories: [] };

  const image = gender === 'men' ? menImage : womenImage;

  return (
    <div className="category-dropdown">
      <div className="category-content">
        <div className="category-columns">
          {['clothing', 'accessories'].map((cat) => (
            <div key={cat} className="category-group">
              <Link to={`/collection/${gender}/${cat}`} className="category-title">
                {cat.toUpperCase()}
              </Link>
              {categories[cat].map((type) => (
                <Link key={type} to={`/collection/${gender}/${cat}/${type}`} className="category-link">
                  {type}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="category-image">
          <img src={image} alt={`${gender} category`} />
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
