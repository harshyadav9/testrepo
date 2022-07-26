import Header from "./pages/main/Header";
import Footer from "./pages/main/Footer";
import Home from "./pages/main/Home";
import SchoolLogin from "./pages/school/SchoolLogin";
import SchoolRegistration from "./pages/school/SchoolRegistration";
import SchoolEditDetails from "./pages/school/SchoolEditDetails";
import SchoolUploadData from "./pages/school/SchoolUploadData";
import SchoolPayment from "./pages/school/SchoolPayment";
import SchoolSlot from "./pages/school/SchoolSlot";
import SchoolApplicationStatus from "./pages/school/SchoolApplicationStatus";
import SchoolHelpdeskTicket from "./pages/school/SchoolHelpdeskTicket";
import SchoolViewHelpdeskTicket from "./pages/school/SchoolViewHelpdeskTicket";
import SchoolCertificate from "./pages/school/SchoolCertificate";
import SchoolChangePassword from "./pages/school/SchoolChangePassword";
import SchoolForget from "./pages/school/SchoolForget";

import StudentLogin from "./pages/student/StudentLogin";
import StudentRegistration from "./pages/student/StudentRegistration";
import StudentEditDetails from "./pages/student/StudentEditDetails";
import StudentUploadData from "./pages/student/StudentUploadData";
import StudentPayment from "./pages/student/StudentPayment";
import StudentSlot from "./pages/student/StudentSlot";
import StudentApplicationStatus from "./pages/student/StudentApplicationStatus";
import StudentHelpdeskTicket from "./pages/student/StudentHelpdeskTicket";
import StudentViewHelpdeskTicket from "./pages/student/StudentViewHelpdeskTicket";
import StudentCertificate from "./pages/student/StudentCertificate";
import StudentChangePassword from "./pages/student/StudentChangePassword";
import StudentForget from "./pages/student/StudentForget";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentDataProvider from "./pages/context/datacontext";
import Instructions from "./pages/main/instructions";
import { useNavigate } from "react-router";
import SchoolRollNoGenerate from "./pages/school/SchoolRollNoGenerate";
import { useEffect, useState } from "react";
import StudentIndigoRegistration from "./pages/indigo/StudentRegistration";
import SchoolInLogin from "./pages/indigo/StudentLogin";
import StudentInEditDetails from "./pages/indigo/StudentEditDetails";
import StudentInSlot from "./pages/indigo/StudentSlot";
import StudentInPayment from "./pages/indigo/StudentPayment";
import StudentInApplicationStatus from "./pages/indigo/StudentApplicationStatus";
import StudentInHelpdeskTicket from "./pages/indigo/StudentHelpdeskTicket";
import StudentInViewHelpdeskTicket from "./pages/indigo/StudentViewHelpdeskTicket";
import StudentInChangePassword from "./pages/indigo/StudentChangePassword";
import StudentInforget from "./pages/indigo/StudentForget";
import HomeAdmin from "./pages/admin/main";
import AdminLogin from "./pages/admin/adminLogin";
import AdminPayment from "./pages/admin/adminPayment";
function App() {


  // let login = localStorage.getItem(JSON.parse('login'));
  // console.log("login", login);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState({});
  const navigate = useNavigate();
  const handleLogged = (flag) => {
    console.log("handleLogged", flag)
    setIsLoggedIn(flag);
  }

  const handeAdmin = (obj) => {
    console.log("handeAdmin", obj)
    setIsAdmin((prevObj) => { return { ...prevObj, ...obj } });
  }

  useEffect(() => {
    console.log("isLoggedIn", isLoggedIn)
    if (!isLoggedIn) {
      navigate("/");
    }

  }, []);


  useEffect(() => {
    if (isAdmin.isLoggedIn) {
      navigate(`/${isAdmin.page}`);
    }

  }, [isAdmin]);


  return (
    <>
      {/* <BrowserRouter basename="/"> */}
      <StudentDataProvider>
        <Header isLogged={handleLogged} />
        <Routes>
          {/* School */}
          {!isLoggedIn && (
            <> <Route path="/" element={<Home isLogged={handleLogged} />} exact /></>

          )}

          {!isLoggedIn && (
            <>  <Route path="/school-login" element={<SchoolLogin isLogged={handleLogged} />} exact /></>

          )}

          {!isLoggedIn && (
            <>   <Route path="/student-login" element={<StudentLogin isLogged={handleLogged} />} exact /></>

          )}

          {!isLoggedIn && (
            <>   <Route path="/student-Inlogin" element={<SchoolInLogin isLogged={handleLogged} />} exact /></>

          )}


          <>   <Route path="/admin" element={<HomeAdmin isLogged={handeAdmin} />} exact /></>



          {(isAdmin.page === 'admin-login' && isAdmin.isLoggedIn === true) && (
            <>   <Route
              path="/admin-login"
              element={<AdminLogin isLogged={handeAdmin} />}
              exact
            /></>

          )}


          {(isAdmin.page === 'admin-payment' && isAdmin.isLoggedIn === true) && (
            <>   <Route
              path="/admin-payment"
              element={<AdminPayment isLogged={handeAdmin} />}
              exact
            /></>

          )}















          {!isLoggedIn && (
            <>   <Route
              path="/school-registration"
              element={<SchoolRegistration isLogged={handleLogged} />}
              exact
            /></>

          )}

          {!isLoggedIn && (
            <>   <Route
              path="/student-registration"
              element={<StudentRegistration isLogged={handleLogged} />}
              exact
            /></>

          )}

          {!isLoggedIn && (
            <>   <Route
              path="/student-Indigo-registration"
              element={<StudentIndigoRegistration isLogged={handleLogged} />}
              exact
            /></>

          )}

          {!isLoggedIn && (
            <>    <Route path="/student-forget" element={<StudentForget />} exact /></>

          )}

          {!isLoggedIn && (
            <>   <Route path="/school-forget" element={<SchoolForget />} exact /></>

          )}

          {!isLoggedIn && (
            <>  <Route path="/student-Inforget" element={<StudentInforget />} exact /></>

          )}




          {isLoggedIn && (
            <>

              <Route path="/Instructions" element={<Instructions />} exact />


              <Route
                path="/school-edit-details"
                element={<SchoolEditDetails />}
                exact
              />
              <Route
                path="/school-upload-data"
                element={<SchoolUploadData />}
                exact
              />
              <Route path="/school-rollNo" element={<SchoolRollNoGenerate />} exact />
              <Route path="/school-payment" element={<SchoolPayment />} exact />
              <Route path="/school-slot" element={<SchoolSlot />} exact />
              <Route path="/student-slot" element={<StudentSlot />} exact />

              <Route
                path="/school-application-status"
                element={<SchoolApplicationStatus />}
                exact
              />
              <Route
                path="/school-helpdesk-ticket"
                element={<SchoolHelpdeskTicket />}
                exact
              />
              <Route
                path="/school-view-helpdesk-ticket"
                element={<SchoolViewHelpdeskTicket />}
                exact
              />
              <Route
                path="/school-certificate"
                element={<SchoolCertificate />}
                exact
              />
              <Route
                path="/school-change-password"
                element={<SchoolChangePassword />}
                exact
              />



              {/* Student */}
              <Route path="/" element={<Home />} exact />
              StudentInEditDetails

              <Route
                path="/student-edit-details"
                element={<StudentEditDetails />}
                exact
              />
              <Route
                path="/student-upload-data"
                element={<StudentUploadData />}
                exact
              />
              <Route path="/student-payment" element={<StudentPayment />} exact />
              <Route
                path="/student-application-status"
                element={<StudentApplicationStatus />}
                exact
              />
              <Route
                path="/student-helpdesk-ticket"
                element={<StudentHelpdeskTicket />}
                exact
              />
              <Route
                path="/student-view-helpdesk-ticket"
                element={<StudentViewHelpdeskTicket />}
                exact
              />
              <Route
                path="/student-certificate"
                element={<StudentCertificate />}
                exact
              />
              <Route
                path="/student-change-password"
                element={<StudentChangePassword />}
                exact
              />


              {/* go for youth */}



              <Route
                path="/student-Inedit-details"
                element={<StudentInEditDetails />}
                exact
              />

              <Route path="/student-Inslot" element={< StudentInSlot />} exact />
              <Route path="/student-Inpayment" element={<StudentInPayment />} exact />
              <Route
                path="/student-Inapplication-status"
                element={<StudentInApplicationStatus />}
                exact
              />

              <Route
                path="/student-Inhelpdesk-ticket"
                element={<StudentInHelpdeskTicket />}
                exact
              />

              <Route
                path="/student-Inview-helpdesk-ticket"
                element={<StudentInViewHelpdeskTicket />}
                exact
              />
              <Route
                path="/student-Inchange-password"
                element={<StudentInChangePassword />}
                exact
              />



            </>

          )}






        </Routes>
        <Footer />
      </StudentDataProvider>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
