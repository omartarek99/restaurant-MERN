import React, {Fragment} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../helpers/auth';


const Header = () => {

    let navig = useNavigate()

    const handleLogout = (evt) => {
        logout(() => {
            navig('/signin');

        });
    };

    const showNavigation = () => (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
        <Link to="/" className="navbar-brand" >Logo</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ms-auto mt-2 mb-lg-0">
            {!isAuthenticated() && (

                <Fragment>
                    <li className="nav-item">
            <Link to="/" className="nav-link " aria-current="page" > <i class="fa-solid fa-house"></i> Home</Link>
            </li>
            <li className="nav-item">
            <Link to="/signup" className="nav-link " aria-current="page" > <i class="fa-sharp fa-solid fa-pen-to-square"></i> SignUp</Link>
            </li>
            <li className="nav-item">
            <Link to="/signin" className="nav-link" > <i class="fa-sharp fa-solid fa-arrow-right-to-bracket"></i> Sign in</Link>
            </li>

                </Fragment>

            )}

            {isAuthenticated() && isAuthenticated().role === 0 && (

            <Fragment>
                <li className="nav-item">
            <Link to="/user/dashboard" 
            className="nav-link " aria-current="page" >
                <i class="fa-sharp fa-solid fa-house"></i> Dashboard</Link>
            </li>
            </Fragment>
            )}

            {isAuthenticated() && isAuthenticated().role === 1 && (

            <Fragment>
                <li className="nav-item">
            <Link to="/admin/dashboard" 
            className="nav-link " aria-current="page" >
                <i class="fa-sharp fa-solid fa-house"></i> Dashboard</Link>
            </li>
            </Fragment>
                )}

            {isAuthenticated() && (

            <Fragment>
                <li className="nav-item">
            <button  
            className="btn btn-link text-secondary text-decoration-none pl-0" 
            onClick={handleLogout} >
                <i class="fa-solid fa-right-from-bracket"></i> Logout</button>
            </li>
            </Fragment>
            )}
        </ul>
        </div>
    </div>
</nav>




    );

    return (
        <header id='header'>
            {showNavigation()}


        </header>


        
    );




};


export default (Header);