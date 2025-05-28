import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="item-card-link"
    >
      <div className="item-card">
        <div className="item-image">
          <img src={product.images[0]} alt={product.name} />
        </div>
        <div className="item-details">
          <h3 className="item-name">{product.name}</h3>
          <div className="price-container">
            {product.oldPrice && (
              <span className="item-old-price">${product.oldPrice}</span>
            )}
            <span className="item-price">${product.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Item;
