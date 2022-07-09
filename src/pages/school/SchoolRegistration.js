import React from "react";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../../assets/css/style_new.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Error from './ErrorList';
import { API_ADMIN_URL_2, REGISTER_API, API_BASE_URL, API_END_POINTS } from "../../apis/api";
export default function SchoolRegistration() {
  const navigate = useNavigate();


  const [principalName, setprincipalName] = useState("");
  const [schoolName, setschoolName] = useState("");
  const [pinCode, setpinCode] = useState("");
  const [mobile, setmobile] = useState("");
  const [country, setcountry] = useState("");
  const [email, setemail] = useState("");
  const [state, setstate] = useState("");
  const [mobileverify, setmobileverify] = useState();
  const [emailverify, setemailverify] = useState();

  const [mobileOTP, setmobileOTP] = useState([-1, -1, -1, -1]);
  const [emailOTP, setemailOTP] = useState([-1, -1, -1, -1]);
  const [error_message, setError_message] = useState('');
  const [RegisterationClicked, setRegisterationClicked] = useState(0);

  const [data, setData] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateCityName, setCityStateName] = useState('Select State');
  const [cityStateList, setCityStateList] = useState([]);
  const [isIndain, setIsIndain] = useState(true);
  const [searchPin, setSearchpinCode] = useState('');
  const [cityState, setStateCity] = useState('');
  const [existingSchool, setExistingSchool] = useState([]);
  const [schoolDetail, setSchoolDetail] = useState(null);
  const [stateCityCode, setCityStateCode] = useState('');
  const [secondStateCity, setSeconStateCity] = useState([]);
  const [errorList, setErrorList] = useState(Error)
  const countryRef = useRef(null);
  const handleChange = (a, k) => {
    setData({ ...data, [k]: a });
  };


  const formValidate = (e) => {
    const { key, value } = e;
    let err = '';
    setError_message('');
    // mobileverify
    // emailverify

    switch (key) {
      case "principalName":
      case "schoolName":
      case "country":
      case "state":
      case "mobile":
        if (value.length < 1)
          err = (errorList.find(item => item.fieldNam === key).message);
        break;
      case "email":
        if (value.length === 0)
          err = (errorList.find(item => item.fieldNam === key).message);
        if (err === '') {
          let item = errorList.find(item => item.fieldNam === key);
          let regExp = RegExp(item.regex)
          err = (regExp.test(value) ? "" : item.message2);
        }
        break;
      case "pinCode":
        if (value.length === 0)
          err = (errorList.find(item => item.fieldNam === key).message);
        if (err === '' && isIndain) {
          let item = errorList.find(item => item.fieldNam === key);
          let regExp = RegExp(item.regex)
          err = regExp.test(value) ? "" : item.message2;
        }
        break;
      default:
        break;
    }
    setError_message(err)
    return err;
  };



  const checkAllField = () => {
    let arr = [principalName, pinCode, schoolName, mobile, email];
    let arrKey = ['principalName', 'pinCode', 'schoolName', 'mobile', 'email'];
    let err = '';
    arr.forEach((value, index) => {
      if (err === '') {
        err = formValidate({ 'key': arrKey[index], 'value': value });
      }

    })
    if (err === '' && !mobileverify) {
      err = 'Please verify mobile OTP'
      setError_message(err);
    }
    if (err === '' && !emailverify) {
      err = 'Please verify Email OTP'
      setError_message(err);
    }

    return err;
  };


  const mobileOTPset = (ev, index) => {
    mobileOTP[index] = ev.target.value;
    let res = mobileOTP.includes(-1);
    if (!res) {
      // match with OTP
      if (mobileOTP.join('') === '4444') {
        alert();
        setmobileverify(1)
      }
      else
        setmobileverify(0)
      console.log(mobileOTP);
    }
    setmobileOTP(mobileOTP);
  };


  const emailOTPset = (ev, index) => {
    emailOTP[index] = ev.target.value;
    let res = emailOTP.includes(-1);
    if (!res) {
      // match with OTP
      if (emailOTP.join('') === '4444') {
        alert();
        setemailverify(1)
      }
      else
        setemailverify(0)
      console.log(emailOTP);
      setemailOTP(emailOTP);
    }
  }







  // console.log("Error",Error)
  const getCountry = async () => {
    const countryList = await axios.get(`${API_BASE_URL}${API_END_POINTS.getCountry}`);
    //const countryList = await axios.get(`${API_END_POINTS.getCountry}`);
    try {

      if (countryList?.status == 200 && countryList?.data?.status) {
        setCountryList(countryList.data.list);
      } else {
        setCountryList([]);

      }
    } catch (e) {
      console.log("error")
    }
  }
  useEffect(() => {
    getCountry()
  }, []);

  const RegisterationApi = (e) => {
    setRegisterationClicked(1);
    let err = checkAllField();
    if (err)
      return err;
    const country_ = countryList.find(co => co.code === data.country) ?? { country: "India" };
    const statecityCode = cityStateList.find(state => {
      if (country_.code === "IN") {
        return state.statename === data.state
      } else {
        return data.state?.toLowerCase() === state?.cityname.toLowerCase()
      }
    })

    const RegisterationOptions = {
      principalname: principalName,
      schoolname: schoolName,
      pincode: pinCode,
      mobile: mobile,
      email: email,
      country: country_.country,
      state: data.state,
      mobileverify: mobileverify ?? false,
      emailverify: emailverify ?? false,
      isLocal: isIndain,
      stateCityCode: stateCityCode ? stateCityCode : country_.code === "IN" ? statecityCode?.srn : statecityCode?.citycode,
      countryCode: data.country
    };
    axios
      .post(`${API_BASE_URL}${API_END_POINTS?.saveNewSchool}`, RegisterationOptions)
      //.post(`${API_END_POINTS?.saveNewSchool}`, RegisterationOptions)
      .then((res) => {

        if (res.data) {
          alert("Account is created please login");
          navigate("/school-login");
          // localStorage.setItem("PrincipalName", principalName);
          // localStorage.setItem("PrincipalMobile", mobile);
          // localStorage.setItem("PrincipalEmail", email);
        } else {
          alert("something is rong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getCityState = async (countryCode) => {
    const endPoint = countryCode === 'IN' ? API_END_POINTS.getIndianState : API_END_POINTS.getInternationalCities + `'${countryCode}'`
    const cityStateList = await axios.get(`${API_BASE_URL}${endPoint}`);
    //const cityStateList = await axios.get(`${endPoint}`);
    if (cityStateList.status === 200 && cityStateList.data.status) {
      setCityStateList(cityStateList.data.list)
    } else {
      setCityStateList([])

    }


  }
  const changeCityState = (event) => {
    if (event.target.value !== "IN") {
      setIsIndain(false)
      setCityStateName('Select Provinced')
    } else {
      setIsIndain(true)
      setCityStateName('Select State')
    }
    getCityState(event.target.value)

  }
  const findSchools = async () => {
    if (isIndain) {
      let serverData = {
        "state": cityState,
        "pincode": searchPin
      }
      const data = await axios.post(`${API_BASE_URL}${API_END_POINTS.getIndainSchools}`, serverData);
      //const data = await axios.post(`${API_END_POINTS.getIndainSchools}`, serverData);
      if (data.status === 200 && data.data.status) {
        setExistingSchool(data.data.list)
      } else {
        setExistingSchool([])
      }
    } else {
      let serverData = {
        "city": cityState,
        "pincode": searchPin
      }
      const data = await axios.post(`${API_BASE_URL}${API_END_POINTS.getInternationalSchools}`, serverData);
      //const data = await axios.post(`${API_END_POINTS.getInternationalSchools}`, serverData);
      if (data.status === 200 && data.data.status) {
        setExistingSchool(data.data.list)
      } else {
        setExistingSchool([])
      }
      // internation schools search api //getInternationalSchools

    }
  }
  const getSchoolDetail = async (event) => {
    const schoolcode = event.target.value;
    const serverData = {
      schoolscode: schoolcode,
      isLocal: isIndain
    }
    const responseData = await axios.post(`${API_BASE_URL}${API_END_POINTS.getSchoolDetail}`, serverData);
    //const responseData = await axios.post(`${API_END_POINTS.getSchoolDetail}`, serverData);
    if (responseData.status === 200 && responseData.data.status) {
      const schoolDetail = responseData.data.schoolDetail;

      setSchoolDetail(responseData.data.schoolDetail);
      if (isIndain) {
        let perData = data;
        let newData = {
          ...perData,
          ... {
            'country': "IN",
            "state": schoolDetail?.state,

          }
        }
        setData(newData)
      } else {
        let perData = data;
        let contryCode = countryList.find(co => co?.country?.toLowerCase() === schoolDetail?.country?.toLowerCase())
        let newData = {
          ...perData,
          ... {
            'country': contryCode.code,
            "state": schoolDetail?.city
          }
        }
        setData(newData)
      }
      setpinCode(schoolDetail?.pincode)
      setschoolName(schoolDetail?.schoolName)
    } else {
      setExistingSchool(null)
    }
  }

  const setSecondState = (code) => {
    if (code !== "IN") {
      setIsIndain(false)
    } else {
      setIsIndain(true)
    }
    getCityState(code)
  }
  return (
    // <div className="container-login">
    //   <marquee> Welcome to Green Olympiad</marquee>

    //   <div className="top-label-section">
    //     <select className="dropdown" id="cars" onChange={changeCityState}>
    //       <option value="volvo" >Select Country</option>
    //       {
    //         countryList.map(co => {
    //           return (
    //             <option value={co.code} key={co.code}>{co?.country}</option>)
    //         })
    //       }
    //     </select>


    // <select className="dropdown" id="cars" onChange={e => {
    //   setStateCity(JSON.parse(e.target.value).stateCity);
    //   setCityStateCode(JSON.parse(e.target.value).code)
    // }}>
    //   <option value="">{stateCityName}</option>
    //   {cityStateList && cityStateList.map(ci => {
    //     return (
    //       <option key={ci?.cityname || ci?.statename} value={JSON.stringify({ stateCity: ci?.cityname || ci?.statename, code: ci?.srn || ci?.citycode })}>{ci?.cityname || ci?.statename}</option>)
    //   })
    //   }
    // </select>

    // done >>>>

    //     <input
    //       className="top-index"
    //       type="text"
    //       placeholder="Pin code"
    //       name="uname"
    //       // required
    //       style={{ width: 170 }}
    //       onChange={e => setSearchpinCode(e.target.value)}
    //     />


    //  done>>
    //     <button className="searchbtn" style={{ marginTop: 5 }} onClick={findSchools}>
    //       Search school
    //     </button>
    //   </div>
    //   <div className="dropdown-school-section">
    //     <select className="dropdown-school" id="cars" onChange={getSchoolDetail} >
    //       {
    //         existingSchool && existingSchool.map(school => {
    //           return (
    //             <option value={school?.schoolcode} key={school?.schoolcode}>{school?.schoolName}</option>
    //           )
    //         })
    //       }
    //       <option value="volvo">Other (When Enter Your College)</option>
    //     </select>
    //   </div>
    //   <div className="container-inner-area">
    //     <div className="form-card">
    //       <div className="imgcontainer">
    //         <h2>School Registration</h2>
    //       </div>

    //       <div className="">
    //         <label>Select Country:</label>
    //         <select
    //           className="dropdown"
    //           id="cars"
    //           value={data.country || ""}
    //           default={data.country || ""}
    //           selected={data.country}

    //           onChange={(e) => {
    //             handleChange(e.target.value, "country");
    //             setSecondState(e.target.value)
    //           }}
    //         >
    //           <option value="volvo">Select Country</option>
    //           {
    //             countryList.map(co => {
    //               return (
    //                 <option value={co.code} key={co.code}>{co?.country}</option>)
    //             })
    //           }

    //         </select>
    //         <br />
    //         <label>Select State:</label>
    //         <select
    //           className="dropdown"
    //           id="cars"
    //           value={data.state || ""}
    //           onChange={(e) => {
    //             handleChange(e.target.value, "state");
    //           }}
    //         >
    //           <option value="volvo">Select State/City</option>

    //           {cityStateList && cityStateList.map(ci => {
    //             return (
    //               <option key={ci?.cityname || ci?.statename} value={ci?.cityname || ci?.statename}>{ci.cityname || ci?.statename}</option>)
    //           })
    //           }
    //         </select>


    //         <br />
    //         <label>Principal Name:</label>
    //         <input
    //           type="text"
    //           placeholder="Principal name here"
    //           name="uname"
    //           required
    //           onChange={(principalName) =>
    //             setprincipalName(principalName.target.value)
    //           }
    //         />
    //         <br />
    //         <label>Scool Name:</label>
    //         <input
    //           type="text"
    //           placeholder="Scool name here"
    //           name="uname"
    //           required
    //           onChange={(schoolName) => setschoolName(schoolName.target.value)}
    //           value={schoolName}
    //         />
    //         <br />
    //         <label>Pin code:</label>
    //         <input
    //           type="text"
    //           placeholder="Enter Pin code"
    //           name="psw"
    //           required
    //           onChange={(pinCode) => setpinCode(pinCode.target.value)}
    //           value={pinCode}
    //         />
    //         <br />
    //         <label>Mobile:</label>
    //         <input
    //           type="text"
    //           placeholder="Mobile (Principal/Teacher)"
    //           name="psw"
    //           required
    //           onChange={(mobile) => setmobile(mobile.target.value)}
    //         />
    //         <br />
    //         <button className="otpbutton" style={{ marginLeft: 120 }}>
    //           Generate OTP
    //         </button>

    //         <div
    //           style={{ marginLeft: 65 }}
    //           className=" d-flex justify-content-center"
    //         >
    //           <label style={{ marginRight: 64 }}>Mobile OTP:</label>
    //           <input
    //             type="otp"
    //             maxlength="1"
    //             placeholder=""
    //             name="psw"
    //             required
    //             placeholder-type="number"
    //             onChange={(mobileverify) =>
    //               setmobileverify(mobileverify.target.value)
    //             }
    //           />
    //           <input
    //             type="otp"
    //             maxlength="1"
    //             placeholder=""
    //             name="psw"
    //             required
    //           />
    //           <input
    //             type="otp"
    //             maxlength="1"
    //             placeholder=""
    //             name="psw"
    //             required
    //           />
    //           <input
    //             type="otp"
    //             maxlength="1"
    //             placeholder=""
    //             name="psw"
    //             required
    //           />
    //           <button className="otpbutton">Verify</button>
    //         </div>

    //         <label>E-Mail:</label>
    //         <input
    //           type="text"
    //           placeholder="E-mail (Principal/Teacher)"
    //           name="psw"
    //           required
    //           onChange={(email) => setemail(email.target.value)}
    //         />
    //         <br />
    //         <button className="otpbutton" style={{ marginLeft: 120 }}>
    //           Generate OTP
    //         </button>
    //         <div
    //           style={{ marginLeft: 65 }}
    //           className=" d-flex justify-content-center"
    //         >
    //           <label style={{ marginRight: 64 }}>E-Mail OTP:</label>
    //           <input
    //             type="otp"
    //             maxlength="1"
    //             placeholder=""
    //             name="psw"
    //             required
    //             onChange={(emailverify) =>
    //               setemailverify(emailverify.target.value)
    //             }
    //           />
    //           <input
    //             type="otp"
    //             maxlength="1"
    //             placeholder=""
    //             name="psw"
    //             required
    //           />
    //           <input
    //             type="otp"
    //             maxlength="1"
    //             placeholder=""
    //             name="psw"
    //             required
    //           />
    //           <input
    //             type="otp"
    //             maxlength="1"
    //             placeholder=""
    //             name="psw"
    //             required
    //           />
    //           <button className="otpbutton">Verify</button>
    //         </div>
    //         <div>
    //           <button className="main-btn" onClick={RegisterationApi}>
    //             Registration
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>


    // code new start 
    <div className="container-fluid p-0 bg-left">
      <div className="row ">
        <div className="col-lg-7 mx-auto">
          <main className="p-3 p-sm-4 p-lg-5">
            <div className="section-title mb-4 text-muted">
              <h6 className="font-bold ">School Registration</h6>
              <p>Fill this form for registration</p>
            </div>

            <div className="shadow mb-5 rounded-16">
              <div className="p-4">
                <div className="row">
                  <div className="col-sm ">
                    <div className="form-wrapper ">

                      <select required onChange={changeCityState}>
                        <option value="volvo" >Select Country</option>
                        {
                          countryList.map(co => {
                            return (
                              <option value={co.code} key={co.code}>{co?.country}</option>)
                          })
                        }
                        {/* <option>Country</option>
                        <option value="India">India</option>
                        <option value="Japan">Japan</option>
                        <option value="Nepal">Nepal</option>
                        <option value="Bhutan">Bhutan</option> */}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm ">
                    <div className="form-wrapper ">

                      <select className="dropdown" id="cars" onChange={e => {
                        setStateCity(JSON.parse(e.target.value).stateCity);
                        setCityStateCode(JSON.parse(e.target.value).code)
                      }}>
                        <option value="">{stateCityName}</option>
                        {cityStateList && cityStateList.map(ci => {
                          return (
                            <option key={ci?.cityname || ci?.statename} value={JSON.stringify({ stateCity: ci?.cityname || ci?.statename, code: ci?.srn || ci?.citycode })}>{ci?.cityname || ci?.statename}</option>)
                        })
                        }
                      </select>

                      {/* <select required>
                        <option>State</option>
                        <option value="up">Uttar Pradesh</option>
                        <option value="mp">Madhya Pradesh</option>
                        <option value="goa">Goa</option>
                        <option value="uk">Uttrakhand</option>
                      </select> */}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm ">
                    <div className="form-wrapper ">

                      {/* <input type="number" placeholder="Pin code" required="" /> */}

                      <input

                        type="text"
                        placeholder="Pin code"
                        name="uname"
                        // required

                        onChange={e => setSearchpinCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-sm">
                    <button className="searchbtn btn btn-primary w-100" onClick={findSchools}>Search school</button>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-wrapper ">
                      {/* <select>
                        <option value="school-1">School 1</option>
                        <option value="school-2">School 2</option>
                        <option value="school-3">School 4</option>
                      </select> */}


                      <select className="dropdown-school" id="cars" onChange={getSchoolDetail} >
                        {
                          existingSchool && existingSchool.map(school => {
                            return (
                              <option value={school?.schoolcode} key={school?.schoolcode}>{school?.schoolName}</option>
                            )
                          })
                        }
                        <option value="volvo">Other (When Enter Your College)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="shadow bg-light rounded-16">
              <div className="p-4 ">
                <div className="row">
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>Country:</label>
                      {/* <select className="dropdown" id="cars">
                        <option value="volvo">Country</option>
                        <option value="volvo">India</option>
                        <option value="saab">Japan</option>
                        <option value="opel">Nepal</option>
                        <option value="audi">Bhutan</option>
                      </select> */}

                      <select
                        className="dropdown"
                        id="cars"
                        value={data.country || ""}
                        default={data.country || ""}
                        selected={data.country}

                        onChange={(e) => {
                          handleChange(e.target.value, "country");
                          setSecondState(e.target.value);
                          formValidate({ 'key': 'country', 'value': e.target.value });
                        }}
                      >
                        <option value="volvo">Select Country</option>
                        {
                          countryList.map(co => {
                            return (
                              <option value={co.code} key={co.code}>{co?.country}</option>)
                          })
                        }

                      </select>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>State:</label>
                      {/* <select className="dropdown" id="cars">
                        <option value="volvo">State</option>
                        <option value="volvo">Uttar Pradesh</option>
                        <option value="saab">Madhya Pradesh</option>
                        <option value="opel">Goa</option>
                        <option value="audi">Uttrakhand</option>
                      </select> */}
                      <select
                        className="dropdown"
                        id="cars"
                        value={data.state || ""}
                        onChange={(e) => {
                          handleChange(e.target.value, "state");
                          formValidate({ 'key': 'state', 'value': e.target.value });
                        }}
                      >
                        <option value="volvo">Select State/City</option>

                        {cityStateList && cityStateList.map(ci => {
                          return (
                            <option key={ci?.cityname || ci?.statename} value={ci?.cityname || ci?.statename}>{ci.cityname || ci?.statename}</option>)
                        })
                        }
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className=" col-sm">
                    <div className="form-wrapper">
                      <label>Principal Name:</label>
                      {/* <input type="text" placeholder="Principal name here" name="uname" required="" /> */}
                      <input
                        type="text"
                        placeholder="Principal name here"
                        name="uname"
                        required
                        onChange={(principalName) => {
                          setprincipalName(principalName.target.value);
                          formValidate({ 'key': 'principalName', 'value': principalName.target.value })
                        }
                        }
                      />
                    </div>
                  </div>
                  <div className=" col-sm">
                    <div className="form-wrapper">
                      <label>Pin code:</label>
                      {/* <input type="text" placeholder="Enter Pin code" name="psw" required="" /> */}
                      <input
                        type="text"
                        placeholder="Enter Pin code"
                        name="psw"
                        required
                        onChange={(pinCode) => {
                          setpinCode(pinCode.target.value);
                          formValidate({ 'key': 'pinCode', 'value': pinCode.target.value })
                        }}
                        value={pinCode}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-wrapper">
                  <label>School Name:</label>
                  <input type="text" placeholder="School name here" name="uname" required={true}
                    onChange={(schoolName) => {
                      setschoolName(schoolName.target.value);
                      formValidate({ 'key': 'schoolName', 'value': schoolName.target.value })
                    }}
                  />
                </div>


                <div className="row">
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>Mobile:</label>
                      <div className="d-flex">
                        {/* <input type="text" className="me-3" placeholder="Mobile (Principal/Teacher)" name="psw" required="" /> */}
                        <input
                          type="text"
                          className="me-3"
                          placeholder="Mobile (Principal/Teacher)"
                          name="psw"
                          required={true}
                          onChange={(mobile) => {
                            setmobile(mobile.target.value);
                            formValidate({ 'key': 'mobile', 'value': mobile.target.value });
                          }}
                        />
                        <button className="otbutton flex-grow-1 btn btn-accent" style={{ whiteSpace: 'nowrap' }}>Generate OTP</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>Mobile OTP:</label>
                      <div className=" d-flex justify-content-between">
                        <input type="text" className="me-3 pw1" maxLength={1} onChange={(ev) => { mobileOTPset(ev, 0) }} name="psw0" placeholder-type="number" />
                        <input type="text" className="me-3 pw2" maxLength={1} onChange={(ev) => { mobileOTPset(ev, 1) }} name="psw1" />
                        <input type="text" className="me-3 pw3" maxLength={1} onChange={(ev) => { mobileOTPset(ev, 2) }} name="psw2" />
                        <input type="text" className="me-3 pw4" maxLength={1} onChange={(ev) => { mobileOTPset(ev, 3) }} name="psw3" />

                        <button className="otbutton btn btn-accent">Verify</button>{mobileverify}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>E-Mail:</label>
                      <div className="d-flex">
                        {/* <input type="text" className="me-3" placeholder="Mobile (Principal/Teacher)" name="psw" required="" /> */}
                        <input
                          type="text"
                          placeholder="E-mail (Principal/Teacher)"
                          name="psw"
                          required
                          onChange={(email) => {
                            setemail(email.target.value);
                            formValidate({ 'key': 'email', 'value': email.target.value })
                          }}
                        />
                        <button className="otbutton btn btn-accent" style={{ whiteSpace: 'nowrap' }}>Generate OTP</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div className="form-wrapper">
                      <label>E-Mail OTP:</label>
                      <div className=" d-flex justify-content-between">
                        <input type="text" className="me-3" maxLength={1} onChange={(ev) => { emailOTPset(ev, 0) }} placeholder="" name="psw_1" required="" placeholder-type="number" />
                        <input type="text" className="me-3" maxLength={1} onChange={(ev) => { emailOTPset(ev, 1) }} placeholder="" name="psw_2" required="" />
                        <input type="text" className="me-3" maxLength={1} onChange={(ev) => { emailOTPset(ev, 2) }} placeholder="" name="psw_3" required="" />
                        <input type="text" className="me-3" maxLength={1} onChange={(ev) => { emailOTPset(ev, 3) }} placeholder="" name="psw_4" required="" />
                        <button className="otbutton btn btn-accent">Verify</button> {emailverify}
                      </div>
                    </div>
                  </div>
                </div>


                <div className="mt-4 mb-3">
                  {RegisterationClicked === 1 && error_message && (<div className="alert alert-danger w-100" role="alert">
                    {error_message}
                  </div>)}
                  <div className="d-flex justify-content-center">
                    {/* <button className="btn btn-primary w-50" type="submit">Registration</button> */}
                    <button className="btn btn-primary w-50" onClick={RegisterationApi}>Registration</button>
                    {/* <!-- <button class="btn btn-secondary" type="reset">Cancel</button> --> */}
                  </div>
                  {/* <!-- <a href="./uploadstudentdata.html"> --> */}
                </div>

              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
    //  code new ends
  );
}
