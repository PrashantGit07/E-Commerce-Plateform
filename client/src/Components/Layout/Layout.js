import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'

const Layout = (props) => {
    return (
        <div className=' flex flex-col min-h-screen' >
            <Header />
            <main className=' flex-grow'>
                {props.children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout