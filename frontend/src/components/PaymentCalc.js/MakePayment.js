import React from 'react';
import { useState, useEffect } from "react";

const MakePayment = () => {
    const [balances, setBalances] = useState();


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
        // console.log("Hello from balances")
        }</div>
  )
}

export default MakePayment