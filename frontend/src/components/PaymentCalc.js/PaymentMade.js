import React from 'react'
import { useState, useEffect } from "react";
import API from "../../utils/API.js";
import Loading from "../../components/Loading/Loading.js";
const PaymentMade = ({payment}) => {


    const [balances, setBalances] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          const res = await API.getBalances();
          setBalances(res.data);
          setLoading(false);
        };
    
        fetchData();
      }, []);
    

  return (
    <div>{
        console.log("Hello from balances")
        }</div>
  )
}

export default PaymentMade