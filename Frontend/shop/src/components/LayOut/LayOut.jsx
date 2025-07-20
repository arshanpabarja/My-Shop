import React from 'react'
import Navbar from '../Navbar/NavbarV2';

function LayOut({ children }) {
    return (
        <div className="">
            <Navbar />
                {children}
        </div>
    )
}

export default LayOut