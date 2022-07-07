import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Colors } from "../../assets/css/color";
// import "../../assets/css/style.css";
import "../../assets/css/style_new.css";
import TermsModal from "./modal/termsModal";
export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalHeading, setModalHeading] = useState('');

  const aboutUs = () => {
    setIsOpen(true);
    setModalHeading('About Us');
    setModalText(`We are an independent, multi-dimensional organization, with capabilities in research, policy, consultancy and implementation. We are innovators and agents of change in the energy, environment, climate change and sustainability space, having pioneered conversations and action in these areas for over four decades.
    We believe that resource efficiency and waste management are the keys to smart, sustainable and inclusive development. Our work across sectors is focused on
    Promoting efficient use of resources
    Increasing access and uptake of sustainable inputs and practices
    Reducing the impact on environment and climate
    Our research, and research based solutions have had a transformative impact on industry as well as communities. We have fostered international collaboration on sustainability action by creating a number of platforms and forums. We do this by translating our research into technology products, technical services, as well as policy advisory and outreach.
    Headquartered in New Delhi, we have regional centres and campuses in Gurugram, Bengaluru, Guwahati, Mumbai, Panaji, and Nainital. Our 750-plus team of scientists, sociologists, economists and engineers delivers insightful, high quality action-oriented research and transformative solutions supported by state- of-the-art infrastructure.
    `)
  };


  const privacy = () => {
    setIsOpen(true);
    setModalHeading('Privacy Policy');
    setModalText(`We collect no personal information, like names or addresses, when you visit our website. If you choose to provide that information to us, it is only used to fulfill your request for information.
    Our website never collects information or creates individual profiles for commercial marketing.`)
  };

  const refund = () => {
    setIsOpen(true);
    setModalHeading('Refund & Cancellation Policy');
    setModalText(`Cancellations will be considered only if the request is made within 24 hours of Registration and the Registration data would be deleted ASAP. In case of receipt of damaged deliverable like Certificates etc.,
     Please get in touch with the help-desk team.
    `)
  };


  const terms = () => {
    setIsOpen(true);
    setModalHeading('Terms & Conditions');
    setModalText(`This website contains material which is owned by or licensed to us.
     This material includes, but is not limited to, the design, layout, look, 
     appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice,
      which forms part of these terms and conditions.
    `)
  };

  const handleClose = () => {
    setIsOpen(false);
  }
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
            <li className="nav-item">
              <TermsModal show={isOpen} handleClose={handleClose} modalBody={modalText} modalHeading={modalHeading} />
              {/* <NavLink className="nav-link link-light" activeClassName="active" to="/"> */}
              <a className="nav-link link-light" onClick={aboutUs}>About us</a>

              {/* </NavLink> */}
            </li>

            <li className="nav-item">

              {/* <NavLink className="nav-link link-light" activeClassName="active" to="/">
                Privacy Policy
              </NavLink> */}
              <a className="nav-link link-light" onClick={privacy}>Privacy Policy</a>

            </li>

            <li className="nav-item">

              {/* <NavLink className="nav-link link-light" activeClassName="active" to="/">
                Terms and Conditions
              </NavLink> */}
              <a className="nav-link link-light" onClick={terms}>Terms and Conditions</a>
            </li>

            <li className="nav-item">

              {/* <NavLink className="nav-link link-light" activeClassName="active" to="/">
                Refund & Cancellation Policy
              </NavLink> */}
              <a className="nav-link link-light" onClick={refund}>Refund & Cancellation Policy</a>
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
