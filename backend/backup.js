import { useNavigate } from "react-router-dom";

import "./style.css";
import { useState, useEffect } from "react";
import API from "../../utils/API.js";
import { second } from '../Loading/Loading.js'

const CardGroup = () => {
  const [balances, setBalances] = useState();
  const [loading, setLoading]=useState(false);

  const navigate = useNavigate();

  const handleMakePayment = (e) => {
    e.preventDefault();
    navigate("/payment")

  }

  // useEffect(() => {
  //   API.getBalances()
  //     .then((res) => setBalances(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(()=>{
       const fetchData = async () => {
                setLoading(true);
          const res = await API.getBalances();
          setBalances(res.data);  
          setLoading(false);    
       }

       fetchData()
  },[])
 
console.log(balances)
// const {minimum_payment,pending_charges,posted_charges} = balances[0];
	return (
       

  <div className="card-group dashboard">
  <div className="card statement">
    <div className="card-body">
      <h5 className="card-title">Statement Balance</h5>
      <p className="card-text">$834.10</p>
      <p className="card-text"><small className="text">Oct 15 - Nov 12</small></p>
      <a className="btn btn-outline-primary" href="/activity">View Transactions</a>
    </div>
  </div>
  <div className="card payment">
    <div className="card-body">
      <h5 className="card-title">Make A Payment</h5>
      <p className="card-text">Today</p>
      <p className="card-text"><small className="text">Minimum Payment Due $40.00</small></p>
      <button className="btn btn-outline-primary" type="submit" onClick={handleMakePayment}>Make a Payment</button>
    </div>
  </div>
  <div className="card balance">
    <div className="card-body">
      <h5 className="card-title">Total Balance</h5>
      <p className="card-text">$834.10</p>
      <p className="card-text"><small className="text">Available Credit $10,205.00</small></p>
      <a className="nav-link active" aria-current="page" 
       
      href="#balancedetails">Balance Details</a>
    </div>
  </div>

</div> 



	);
}

export default CardGroup;