import React, { useEffect } from "react";
// import Header from "./Header";
import { Link } from "react-router-dom";

import download from "../../assets/icons/download-icon.png";
import schoolpreview from "../../assets/icons/new-school-preview.png";
// import schoolrec from "../../assets/images/school_rec.svg";
// import kid from "../../assets/images/kid.png";
import computerUser from "../../assets/icons/computer-user.svg";
import youth from "../../assets/icons/youth.svg";
// import "./Home.scss";

export default function Home({ isLogged }) {


  const openins = () => {
    window.open('/Instructions');
  }
  return (
    // <div className="container-home">
    //   <div className="announcements-panel">
    //     <h1>Announcements</h1>
    //     <ul className="list">
    //       <li>
    //         <a href="javascript:void(0)">
    //           <img src={download} alt="" />
    //           <span>Slot for Exam</span>
    //         </a>
    //       </li>
    //       <li>
    //         <a href="javascript:void(0)">
    //           <img src={download} alt="" />
    //           <span>Slot for Demo</span>
    //         </a>
    //       </li>
    //       <li>
    //         <a href="javascript:void(0)">
    //           <img src={download} alt="" />
    //           <span>Account Details</span>
    //         </a>
    //       </li>
    //       <li>
    //         <a href="javascript:void(0)">
    //           <img src={download} alt="" />
    //           <span>Page Navigation</span>
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="welcome-section">
    //     <div className="info-content">
    //       <h1>
    //         Welcome to <span>Green Olympiad</span>
    //       </h1>
    //       <div className="login-text">
    //         <h4>Login</h4>
    //         <p>Welcome to Login Page</p>
    //       </div>
    //     </div>
    //     <div className="kid-img">
    //       <img src={kid} alt="" />
    //     </div>
    //   </div>
    //   <div class="login-category-panel">
    //     <div className="login-tab">
    //       <Link to="/school-login">
    //         <div className="tab active">
    //           <div className="img">
    //             <img src={schoolrec} alt="" />
    //           </div>
    //           <div className="info">
    //             <h4 className="title">
    //               School <br /> <span>Registration / Login</span>
    //             </h4>
    //             <p>STD 4-12</p>
    //           </div>
    //         </div>
    //       </Link>
    //       <Link to="/student-login">
    //         <div className="tab">
    //           <div className="img">
    //             <img src={computerUser} alt="" />
    //           </div>
    //           <div className="info">
    //             <h4 className="title">
    //               Individual <br /> <span>Registration / Login</span>
    //             </h4>
    //             <p>STD 4-12</p>
    //           </div>
    //         </div>
    //       </Link>
    //       <Link to="/student-login">
    //         <div className="tab">
    //           <div className="img">
    //             <img src={youth} alt="" />
    //           </div>
    //           <div className="info">
    //             <h4 className="title">
    //               Go4youth <br /> <span>Registration / Login</span>
    //             </h4>
    //             <p>Undergraduate / Post Graduation</p>
    //           </div>
    //         </div>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div className="dashboard-wraper d-flex">
      {/* <aside className="sidebar" id="sidebar" >
        <div className="sidenav">
          <div className="mobileToggler d-lg-none">
            <a className="navbar-brand" href="#"><img src="images/logo.png" alt="" /></a>
            <button className="navbar-toggler closetogglerbtn" type="button" data-bs-toggle="collapse" data-bs-target="#announce">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </button>
          </div>
          <div className="announce">
            <div className="navtitle">Announcements</div>
            <ul className="list-unstyled">
              <li className="active"><a href="#" onClick={openins}><img src={download} height="18" alt="" />Instructions</a></li>
            
            </ul>
          </div>

        </div>
      </aside> */}
      <main className="content">
        <div className="container-fluid ps-md-4 ps-lg-5 pe-md-4 py-5">
          <div className="welcomebox">
            <div className="row align-items-center">
              <div className="col">
                <marquee>
                  <h1>Welcome to <span>Green Olympiad</span></h1>
                </marquee>

              </div>

            </div>
          </div>
          <div className="row gx-sm-0 dashboard-row my-4 my-lg-5 py-md-4">
            <div className="col-md-4 item text-center">
              <Link to="/school-login" className="box">
                {/* <a href="#" className="box"> */}
                <img src={schoolpreview} alt="" />
                <h4>GREEN Olympiad </h4>
                <h4>School</h4>
                <h5>Registration / Login</h5>
                <p>STD 4-12</p>
                {/* </a> */}
              </Link>
            </div>
            <div className="col-md-4 item text-center">
              <Link to="/student-login" className="box">
                {/* <a href="#" className="box"> */}
                {/* <svg>
                  <use xlinkHref="#computer-user"></use>
                </svg> */}
                <img src={schoolpreview} alt="" />
                <h4>GREEN Olympiad </h4>
                <h4>Student</h4>
                <h5>Registration / Login</h5>
                <p>STD 4-12</p>
                {/* </a> */}
              </Link>
            </div>
            <div className="col-md-4 item text-center">
              <Link to="/student-Inlogin" className="box">

                <img src={schoolpreview} alt="" />


                <h4>Go4youth</h4>
                <h5>Registration / Login</h5>
                <p>Undergraduate/ Post Graduation</p>
                {/* </a> */}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
