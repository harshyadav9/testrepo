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
function App() {


  // let login = localStorage.getItem(JSON.parse('login'));
  // console.log("login", login);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const handleLogged = (flag) => {
    setIsLoggedIn(flag);
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, []);


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
            <>   <Route
              path="/school-registration"
              element={<SchoolRegistration />}
              exact
            /></>

          )}

          {!isLoggedIn && (
            <>   <Route
              path="/student-registration"
              element={<StudentRegistration />}
              exact
            /></>

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
              <Route path="/school-forget" element={<SchoolForget />} exact />


              {/* Student */}
              <Route path="/" element={<Home />} exact />


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
              <Route path="/student-forget" element={<StudentForget />} exact />
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
