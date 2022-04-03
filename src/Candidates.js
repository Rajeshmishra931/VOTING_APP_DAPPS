import { collection, getDocs,query,where } from 'firebase/firestore';
import React,{useState,useEffect} from 'react'
import './Candidates.css'
import { db } from './Firebase';
import { useAuth } from './AuthContext';
import Election from './Election'
import web3 from './web3'

function Candidates(props) {

    const {currentuser}=useAuth();
    const [account,setaccount]=useState([]);
    const [address,setaddress]=useState();


    const getregisteredaddress=async()=>{
      const q = query(collection(db, "approved"), where("uid", "==", currentuser.uid));

      const snap=await getDocs(q);
      snap.forEach((doc)=>{
        setaddress(doc.data().address);
      })

    }

    const vote=async()=>{

        const account=await web3.eth.getAccounts(); 
        setaccount(account);

       if(address!=account[0]){
        alert("Wallet invalid , use registered wallet to vote")
        return ;
       }
        try{
          await Election.methods.vote(parseInt(props.id)).send({
            from:account[0]
          })

          alert("You have voted Successfully.Wait For results to come")
        }


        catch(e){
    
        }
  
  

  
  

    }


    useEffect(() => {
     getregisteredaddress();
    }, [])

    return (
        <div className="voter1">
                <div>
                <img className="image" src={props.imageurl}></img>
                </div>
                <div className="details">
                <h2 className="m1">{props.name.toUpperCase()}</h2>
                <h3 className="m2">Party - {props.party}</h3>
                <h3 className="m3">Qualification - {props.qualification}</h3>

                </div>

                <button className="button" onClick={vote}>Vote</button>
               


            
        </div>
    )
}

export default Candidates
