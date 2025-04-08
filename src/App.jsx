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
import AdminLogin from "./admin/pages/AdminLogin.jsx";
import Dashboard from "./admin/pages/Dashboard.jsx";

function App() {
    const location = useLocation();
    const isAuthPage = location.pathname === "/signin" || location.pathname === "/adminlogin";
    const isSingleProductPage = location.pathname === "/singleproduct";
    const isDashboardPage = location.pathname.startsWith("/dashboard");

    return (
        <div className="flex flex-col min-h-screen">
            {!isAuthPage && !isDashboardPage && <Header />}

            <main className={`flex-grow ${!isAuthPage && !isDashboardPage ? 'pt-16' : ''}`}>
                {isDashboardPage ? (
                    <Routes>
                        <Route path="/dashboard/*" element={<Dashboard />} />
                    </Routes>
                ) : (
                    <PageTransition>
                        <Routes location={location} key={location.pathname}>
                            <Route path="/" element={<Home />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/order" element={<Order />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/singleproduct" element={<SingleProduct />} />
                            <Route path="/adminlogin" element={<AdminLogin />} />
                        </Routes>
                    </PageTransition>
                )}
            </main>

            {!isAuthPage && !isSingleProductPage && !isDashboardPage && <BottomNavigator />}
            {!isAuthPage && !isSingleProductPage && !isDashboardPage && <Footer />}
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