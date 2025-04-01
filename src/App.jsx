import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./client/pages/Home.jsx";
import Cart from "./client/pages/Cart.jsx";
import Order from "./client/pages/Order.jsx";
import Account from "./client/pages/Account.jsx";
import Footer from './client/component/Footer.jsx';
function App() {


  return (
      
        <div className="flex flex-col min-h-screen">
        {/* Header or Navbar */}
        <header>
            {/* Add your header or navbar here */}
        </header>

        {/* Main Content */}
        <main className="flex-grow">
            {<Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/account" element={<Account />} />
                </Routes>
            </Router>}
        </main>

        {/* Footer */}
        <Footer />
    </div>
  )
}

export default App
