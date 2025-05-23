import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet} from 'react-router-dom';
import './layout.css'

const Layout = () => {
    return (
        <div className='layout-container'>
            <Navbar />
            <main className="main-content">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;