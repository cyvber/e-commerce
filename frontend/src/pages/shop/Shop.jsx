// src/pages/Shop.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Item from '../../components/item/Item';
import { ShopContext } from '../../context/ShopContext';
import './Shop.css';

const Shop = () => {
    const { gender, category: paramCategory, type } = useParams();
  const [sortOption, setSortOption] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [featuredGender, setFeaturedGender] = useState('');
  const { products, featuredProducts } = useContext(ShopContext);
  const navigate = useNavigate();
  const groupedTypes = useSelector((state) => state.productTypes.data);

  const category = paramCategory; 
  const categoryTypes = category
  ? groupedTypes?.[gender]?.[category] || []
  : Object.values(groupedTypes?.[gender] || {}).flat();


  useEffect(() => {
    if (!products) return;
  
    let result = [];
  
    if (gender === 'featured') {
      result = featuredProducts || [];
      if (featuredGender) {
        result = result.filter((product) => product.gender === featuredGender);
      }
    } else {
      if (!gender) return;
      result = products.filter((product) => product.gender === gender);
  
      if (category) result = result.filter((product) => product.category === category);
      if (type) result = result.filter((product) => product.type === type);
    }
  
    // Apply sorting
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
  
    setFilteredProducts(result);
  }, [gender, category, type, products, featuredProducts, featuredGender, sortOption]);
  
  return (
    <div className="shop-page">
      <div className="shop-topbar">
        <div className="filter-types">
            {gender === 'featured' ? (
                <>
                <button
                    className={`filter-button ${featuredGender === '' ? 'active' : ''}`}
                    onClick={() => setFeaturedGender('')}
                >
                    All
                </button>
                <button
                    className={`filter-button ${featuredGender === 'men' ? 'active' : ''}`}
                    onClick={() => setFeaturedGender('men')}
                >
                    Men
                </button>
                <button
                    className={`filter-button ${featuredGender === 'women' ? 'active' : ''}`}
                    onClick={() => setFeaturedGender('women')}
                >
                    Women
                </button>
                </>
            ) : (
                <>
                <button
                className={`filter-button ${!type ? 'active' : ''}`}
                onClick={() => {
                    navigate(category ? `/collection/${gender}/${category}` : `/collection/${gender}`);
                }}
                >
                All
                </button>

                {categoryTypes.map((catType) => (
                <button
                    key={catType}
                    className={`filter-button ${type === catType ? 'active' : ''}`}
                    onClick={() => {
                    navigate(category ? `/collection/${gender}/${category}/${catType}` : `/collection/${gender}/${category}/${catType}`);
                    }}
                >
                    {catType}
                </button>
                ))}
                </>
            )}
        </div>

        <div className="sort-menu">
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name">Name A-Z</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      <div className="item-grid">
        {filteredProducts.map((product) => (
          <Item key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
