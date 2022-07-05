import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import studentimg from "../../assets/icons/login.png";
import schoolimg from "../../assets/icons/school.png";
import youthimg from "../../assets/icons/youth.png";

export default function Home() {
  return (
    <div className="container-home">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">ANNOUNCEMENTS</h4>
          <p className="card-para">
            <a href="../../assets/pdf/exam.pdf" target="_blank">
              SLOTS FOR EXAM
            </a>
            <br />
            <a href="../../assets/pdf/mock.pdf" target="_blank">
              SLOTS FOR DEMO
            </a>
          </p>
        </div>
      </div>
      <div class="home-main">
        <marquee> Welcome to Green Olympiad</marquee>
        <div className="main-head">
          <h4>Login</h4>
          <h5>Welcome to Login Page</h5>
        </div>
        <div className="card-area">
          <Link to="/school-login">
            <div className="smallcards">
              <div className="card-body">
                <img className="card-img" src={schoolimg} />
                <h4 className="card-text">
                  school Registrations / Login <br />( Std 4-12 )
                </h4>
              </div>
            </div>
          </Link>
          <Link to="/student-login">
            <div className="smallcards">
              <div className="card-body">
                <img className="card-img" src={studentimg} />

                <h4 className="card-text">
                  Individual Registrations / Login <br />( Std 4-12 )
                </h4>
              </div>
            </div>
          </Link>

          <div className="smallcards ">
            <div className="card-body">
              <img className="card-img" src={youthimg} />

              <h4 className="card-text">
                go4youth Registrations / Login <br />( Undergraduate / Post
                Graduation )
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
