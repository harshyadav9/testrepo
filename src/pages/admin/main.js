import React, { useEffect } from "react";
// import Header from "./Header";
import { Link } from "react-router-dom";

import download from "../../assets/icons/download-icon.png";
import schoolpreview from "../../assets/icons/new-school-preview.png";
import { useNavigate } from "react-router";
// import schoolrec from "../../assets/images/school_rec.svg";
// import kid from "../../assets/images/kid.png";
import computerUser from "../../assets/icons/computer-user.svg";
import youth from "../../assets/icons/youth.svg";
// import "./Home.scss";

export default function HomeAdmin({ isLogged }) {

    const navigate = useNavigate();
    useEffect(() => {
        isLogged({ page: 'admin', isLoggedIn: true });
        // navigate('/admin')

    }, []);


    const gotologin = () => {
        isLogged({ page: 'admin-login', isLoggedIn: true });
    }
    const openins = () => {
        window.open('/Instructions');
    }
    return (

        <div className="dashboard-wraper d-flex">

            <main className="content">
                <div className="container-fluid ps-md-4 ps-lg-5 pe-md-4 py-5">
                    <div className="welcomebox">
                        <div className="row align-items-center">
                            <div className="col">
                                <marquee>

                                    <h1> Welcome to   <span>GREEN Olympiad </span>Online Registration</h1>
                                </marquee>

                            </div>

                        </div>
                    </div>
                    <div className="row gx-sm-0 dashboard-row my-4 my-lg-5 py-md-4">
                        <div className="col-md-4 item text-center">
                            {/* <Link to="/admin-login" className="box"> */}
                            <a className="box" onClick={gotologin}>
                                {/* <a href="#" className="box"> */}
                                <img src={schoolpreview} alt="" />
                                <h4>Admin Login</h4>
                                {/* <h4>School</h4>
                <h5>Registration / Login</h5> */}
                                <p>Master Login</p>
                                {/* </a> */}
                            </a>
                            {/* </Link> */}
                        </div>


                    </div>
                </div>
            </main>
        </div>
    );
}
