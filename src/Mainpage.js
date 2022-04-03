import React from 'react'
import './Mainpage.css'
import { Link } from 'react-router-dom' 
function Mainpage() {
    return ( 
        <div className="mainpagess mainpage" >
            <div className="navbar">
                <div>
                    <h1>VOTING APP</h1>
                    </div>

                    <div>
                        <ul className="unordered">
                           <Link className="link" to="/login"> <li className="lists">Voter Login</li>    </Link>
                            <Link className="link" to="/adminlogin"><li className="lists">Admin Login</li></Link>
                        </ul>
                    </div>

            </div>

            <div className="imgg" >
               
                <img className="imagexyz" src={require("./photo/web.jpg").default}></img>
                <h1 className="simple">Elections made<br/> Simple</h1>
            </div>
            
        </div> 
    )
}

export default Mainpage
