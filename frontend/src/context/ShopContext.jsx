import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProductTypes } from '../redux/slices/productTypesSlice';
import { addToCart } from '../redux/slices/cartSlice';
import axios from 'axios';

// Create the context
export const ShopContext = createContext();

// Create the provider component
export const ShopProvider = ({ children }) => {
    
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [discountProducts, setDiscountProducts] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_SERVER_URL
  const dispatch = useDispatch()

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError(err);
      setLoading(false);
    }
  };
  const fetchFeaturedProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products/featured`);
      const data = await res.json();
      setFeaturedProducts(data);
    } catch (err) {
      console.error('Error fetching featured products:', err);
    }
  };

  // Fetch best sellers
  const fetchBestSellers = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products/bestsellers`);
      const data = await res.json();
      setBestSellers(data);
    } catch (err) {
      console.error('Error fetching best sellers:', err);
    }
  };

  // Fetch discount products
  const fetchDiscountProducts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/products/discounts`);
      const data = await res.json();
      setDiscountProducts(data);
    } catch (err) {
      console.error('Error fetching discount products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchFeaturedProducts();
    fetchBestSellers();
    fetchDiscountProducts();
    dispatch(fetchProductTypes());
  }, [dispatch]);


  return (
    <ShopContext.Provider 
      value={{ 
        products, 
        featuredProducts, 
        bestSellers, 
        discountProducts,
        loading, 
        error 
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
