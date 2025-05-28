import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAdmin } from './context/AdminContext';
import LogIn from './components/login-form/LogIn';
import Dashboard from './dashboard/Dashboard';
import CreateProduct from './components/create-product/CreateProduct';
import ListProduct from './components/list-products/ListProducts';
import Sidebar from './components/side-bar/SideBar';


const App = () => {
  const { admin } = useAdmin();
  const auth = true;
  return (
    <Router>
      {auth ? (
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/create" element={<CreateProduct />} />
              <Route path="/list" element={<ListProduct />} />
            </Routes>
          </div>
        </div>
      ) : (
        <LogIn />
      )}
    </Router>
  );
};

export default App;
