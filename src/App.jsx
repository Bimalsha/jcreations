import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./client/pages/Home.jsx";
import Cart from "./client/pages/Cart.jsx";
import Order from "./client/pages/Order.jsx";
import Account from "./client/pages/Account.jsx";
function App() {


  return (
      <Router>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/order" element={<Order />} />
              <Route path="/account" element={<Account />} />
          </Routes>
      </Router>

  )
}

export default App
