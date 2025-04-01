import React from 'react'
import BottomNavigator from "../component/BottomNavigator.jsx";
import Header from "../component/Header.jsx";
import Hero from "../component/Hero.jsx";


function Home() {
    return (
        <div>
            <Header/>
            <BottomNavigator/>
            <main>
                <Hero/>

            </main>
        </div>
    )
}

export default Home
