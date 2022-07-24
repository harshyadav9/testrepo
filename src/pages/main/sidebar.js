import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import downloadIcon from "../../assets/icons/download-icon.png";
import { StudentDataContext } from '../context/datacontext';
import { useNavigate } from "react-router";
function Sidebar() {

    const { state, dispatch } = useContext(StudentDataContext);
    const navigate = useNavigate();


    const logoutval = () => {
        if (state?.reset_to_login) {
            state?.reset_to_login(false);
            navigate('/');
        }
    }

    return (
        // <aside className="sidebar" id="sidebar">
        //     <div className="sidenav">
        //         <div className="mobileToggler d-lg-none">
        //             <a className="navbar-brand" href="#"><img src="images/logo.png" alt="" /></a>
        //             <button className="navbar-toggler closetogglerbtn" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar">
        //                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
        //                     <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
        //                 </svg>
        //             </button>
        //         </div>
        //         <div className="navtitle">School View</div>
        //         <ul className="list-unstyled">
        //             {/* <li className="active"><a href="#"><img src="images/download-icon.png" height="18" alt="" /> School Details</a></li> */}
        //             <li className="active">
        //                 <Link to="/school-edit-details">
        //                     <img src={downloadIcon} height="18" alt="" />
        //                     School Details
        //                 </Link>
        //                 <Link to="/school-upload-data">
        //                     <svg className="icon"><use xlinkHref="#upload-data-to-cloud"></use></svg>

        //                     Student Upload

        //                     {/* <li ><a href="#"><svg className="icon"><use xlinkHref="#upload-data-to-cloud"></use></svg> Upload Students Data</a></li> */}
        //                 </Link>
        //                 <Link to="/school-payment">
        //                     {/* <img src="images/download-icon.png" height="18" alt="" /> */}
        //                     <svg className="icon"><use xlinkHref="#online-payment-method"></use></svg>
        //                     Payment
        //                 </Link>

        //                 <Link to="/school-slot">
        //                     {/* <img src="images/download-icon.png" height="18" alt="" /> */}
        //                     <svg className="icon"><use xlinkHref="#check-to-slot"></use></svg>
        //                     Select Slot Details
        //                 </Link>

        //                 <Link to="/school-application-status">
        //                     {/* <img src="images/download-icon.png" height="18" alt="" /> */}
        //                     <svg className="icon"><use xlinkHref="#application_status"></use></svg>
        //                     Application Status
        //                 </Link>

        //                 <Link to="/school-helpdesk-ticket">
        //                     {/* <img src="images/download-icon.png" height="18" alt="" /> */}
        //                     <svg className="icon"><use xlinkHref="#application_status"></use></svg>
        //                     Submit Helpdesk Ticket
        //                 </Link>

        //                 <Link to="/school-view-helpdesk-ticket">
        //                     {/* <img src="images/download-icon.png" height="18" alt="" /> */}
        //                     <svg className="icon"><use xlinkHref="#application_status"></use></svg>
        //                     View helpdesk Ticket
        //                 </Link>

        //                 <Link to="/school-certificate">
        //                     {/* <img src="images/download-icon.png" height="18" alt="" /> */}
        //                     <svg className="icon"><use xlinkHref="#application_status"></use></svg>
        //                     Download Certificate
        //                 </Link>

        //                 <Link to="/school-change-password">
        //                     {/* <img src="images/download-icon.png" height="18" alt="" /> */}
        //                     <svg className="icon"><use xlinkHref="#application_status"></use></svg>
        //                     Change Password
        //                 </Link>


        //                 <Link to="/">
        //                     {/* <img src="images/download-icon.png" height="18" alt="" /> */}
        //                     <svg className="icon"><use xlinkHref="#application_status"></use></svg>
        //                     Logout
        //                 </Link>


        //             </li>

        //         </ul>
        //     </div>
        // </aside>






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
                <div className="navtitle">School</div>
                <ul className="list-unstyled">
                    {/* <li className="active"><a href="#"><img src="images/download-icon.png" height="18" alt="" /> School Details</a></li> */}
                    <li className="active">
                        <NavLink activeClassName="active" to="/school-edit-details">
                            {/* <img src={downloadIcon} height="18" alt="" /> */}
                            <svg className="icon"><use xlinkHref="#check-to-slot"></use></svg>
                            School Details
                        </NavLink>
                        <NavLink activeClassName="active" to="/school-upload-data">
                            <svg className="icon"><use xlinkHref="#upload-data-to-cloud"></use></svg>

                            Student Upload

                            {/* <li ><a href="#"><svg className="icon"><use xlinkHref="#upload-data-to-cloud"></use></svg> Upload Students Data</a></li> */}
                        </NavLink>

                        <NavLink activeClassName="active" to="/school-slot">
                            {/* <img src="images/download-icon.png" height="18" alt="" /> */}
                            <svg className="icon"><use xlinkHref="#check-to-slot"></use></svg>
                            Select Slot Details
                        </NavLink>

                        <NavLink activeClassName="active" to="/school-payment">
                            {/* <img src="images/download-icon.png" height="18" alt="" /> */}
                            <svg className="icon"><use xlinkHref="#online-payment-method"></use></svg>
                            Payment
                        </NavLink>

                        {/* <Link to="/school-rollNo">
                          
                            <svg className="icon"><use xlinkHref="#online-payment-method"></use></svg>
                            Generate Roll No
                        </Link> */}



                        <NavLink activeClassName="active" to="/school-application-status">
                            {/* <img src="images/download-icon.png" height="18" alt="" /> */}
                            <svg className="icon"><use xlinkHref="#application_status"></use></svg>
                            Application Status
                        </NavLink>

                        <NavLink activeClassName="active" to="/school-helpdesk-ticket">
                            {/* <img src="images/download-icon.png" height="18" alt="" /> */}
                            <svg className="icon"><use xlinkHref="#application_status"></use></svg>
                            Submit Helpdesk Ticket
                        </NavLink>

                        <NavLink activeClassName="active" to="/school-view-helpdesk-ticket">
                            {/* <img src="images/download-icon.png" height="18" alt="" /> */}
                            <svg className="icon"><use xlinkHref="#application_status"></use></svg>
                            View helpdesk Ticket
                        </NavLink>

                        {/* <Link to="/school-certificate">
                          
                            <svg className="icon"><use xlinkHref="#application_status"></use></svg>
                            Download Certificate
                        </Link> */}

                        <NavLink activeClassName="active" to="/school-change-password">
                            {/* <img src="images/download-icon.png" height="18" alt="" /> */}
                            <svg className="icon"><use xlinkHref="#application_status"></use></svg>
                            Change Password
                        </NavLink>


                        {/* <Link to="/">
                          
                            <svg className="icon"><use xlinkHref="#application_status"></use></svg>
                            Logout
                        </Link> */}
                        {/* <a onClick={logoutval}><svg className="icon"><use xlinkHref="#application_status"></use></svg>
                            Logout</a> */}

                        <a href='/' onClick={logoutval}><svg className="icon"><use xlinkHref="#application_status"></use></svg>
                            Logout</a>

                    </li>

                </ul>
            </div>
        </aside>
    )
}

export default Sidebar