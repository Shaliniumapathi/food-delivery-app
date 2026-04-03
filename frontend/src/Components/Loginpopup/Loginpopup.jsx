import React from 'react'
import './Loginpopup.css'
import {useState, useContext} from 'react';
import {X} from 'lucide-react'

import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

function Loginpopup({setShowLogin}) {

  const{url, token, setToken, setUser} = useContext(StoreContext);
  const[currentState,setcurrentState ] = useState("Login")
  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  })

  const onClickHandler =(event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(Data => ({...Data, [name]:value}))
  }

 const isLogin = async (event)=>{
      event.preventDefault();
      let newURl = url;

if (currentState === "Login") {
  newURl = newURl + "/api/user/login";
} else {
  newURl = newURl + "/api/user/register";
}

      const response =await axios.post(newURl, data);
      if(response.data.success){
       setToken(response.data.token);
       setUser(response.data.user || null);
       localStorage.setItem("token",response.data.token)
       setShowLogin(false);
      }
      else{
        alert(response.data.message);
      }
 }

  return (
    <div className='login-popup'>
      <form onSubmit={isLogin} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
         <X  className="close-icon" onClick={() => setShowLogin(false)} />
        </div>
        <div className="login-popup-inputs">
          {currentState==="Login"?<></>:<input name='name' onChange={onClickHandler} value={data.name} type='text' placeholder="your name" required/>}
          
          <input  name='email' onChange={onClickHandler} value={data.email} type='email' placeholder="your email" required/>
          <input name='password' onChange={onClickHandler} value={data.password} type='password' placeholder="Passoword" required/>
        </div>
          <button type="submit">{currentState==="Sign Up"? "Create Account": "Login"}</button>
          <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing </p>
          </div>
          {currentState==="Login"?
          <p>Create a new Account ? <span onClick={()=>{setcurrentState("Sign Up")}}>Click hear</span></p>
        :<p>Already have an Account? <span onClick={()=>{setcurrentState("Login")}}>Login here</span></p>}
          
          
      </form>
    </div>
  )
}

export default Loginpopup