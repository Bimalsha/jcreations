import React, {useEffect} from 'react'
import Orderitem from "./utils/Orderitem.jsx";

function Orders({ onViewDetails }) {
    useEffect(() => {
        // Scroll to top when cart page loads
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Orderitem onViewDetails={onViewDetails} />
        </>
    )
}

export default Orders