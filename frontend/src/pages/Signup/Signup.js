import React, { useState } from "react";
import userAPI from "../../utils/userAPI";
import {  Navigate } from "react-router-dom";
import "./styles.css"

 


function Signup ({setState, authenticate}) {
 const [user, setUser] = useState({
  email: "",
  username: "",
  password: "",
  passwordConf: ""
})


  
  const handleInputChange = event => {
    const { name, value } = event.target;
    
   setState({
      [name]: value
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (user.email && user.password) {
      userAPI.signup({
        username: user.username,
        email: user.email,
        password: user.password,
        passwordConf: user.passwordConf,
      })
      .then(res => {
          if(res.status === 200 ){
            authenticate();
            return <Navigate to="/" />
          }
        })
        .catch(err => console.log(err.response.data));
    }
  };

 
    return (


      <div>
      <div id="signup">
        <div className=" signup-header">
          <h3 className=" header-title">Sign Up to Login</h3>
        </div>
        <form className="signup-form" >
          <div className="input-container">
              <input
                value={user.username}
                onChange={handleInputChange}
                name="username"
                placeholder="username (required)"
                className="signup-username-input"
              />
              <input
                value={user.email}
                onChange={handleInputChange}
                name="email"
                placeholder="email (required)"
                className="signup-email-input"
              />
              <input
                value={user.password}
                onChange={handleInputChange}
                name="password"
                placeholder="(required)"
                type="password"
                className="signup-password-input"
              />
              <input
                value={user.passwordConf}
                onChange={handleInputChange}
                name="passwordConf"
                placeholder="(required)"
                type="password"
                className="signup-confirm-password-input"
              />
              </div>
              <button
              className="signup-signup-now btn btn-primary"
                // disabled={!(this.state.email && this.state.password)}
                onClick={handleFormSubmit}
              >
                signup
              </button>
              <a to="/login" href="/404"
              >
               <button
               className="signup-login-now btn btn-primary"
               > Login </button>
             </a>
            </form>
        </div>

        </div>
          
         
     
    );
  } 


export default Signup;


 