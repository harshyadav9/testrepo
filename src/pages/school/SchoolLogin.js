import React, { useContext, useEffect, useState } from "react";
import Header from "../main/Header";
import { Link } from "react-router-dom";
import schoolimg from "../../assets/icons/school.png";
import { useNavigate } from "react-router";
import "../../assets/css/style_new.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { API_BASE_URL, API_END_POINTS } from "../../apis/api";
import { StudentDataContext } from "../context/datacontext";
import { notify } from "../../Utills";
import file from "../../assets/pdf/guide_school.pdf";

export default function SchoolLogin({ isLogged }) {
  const { state, dispatch } = useContext(StudentDataContext);
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const initialState = {
    schoolname: '', country: '', state: '', pincode: "", postal_address: "", phonestd: "", mobile: "", principal_name: "",
    email: "", district: "", coordinating_teacher: "", school_code: "", email_coordinator: "", mobile_coordinator: "", mode: "", allow_School_slotting: false, student: { Class: 4 },
    roll_no: ""

  };
  const navigate = useNavigate();
  const [userError, setUserError] = useState({})
  const [passError, setPassError] = useState({})
  const setUserName = e => {
    let val = e.target.value
    if (val === '') {
      setUserError({ user: 'Please enter School code' })
    } else {
      setUserError({ user: '' })
    }
    setUser(val);
  };

  useEffect(() => {
    dispatch({
      type: 'EMPTY_STATE',
      schoolname: '', country: '', state: '', pincode: "", postal_address: "", phonestd: "", mobile: "", principal_name: "",
      email: "", district: "", coordinating_teacher: "", school_code: "", email_coordinator: "", mobile_coordinator: "", mode: "", allow_School_slotting: false, student: { Class: 4 },
      roll_no: ""
    });

  }, []);

  const setPassword = e => {
    let val = e.target.value;
    if (val === '') {
      setPassError({ pass: 'Please enter Password' })
    } else {
      setPassError({ pass: '' })
    }
    setPass(val);
  }
  const handleSubmit = e => {
    e.preventDefault()
    if (!(user && pass)) {
      if (user === '') {
        setUserError({ user: 'Please enter School code' })

      }
      if (pass === '') {
        setPassError({ pass: 'Please enter Password' })

      }
      return;
      // console.log('test T')
    } else {
      const serverData = {
        "username": user,
        "password": pass
      }

      axios
        .post(`${API_BASE_URL}${API_END_POINTS?.login}`, serverData)
        //.post(`${API_END_POINTS?.login}`, serverData)
        .then((res) => {
          if (res.data && res?.data?.data) {
            const { data: {
              schoolsCode,
              principalname,
              schoolname,
              country,
              state,
              pincode,
              mobile,
              email
            } } = res.data;
            console.log("res.data", res.data)
            isLogged(true);
            navigate("/school-edit-details");
            // alert("login successfull!");
            // notify(`login successfull!!.`, true);
            // history.push()
            // localStorage.removeItem("token");
            // localStorage.setItem("token", res?.data?.token);
            // let token = res?.data?.token;
            // let decoded = token !== "" ? jwt_decode(token) : {};
            dispatch({
              type: 'ADDINFO',
              school_code: serverData.username,
              schoolname: res.data.data.schoolname,
              country: res.data.data.country,
              state: res.data.data.state,
              pincode: res.data.data.pincode,
              postal_address: res.data.data.PostalAddress,
              phonestd: res.data.data.PhoneStd,
              mobile: res.data.data.mobile,
              principal_name: res.data.data.principalname,
              email: res.data.data.email,
              district: res.data.data.district,
              coordinating_teacher: res.data.data.coordinating_teacher,
              email_coordinator: res.data.data.email_coordinator,
              mobile_coordinator: res.data.data.mobile_coordinator,
              mode: res.data.data.Mode
            });



          } else {
            // alert("something is rong");
            setLoginErr('Either your login id or password do not match');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // navigate("/school-edit-details");
  }
  console.log("===user error", userError, passError)
  return (
    <div className="container-login">
      <marquee> Welcome to GREEN Olympiad</marquee>
      {/* <div className="container-inner-area">
        <Link to="/school-registration">
          <div className="smallcards-login">
            <div className="card-body">
              <img className="card-login-img" src={schoolimg} />
              <h4 className="card-text">
                NEW SCHOOL REGISTRATIONS <br /> ( Std 4-12 )
              </h4>
            </div>
          </div>
        </Link>
        <div className="login-card">
          <div className="imgcontainer">
            <h2>User Login</h2>
          </div>
          <div className="">
            <label>School Code:</label>
            <input
              type="text"
              placeholder="school code"
              name="uname"
              required
              onChange={setUserName}
            />
            <br />
            {
              userError?.user && userError.user.length > 5 ? <span className="error">{userError.user}</span> : null
            }
            <br />
            <label>Password:</label>

            <input type="password" placeholder="password" name="psw" required onChange={setPassword} />
            <br />
            {
              passError?.pass && passError.pass.length > 5 ? <span className="error">{passError.pass}</span> : null
            }
            <div>

              <button className="login-btn"
                onClick={handleSubmit}
              >
                Login
              </button>

            </div>
          </div>
          <Link to="/school-forget" className="forget">
            Forgot password?
          </Link>
        </div>
      </div> */}

      <div>
        <div className="my-5 login">
          <div className="container">
            <form>
              <div className="row">
                <div className="col-sm-6 col-lg-5  ">
                  <div className="card shadow p-3 p-md-4 ">
                    <div className="loginbox w-100">
                      <div className="loginInner">
                        <h3>School</h3>
                        <div className="newSchool text-center">
                          <img src="images/new-school.png" alt="" />
                          {/* <h4>New School</h4> */}
                          <h5>
                            <Link to="/school-registration" className="headingLogin link-light">
                              Registration
                            </Link>
                            <p style={{
                              fontSize: '25px'
                            }}>STD 4-12</p>
                            <br />



                            {/* <a href="school-register.html" className="stretched-link link-light">Registration</a> */}
                          </h5>

                        </div>
                        <div style={{
                          marginTop: '14px',
                          fontSize: '18px',
                          textAlign: 'center'
                        }}>
                          <a style={{
                            fontSize: '20px',
                            fontWeight: 'bold'
                          }} className="link-light" href={file} target="_blank">Guidelines to fill Registration form</a>
                          <p style={{
                            fontSize: '16px'
                          }}>Before filling the form,make sure you read all the instructions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-7 mt-3 mt-sm-0">
                  <div className="card shadow p-3 p-md-4">
                    <div className="section-title mb-4 text-muted">
                      <h6 className="font-bold ">School Login</h6>
                      <p>Welcome to school online registration</p>
                    </div>

                    <div className="">
                      <div className="form-wrapper">
                        {/* <input type="text" className="" placeholder="School Code" /> */}
                        <input
                          type="text"
                          placeholder="School code"
                          name="uname"
                          required
                          onChange={setUserName}
                        />
                        <br />
                        {
                          userError?.user && userError.user.length > 5 ? <span className="error">{userError.user}</span> : null
                        }
                      </div>
                      <div className="form-wrapper">
                        {/* <input type="password" class="" placeholder="Password" /> */}
                        <input type="password" placeholder="Password" name="psw" required onChange={setPassword} />
                        <br />
                        {
                          passError?.pass && passError.pass.length > 5 ? <span className="error">{passError.pass}</span> : null
                        }
                        <div className="text-end mt-3">
                          {/* <a href="forget-password.html" class="forgetpwd">Forgot Password</a> */}
                          <Link to="/school-forget" className="forget">
                            Forgot password?
                          </Link>
                        </div>
                      </div>
                      <div className="text-sm-center mt-4 mt-md-5">
                        <button className="btn btn-primary btnReg w-100" onClick={handleSubmit}>Login</button>
                      </div>
                      <h4 style={{ textAlign: 'center' }}>{loginErr}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
