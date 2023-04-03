import React from "react";
import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

//components
import AdminHeader from './AdminHeader';
import AdminActionBtns from './AdminActionBtns'
import AdminCatModal from "./AdminCatModal";
import AdminProductModal from "./AdminProductModal";

const AdminDashboard = () => {



    

    

    


    return (
        <section>
            <AdminHeader />
            <AdminActionBtns />
            
            <AdminCatModal/>
            <AdminProductModal/>
            <Outlet/>
        </section>
    );
};

export default AdminDashboard;