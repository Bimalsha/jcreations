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
import { ProtectedRoute, AdminLoginRoute } from "./ProtectedRoute.jsx";
import { useEffect } from "react";
import useAuthStore from "./stores/authStore";

function App() {
    const location = useLocation();
    const isAuthPage = location.pathname === "/signin" || location.pathname === "/adminlogin";
    const isSingleProductPage = location.pathname === "/singleproduct";
    const isDashboardPage = location.pathname.startsWith("/dashboard");
    const initAuth = useAuthStore(state => state.initAuth);

    // Initialize authentication when app loads
    useEffect(() => {
        initAuth();
    }, [initAuth]);

    return (
        <div className="flex flex-col min-h-screen">
            {!isAuthPage && !isDashboardPage && <Header />}

            <main className={`flex-grow ${!isAuthPage && !isDashboardPage ? 'pt-16' : ''}`}>
                <Routes location={location} key={location.pathname}>
                    {/* Public client routes */}
                    <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                    <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
                    <Route path="/order" element={<PageTransition><Order /></PageTransition>} />
                    <Route path="/account" element={<PageTransition><Account /></PageTransition>} />
                    <Route path="/signin" element={<PageTransition><SignIn /></PageTransition>} />
                    <Route path="/singleproduct" element={<PageTransition><SingleProduct /></PageTransition>} />

                    {/* Admin login route - redirects to dashboard if already logged in */}
                    <Route element={<AdminLoginRoute />}>
                        <Route path="/adminlogin" element={<AdminLogin />} />
                    </Route>

                    {/* Protected dashboard routes - require authentication */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard/*" element={<Dashboard />} />
                    </Route>
                </Routes>
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