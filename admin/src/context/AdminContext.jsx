// src/context/AdminContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create the context
const AdminContext = createContext();

// Export useAdmin hook for easy access
export const useAdmin = () => useContext(AdminContext);

// Provider component
export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL; // Adjust to match your backend

  // Attach token to axios headers
  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Admin login
  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/users/login`, { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setAdmin({ email }); 
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setToken('');
    setAdmin(null);
    localStorage.removeItem('token');
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error('Fetching products failed:', err);
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  return (
    <AdminContext.Provider
      value={{
        admin,
        token,
        loading,
        login,
        logout,
        products,
        fetchProducts,
        setProducts,
        authAxios, // for other custom requests
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
