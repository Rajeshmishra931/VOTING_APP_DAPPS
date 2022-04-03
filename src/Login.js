import React,{useState} from 'react'
import './Login.css'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import {useAuth} from './AuthContext'

function Login() {

  const {login}=useAuth();
  const history=useHistory();
  const [email,setemail]=useState();
  const [pass,setpass]=useState();

    const loginuser=async()=>{

        try{

          await login(email,pass)
          history.push("/home")

        }
        catch(e){
          alert(e.message);
        }

    }

    return (
        <div>

<div className="pag11">
        <div className="page11">
          <h5 className="he111">New here??</h5>
          <Link className="link" to="/signup">
            <h6 className="bbbb11">Sign up</h6>
          </Link>
        </div>

        <div className="img111"></div>

        <div className="login11">
          <h2 className="heh11">Sign In</h2>
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


            
        </div>
    )
}

export default Login
