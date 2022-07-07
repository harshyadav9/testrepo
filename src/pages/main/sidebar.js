import React from 'react';
import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar" id="sidebar">
            <div className="sidenav">
                <div className="mobileToggler d-lg-none">
                    <a className="navbar-brand" href="#"><img src="images/logo.png" alt="" /></a>
                    <button className="navbar-toggler closetogglerbtn" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                    </button>
                </div>
                <div className="navtitle">School View</div>
                <ul className="list-unstyled">
                    {/* <li className="active"><a href="#"><img src="images/download-icon.png" height="18" alt="" /> School Details</a></li> */}
                    <li className="active">
                        <Link to="">
                            <img src="images/download-icon.png" height="18" alt="" />
                            School Details
                        </Link>
                        <Link to="/school-upload-data">
                            <img src="images/download-icon.png" height="18" alt="" />
                            Student Upload
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