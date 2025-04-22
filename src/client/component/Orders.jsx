import React from 'react'
import Orderitem from "./utils/Orderitem.jsx";

function Orders({ onViewDetails }) {
    return (
        <>
            <Orderitem onViewDetails={onViewDetails} />
        </>
    )
}

export default Orders