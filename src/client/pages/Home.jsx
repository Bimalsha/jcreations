import React from 'react'
import BottomNavigator from "../component/BottomNavigator.jsx";
import Header from "../component/Header.jsx";
import Hero from "../component/Hero.jsx";
import Newarrivals from "../component/Newarrivals.jsx";
import Category from "../component/Category.jsx";
import Allproducts from '../component/Allproducts.jsx';


function Home() {
    return (
        <div>
            <Header />
            <BottomNavigator />
            <main>
                <Hero />
                <Category />
                <Newarrivals />
                {/*<Allproducts />*/}
            </main>
        </div>
    )
}

export default Home
