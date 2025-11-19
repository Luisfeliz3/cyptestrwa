import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; //Navigate
import Dashboard from "./pages/Dashboard/Dashboard";
import Activity from "./pages/Activity/Activity";
import Navbar from "./components/NavBar/Navbar";
import userAPI from "./utils/userAPI";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import MakePayment from "./pages/MakePayment/MakePayment";
import AccountServices from "./pages/AccountServices/AccountServices";
import Disputes from "./pages/Disputes/Disputes";
import AccountManagement from "./pages/AccountManagement/AccountManagement";

// import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  const [userState, setUserState] = useState();

  document.title = "Payment Center";

  useEffect(() => {
    // auth user on first render
    authenticate();
  }, []);

  //user authentication
  //user authentication
  const authenticate = async () => {
    try {
      const { data } = await userAPI.authenticateUser();
      // console.log("user:", data);
      setUserState(data);
    } catch (err) {
      return console.log("registered user:", err.response);
    }
  };

  return (
    <div className="app-container">   
      
      <div>
      <Navbar/>
        <BrowserRouter>
          <div>
          
            <Routes>
              <Route
                exact
                path="/login"
                element={
                  <Login
                    setUserState={setUserState}
                    authenticate={authenticate}
                  />
                }
              ></Route>

             
              <Route exact path="/" element={<Dashboard />}></Route>
              <Route exact path="/dashboard" element={<Dashboard />}></Route>

              <Route
                exact
                path="/signup"
                element={
                  <Signup authenticate={authenticate} user={userState} />
                }
              >
              </Route>

    <Route
                exact
                path="/helpcenter"
                element={<Disputes {...userState} />}
              ></Route>
    <Route
                exact
                path="/disputes"
                element={<Disputes {...userState} />}
              ></Route>
    <Route
                exact
                path="/account-management"
                element={<AccountManagement {...userState} />}
              ></Route>
              <Route
                exact
                path="/activity"
                element={<Activity {...userState} />}
              ></Route>

                          <Route
                exact
                path="/accountservices"
                element={<AccountServices {...userState} />}
              ></Route>

              <Route exact path="/payment" element={<MakePayment />}></Route>

            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
