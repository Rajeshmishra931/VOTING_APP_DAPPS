import React,{useState} from 'react'
import {useAuth} from './AuthContext'
import {useHistory} from 'react-router'

function Adminlogin() {

    const [email,setemail]=useState();
    const [pass,setpass]=useState();
    const {login}=useAuth();
    const history=useHistory();


    const loginuser=async()=>{
        try{

            await login(email,pass)
            history.push("/adminhome");

          }
          catch(e){
            alert(e.message);
          }
  
    }

    return (
        <div>
 <div className="login11">
          <h2 className="heh11">Admin Sign In</h2>
          <div className="fiel11">
            <div className="div11">
              <input
                className="des111"
                type="email"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                placeholder="Enter your Email"
        
              
              ></input>
            </div>

            <div className="div11">
              <input
                className="des211"
                type="password"
                value={pass}
                onChange={(e)=>setpass(e.target.value)}
                placeholder="Enter password"
             
              ></input>
            </div>
          </div>
          <h3 className="btnsub11" onClick={loginuser}  >
            Login
          </h3>
         
        </div>

            
        </div>
    )
}

export default Adminlogin
