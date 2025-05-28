import React, { useContext, useState } from 'react';
import './Featured.css';
import { ShopContext } from '../../context/ShopContext';
import Item from '../../components/item/Item';

const Featured = ({ title, purpose }) => {
  const { featuredProducts, bestSellers, discountProducts } = useContext(ShopContext);

  const [genderFilter, setGenderFilter] = useState(null); // null, 'Men', or 'Women'

  let selectedProducts = [];
  if (purpose === 'best') {
    selectedProducts = bestSellers;
  } else if (purpose === 'discount') {
    selectedProducts = discountProducts;
  } else {
    selectedProducts = featuredProducts;
  }

  if (genderFilter) {
    selectedProducts = selectedProducts.filter(p => p.gender === genderFilter);
  }

  return (
    <div className="featured-section">
      <h2 className="featured-title">{title}</h2>

      <div className="gender-buttons">
        <button
          className={genderFilter === 'men' ? 'active' : ''}
          onClick={() => setGenderFilter('men')}
        >
          Men
        </button>
        <button
          className={genderFilter === 'women' ? 'active' : ''}
          onClick={() => setGenderFilter('women')}
        >
          Women
        </button>
      </div>

      <div className="featured-grid">
        {selectedProducts.slice(0, 4).map(product => (
          <Item key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
