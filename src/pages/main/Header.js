import React, { useEffect } from "react";
// import "../../assets/css/style.css";
import "../../assets/css/style_new.css";
// import img from "../../assets/icons/terilogo.png";
// import terilogo from "../../assets/icons/terilogo.png";
import terilogo from "../../icons/terilogo.png";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <ToastContainer />
      {/* <Login /> */}

      {/* <nav class="navbar navbar-expand-sm d-flex justify-content-between">
        <div class="navbar-brand">
          <div>
            <img src={img} alt="logo" className="logo" />
          </div>
        </div>
        <div class="navbar-nav">
          <p class="nav-item nav-link" id="date">
            {Date()}
          </p>
        </div>
      </nav> */}


      {/*  */}




      <header className="header ">
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark shadow" style={{ backgroundColor: '#186dd7' }}>
          <div className="container-fluid">
            {/* <a className="navbar-brand" href="#"><img src={terilogo} width="150" alt="logo" /></a> */}
            <Link to="/" className="navbar-brand">
              <img src={terilogo} width="150" alt="logo" />

              {/* <li ><a href="#"><svg className="icon"><use xlinkHref="#upload-data-to-cloud"></use></svg> Upload Students Data</a></li> */}
            </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebar" aria-controls="sidebar" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" >

              <span className="navbar-text ms-auto d-flex align-items-center">
                <svg version="1.1" height="40" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 119.97" xmlSpace="preserve">
                  <g>
                    <path d="M69.76,4.06c0-2.23,2.2-4.06,4.95-4.06s4.95,1.81,4.95,4.06V21.8c0,2.23-2.2,4.06-4.95,4.06s-4.95-1.81-4.95-4.06V4.06 L69.76,4.06L69.76,4.06z M14.37,78.05h11.34c0.72,0,1.31,0.59,1.31,1.31v8.38c0,0.72-0.59,1.31-1.31,1.31H14.37 c-0.72,0-1.31-0.59-1.31-1.31v-8.38C13.06,78.63,13.65,78.05,14.37,78.05L14.37,78.05z M57.79,54.17h11.34 c0.35,0,0.66,0.14,0.9,0.36c-4.45,2.78-8.31,6.4-11.37,10.65h-0.87c-0.72,0-1.31-0.59-1.31-1.31v-8.38 C56.48,54.76,57.07,54.17,57.79,54.17L57.79,54.17z M36.08,54.17h11.34c0.72,0,1.31,0.59,1.31,1.31v8.38 c0,0.72-0.59,1.31-1.31,1.31H36.08c-0.72,0-1.31-0.59-1.31-1.31v-8.38C34.77,54.76,35.36,54.17,36.08,54.17L36.08,54.17z M14.37,54.17h11.34c0.72,0,1.31,0.59,1.31,1.31v8.38c0,0.72-0.59,1.31-1.31,1.31H14.37c-0.72,0-1.31-0.59-1.31-1.31v-8.38 C13.06,54.76,13.65,54.17,14.37,54.17L14.37,54.17z M36.08,78.05h11.34c0.72,0,1.31,0.59,1.31,1.31v8.38 c0,0.72-0.59,1.31-1.31,1.31H36.08c-0.72,0-1.31-0.59-1.31-1.31v-8.38C34.77,78.63,35.36,78.05,36.08,78.05L36.08,78.05z M103.49,59.54c11.71,4.85,19.39,16.28,19.39,29.02c0,8.67-3.52,16.53-9.2,22.21c-5.68,5.68-13.53,9.2-22.21,9.2 c-8.67,0-16.52-3.52-22.21-9.2c-5.68-5.69-9.2-13.54-9.2-22.21c0-12.64,7.86-24.43,19.55-29.23 C86.86,56.37,96.29,56.55,103.49,59.54L103.49,59.54L103.49,59.54z M86.64,87.72c0.39-0.43,0.87-0.8,1.39-1.08V72.98 c0-1.39,1.13-2.52,2.52-2.52c1.39,0,2.53,1.13,2.53,2.52v13.66c0.92,0.5,1.68,1.25,2.17,2.17h9.76c1.4,0,2.52,1.13,2.52,2.52 s-1.13,2.52-2.52,2.52h-9.76c-0.9,1.68-2.66,2.82-4.7,2.82c-1.6,0-3.03-0.71-4.01-1.82C84.73,92.78,84.82,89.69,86.64,87.72 L86.64,87.72L86.64,87.72z M110.12,70.41c-13.01-13.01-34.95-9.33-42.56,7.05c-1.56,3.37-2.44,7.13-2.44,11.09 c0,7.28,2.95,13.87,7.72,18.64c4.77,4.77,11.36,7.72,18.64,7.72c7.28,0,13.87-2.96,18.64-7.72c4.77-4.77,7.72-11.36,7.72-18.64 c0-4.13-0.95-8.04-2.64-11.52C113.91,74.4,112.19,72.48,110.12,70.41L110.12,70.41L110.12,70.41z M25.33,4.06 c0-2.23,2.2-4.06,4.95-4.06c2.74,0,4.95,1.81,4.95,4.06V21.8c0,2.23-2.21,4.06-4.95,4.06c-2.74,0-4.95-1.81-4.95-4.06V4.06 L25.33,4.06L25.33,4.06z M5.45,38.79h94.21V18.37c0-0.7-0.28-1.31-0.73-1.76c-0.45-0.45-1.09-0.73-1.76-0.73h-9.03 c-1.51,0-2.74-1.23-2.74-2.74c0-1.51,1.23-2.74,2.74-2.74h9.03c2.21,0,4.2,0.89,5.65,2.34c1.45,1.45,2.34,3.44,2.34,5.65v32.43 c-1.8-0.62-3.65-1.12-5.56-1.49v-5.07h0.06H5.45v52.91c0,0.7,0.28,1.31,0.73,1.76c0.45,0.45,1.09,0.73,1.76,0.73h44.77 c0.51,1.9,1.15,3.76,1.92,5.54H7.99c-2.2,0-4.2-0.89-5.65-2.34C0.89,101.4,0,99.42,0,97.21V18.39c0-2.2,0.89-4.19,2.34-5.65 c1.45-1.45,3.44-2.34,5.65-2.34h9.64c1.51,0,2.74,1.23,2.74,2.74c0,1.51-1.23,2.74-2.74,2.74H7.99c-0.7,0-1.31,0.28-1.76,0.73 c-0.45,0.45-0.73,1.09-0.73,1.76v20.43H5.45V38.79L5.45,38.79z M43.13,15.87c-1.51,0-2.74-1.23-2.74-2.74 c0-1.51,1.23-2.74,2.74-2.74h18.39c1.51,0,2.74,1.23,2.74,2.74c0,1.51-1.23,2.74-2.74,2.74H43.13L43.13,15.87L43.13,15.87z" fill="#fff" />
                  </g>
                </svg>
                <p className="mx-2 my-0 text-end">
                  <strong>{Date()}</strong>
                </p>
              </span>
            </div>
          </div>
        </nav>
      </header>
      {/*  */}
    </>
  );
}
