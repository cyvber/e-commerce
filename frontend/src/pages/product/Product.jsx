import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShopContext } from '../../context/ShopContext';
import { addToCart } from '../../redux/slices/cartSlice';
import './Product.css';

const Product = () => {
  const { products, loading } = useContext(ShopContext);
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = products.find((e) => e._id === id);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  if (loading || !product) {
    return <div className="loading">Loading product...</div>;
  }

  const colorVariants = products.filter((p) => p.modelCode === product.modelCode);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    dispatch(
      addToCart({
        ...product,
        quantity: 1,
        selectedSize,
      })
    );
  };

  return (
    <div className="product-page">
      <div className="product-left">
        <div className="main-image">
          <img src={selectedImage} alt={product.name} />
        </div>
        <div className="image-carousel">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} ${index}`}
              className={selectedImage === img ? 'active' : ''}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      <div className="product-right">
        <div className="brand">{product.brand}</div>
        <h1 className="product-name">{product.name}</h1>

        <div className="rating">
          {'★'.repeat(Math.round(product.rating)) +
            '☆'.repeat(5 - Math.round(product.rating))}
          <span className="review-count">({product.numReviews})</span>
        </div>

        <div className="price">${product.price.toFixed(2)}</div>

        <div className="color">
            <strong>Color:</strong> {product.color}
            <div className="color-variants">
                {colorVariants.map((variant) => (
                    <Link to={`/product/${variant._id}`} key={variant._id}>
                    <div
                        className={`color-wrapper ${
                        variant.color === product.color ? 'selected-color' : ''
                        }`}
                        onClick={() => setSelectedSize(null)}
                    >
                        <div
                        className="color-square"
                        style={{ backgroundColor: variant.color }}
                        title={variant.color}
                        />
                    </div>
                    </Link>
                ))}
            </div>
        </div>

        <div className="sizes">
            <strong>Sizes:</strong>
            <div className="size-options">
            {product.sizes.map((sizeObj, index) => {
  const isOutOfStock = sizeObj.stock === 0;

  return (
    <div
      key={index}
      className={`size-wrapper ${
        selectedSize === sizeObj.size ? 'selected-size' : ''
      } ${isOutOfStock ? 'disabled-size' : ''}`}
      onClick={() => !isOutOfStock && setSelectedSize(sizeObj.size)}
      title={isOutOfStock ? 'Out of Stock' : ''}
    >
      <div className="size-box">
        {sizeObj.size}
      </div>
    </div>
  );
})}

            </div>
        </div>
        
        <button
          className="add-to-cart"
          onClick={handleAddToCart}
          disabled={!selectedSize}
        >
          {selectedSize ? 'Add to Cart' : 'Select Size'}
        </button>
      </div>
    </div>
  );
};

export default Product;
