import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => (
   <Route >
      {children.props._id
       ? children
       : <Navigate to='/activity' />}
   </Route>
)
 export default ProtectedRoute;