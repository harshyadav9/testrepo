import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import downloadIcon from "../../assets/icons/download-icon.png";
import { StudentDataContext } from '../context/datacontext';
import { useNavigate } from "react-router";
function AdminSidebar() {

    const { state, dispatch } = useContext(StudentDataContext);
    const navigate = useNavigate();


    const logoutval = () => {
        if (state?.reset_to_login) {
            state?.reset_to_login(false);
            navigate('/');
        }
    }

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
                <div className="navtitle">Admin</div>
                <ul className="list-unstyled">
                    {/* <li className="active"><a href="#"><img src="images/download-icon.png" height="18" alt="" /> School Details</a></li> */}
                    <li className="active">
                        <NavLink activeClassName="active" to="/helpdesk-payment">
                            {/* <img src={downloadIcon} height="18" alt="" /> */}
                            <svg className="icon"><use xlinkHref="#check-to-slot"></use></svg>
                            Payments Details
                        </NavLink>


                        <a href='/' onClick={logoutval}><svg className="icon"><use xlinkHref="#application_status"></use></svg>
                            Logout</a>

                    </li>

                </ul>
            </div>
        </aside>
    )
}

export default AdminSidebar