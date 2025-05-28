import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import HomePage from './pages/home/HomePage';
import Footer from './sections/footer/Footer';
import Shop from './pages/shop/Shop';
import Product from './pages/product/Product';
import ScrollToTop from './components/ScrollToTop';
import Cart from './pages/cart/Cart';

const App = () => {
  return (
    <div className="main">
      <Router>
        <ScrollToTop />
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection/:gender" element={<Shop />} />
          <Route path="/collection/:gender/:category" element={<Shop />} />
          <Route path="/collection/:gender/:category/:type" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
};

export default App;
