import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import {auth,registerWithEmailAndPassword,db} from './Firebase';
import {useAuth} from './AuthContext';
import { useHistory } from 'react-router';
import { collection, addDoc } from "firebase/firestore"; 
import Background from '../src/photo/register-to-vote.png' 
import './App.css'
 
function Signup() {

    const [email,setemail]=useState();
    const [name,setname]=useState();
    const [pass,setpass]=useState();
    const {signup,currentuser}=useAuth();
    const history=useHistory();

    const registeruser=async()=>{


        try{
        const res=await signup(email,pass);
        const user=res.user;

           

            const docRef = await addDoc(collection(db, "users"), {
                name: name,
                uid:user.uid,
                email:email
              });
              alert("signupped")
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
          <h5 className="he111">Already Registered??</h5>
          <Link className="link" to="/login">
            <h6 className="bbbb11">Sign In</h6>
          </Link>
        </div>

        <div className="img111"></div>

        <div className="login11">
          <h2 className="heh11">Sign Up</h2>
          <div className="fiel11">

          <div className="div11">
              <input
                className="des111"
                value={name}
                onChange={(e)=>setname(e.target.value)}
                type="email"
                placeholder="Enter your Name"
            
                
              ></input>
            </div>
            <div className="div11">
              <input
                className="des111"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                type="email"
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
          <h3 className="btnsub11" onClick={registeruser} >
            Sign Up
          </h3>
         
        </div>
      </div>
            
        </div>
    )
}

export default Signup
