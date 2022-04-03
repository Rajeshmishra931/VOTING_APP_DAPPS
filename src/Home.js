import React ,{useEffect,useState} from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import {useAuth} from './AuthContext'
import { auth, db } from './Firebase'
import { useHistory } from 'react-router'
import { collection, query, where, getDocs } from "firebase/firestore";
import { signOut } from 'firebase/auth'
import Election from './Election'
import web3 from './web3'

function Home() {

    const {currentuser}=useAuth();
    const [name,setname]=useState();
    const history=useHistory();
    const [manager,setmanager]=useState();


    const logout=async()=>{

        signOut(auth);
        history.push("/")


    }

    const electiondata=async()=>{

        const accounts=await web3.eth.getAccounts();
        const manager=await Election.methods.manager().call();
        setmanager(manager);

    }

    const getdata=async()=>{

    const q = query(collection(db, "users"), where("uid", "==", currentuser.uid));

    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
       setname(doc.data().name)
});

    }
    useEffect(() => {
        electiondata();
        getdata();
    }, [])

    return (
      
            <div className="home1">
                    <div className="backg">
                        <h3 className="name">Welcome <br/> {name}</h3>
                        <br/>
                
                        <hr className="tag"/>

                        <ul className="ul111">
                           <Link className="link" to="/home"> <li className="li111">Registration</li></Link>
                            <Link className="link" to="/voting" >  <li className="li111">Voting</li></Link>
                           <Link className="link" to="/results"> <li className="li111">Results</li></Link>
                            <li className="li111" onClick={logout} >Logout</li>
                        </ul>


                        <h4 className="managed">Managed by <br></br>
                            {manager}
                        </h4>


                    </div>

            
        </div>
    )
}

export default Home 
