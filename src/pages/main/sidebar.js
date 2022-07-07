import React from 'react';
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside class="sidebar" id="sidebar">
            <div class="sidenav">
                <div class="mobileToggler d-lg-none">
                    <a class="navbar-brand" href="#"><img src="images/logo.png" alt="" /></a>
                    <button class="navbar-toggler closetogglerbtn" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                    </button>
                </div>
                <div class="navtitle">School View</div>
                <ul class="list-unstyled">
                    {/* <li class="active"><a href="#"><img src="images/download-icon.png" height="18" alt="" /> School Details</a></li> */}
                    <li class="active">
                        <Link to="">
                            <img src="images/download-icon.png" height="18" alt="" />
                            School Details
                        </Link>
                        <Link to="/school-payment">
                            <img src="images/download-icon.png" height="18" alt="" />
                            Payment
                        </Link>
                    </li>


                    {/* <li><a href="#"><img src="images/download-icon.png" height="18" alt="" /> Slot for Demo</a></li>
            <li><a href="#"><img src="images/download-icon.png" height="18" alt="" /> Account Details</a></li>
            <li><a href="#"><img src="images/download-icon.png" height="18" alt="" /> Page Navigation</a></li> */}
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar