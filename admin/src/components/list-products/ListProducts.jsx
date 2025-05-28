import React, { useState, useMemo } from 'react';
import './ListProducts.css';
import { useAdmin } from '../../context/AdminContext';

const ListProducts = () => {
  const { products } = useAdmin();

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    gender: '',
    category: '',
    type: '',
    color: '',
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const uniqueValues = (arr, key) => [...new Set(arr.map(item => item[key]).filter(Boolean))];

  const types = useMemo(() => uniqueValues(products, 'type'), [products]);
  const colors = useMemo(() => uniqueValues(products, 'color'), [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        product.name?.toLowerCase().includes(search.toLowerCase()) ||
        product.brand?.toLowerCase().includes(search.toLowerCase()) ||
        product.modelCode?.toLowerCase().includes(search.toLowerCase()) ||
        product.tags?.some(tag =>
          tag.toLowerCase().includes(search.toLowerCase())
        );

      const matchesFilters =
        (!filters.gender || product.gender === filters.gender) &&
        (!filters.category || product.category === filters.category) &&
        (!filters.type || product.type === filters.type) &&
        (!filters.color || product.color === filters.color);

      return matchesSearch && matchesFilters;
    });
  }, [products, search, filters]);

  return (
    <div className="product-list-container">
      <h2>Product List</h2>

      <div className="filters">
        <div className="filters-left">
          <select name="gender" onChange={handleFilterChange} value={filters.gender}>
            <option value="">All Genders</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="unisex">Unisex</option>
          </select>

          <select name="category" onChange={handleFilterChange} value={filters.category}>
            <option value="">All Categories</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
          </select>

          <select name="type" onChange={handleFilterChange} value={filters.type}>
            <option value="">All Types</option>
            {types.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select name="color" onChange={handleFilterChange} value={filters.color}>
            <option value="">All Colors</option>
            {colors.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

  <div className="filters-right">
    <input
      type="text"
      placeholder="Search by name, brand, model code, or tag"
      value={search}
      onChange={handleSearchChange}
    />
  </div>
</div>


      <div className="grid-header">
        <div>Image</div>
        <div>Name</div>
        <div>Price</div>
        <div>Type</div>
        <div>Color</div>
        <div>Actions</div>
      </div>

      {filteredProducts.map((product) => (
        <div className="grid-row" key={product._id}>
          <div>
            <img src={product.images[0]} alt={product.name} className="product-img" />
          </div>
          <div>{product.name}</div>
          <div>${product.price}</div>
          <div>{product.type}</div>
          <div>{product.color}</div>
          <div>
            <button onClick={() => setSelectedProduct(product)}>View Details</button>
          </div>
        </div>
      ))}

      {selectedProduct && (
        <div className="product-popup">
          <div className="popup-content">
            <button className="close-btn" onClick={() => setSelectedProduct(null)}>X</button>
            <h3>{selectedProduct.name}</h3>
            <p><strong>Gender:</strong> {selectedProduct.gender}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Type:</strong> {selectedProduct.type}</p>
            <p><strong>Brand:</strong> {selectedProduct.brand}</p>
            <p><strong>Price:</strong> ${selectedProduct.price}</p>
            <p><strong>Color:</strong> {selectedProduct.color}</p>
            <p><strong>Model Code:</strong> {selectedProduct.modelCode}</p>
            <p><strong>Tags:</strong> {selectedProduct.tags?.join(', ')}</p>
            <p><strong>Description:</strong> {selectedProduct.description}</p>

            <h4>Sizes & Stock:</h4>
            <ul>
              {selectedProduct.sizes?.map((s, idx) => (
                <li key={idx}>{s.size}: {s.stock}</li>
              ))}
            </ul>

            <h4>Images:</h4>
            <div className="popup-images">
              {selectedProduct.images?.map((img, idx) => (
                <img key={idx} src={img} alt={`product-${idx}`} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListProducts;
