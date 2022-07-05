import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Colors } from "../../assets/css/color";
// import "../../assets/css/style.css";
import "../../assets/css/style_new.css";
export default function Footer() {
  return (
    <>
      <div style={{
        position: "fixed",
        bottom: 0,
        height: 50,
        backgroundColor: Colors.MAINCOLOR,
        width: "100%",
      }}>
        {/* <footer>
          <NavLink className="bottom-text" activeClassName="active" to="/">
            About us
          </NavLink>
          <NavLink className="bottom-text" activeClassName="active" to="/login">
            Privacy Policy
          </NavLink>
          <NavLink className="bottom-text" activeClassName="active" to="/contact">
            Terms and Conditions
          </NavLink>
          <NavLink className="bottom-text" activeClassName="active" to="/contact">
            Refund & Cancellation Policy
          </NavLink>

        </footer> */}

        <footer className="footer mybg-accent">
          <ul className="nav justify-content-center">
            <li class="nav-item">

              <NavLink className="nav-link link-light" activeClassName="active" to="/">
                About us
              </NavLink>
            </li>

            <li class="nav-item">

              <NavLink className="nav-link link-light" activeClassName="active" to="/">
                Privacy Policy
              </NavLink>
            </li>

            <li class="nav-item">

              <NavLink className="nav-link link-light" activeClassName="active" to="/">
                Terms and Conditions
              </NavLink>
            </li>

            <li class="nav-item">

              <NavLink className="nav-link link-light" activeClassName="active" to="/">
                Refund & Cancellation Policy
              </NavLink>
            </li>
            {/* <li class="nav-item"><a href="#footerModal" role="button" class="nav-link link-light" data-bs-toggle="modal">Privacy Policy</a></li>
            <li class="nav-item"><a href="#footerModal" role="button" class="nav-link link-light" data-bs-toggle="modal">Terms and Conditions</a></li>
            <li class="nav-item"><a href="#footerModal" role="button" class="nav-link link-light" data-bs-toggle="modal">Refund &amp; Cancellation Policy</a></li> */}
          </ul>
        </footer>


      </div>

    </>
  );
}
