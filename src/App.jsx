import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import Home from "./client/pages/Home.jsx";
import Cart from "./client/pages/Cart.jsx";
import Order from "./client/pages/Order.jsx";
import Account from "./client/pages/Account.jsx";
import Footer from './client/component/Footer.jsx';
import Header from './client/component/Header.jsx';
import BottomNavigator from './client/component/BottomNavigator.jsx';
import PageTransition from './client/component/utils/PageTransition.jsx';
import SignIn from "./client/pages/SignIn.jsx";
import SingleProduct from "./client/pages/SingleProduct.jsx";

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <PageTransition>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/order" element={<Order />} />
                <Route path="/account" element={<Account />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/singleproduct" element={<SingleProduct />} />
            </Routes>
        </PageTransition>
    );
}

function App() {
    const location = useLocation();
    const isAuthPage = location.pathname === "/signin";
    const isSingleProductPage = location.pathname === "/singleproduct";

    return (
        <div className="flex flex-col min-h-screen">
            {!isAuthPage && !isSingleProductPage && <Header />}

            <main className={`flex-grow ${!isAuthPage && !isSingleProductPage ? 'pt-16' : ''}`}>
                <AnimatedRoutes />
            </main>

            {!isAuthPage && !isSingleProductPage && <BottomNavigator />}
            {!isAuthPage && !isSingleProductPage && <Footer />}
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;