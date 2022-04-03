import React ,{useState,useEffect} from 'react'
import { db } from './Firebase';
import './Registration.css'
import web3 from './web3';
import {useAuth} from './AuthContext'
import { collection, query, where, getDocs ,addDoc,doc} from "firebase/firestore";


function Registration() {


    const [aadhar,setaadhar]=useState();
    const {currentuser}=useAuth();
    const [approved,setapproved]=useState(false);
    const [address,setaddress]=useState(null);
    const [name,setname]=useState();
    const [phase,setphase]=useState();
    const [wallet,setwallet]=useState();
    const [aad,setaad]=useState();

    
    const approvedstatus=async()=>{
            const q=await collection(db,"approved");
            const snap=await getDocs(q);
            snap.forEach((data)=>{
                if(data.data().uid===currentuser.uid)
                {   setaad(data.data().aadhar)
                    setwallet(data.data().address)
                setapproved(true);
                }
            })
    }


    const getwallet=async()=>{

        const accounts=await web3.eth.getAccounts();
        console.log(accounts[0]);
        setaddress(accounts[0]);

    }
    const getname=async()=>{

        const q = query(collection(db, "users"), where("uid", "==", currentuser.uid));

        const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
           setname(doc.data().name)
    });

    }

    const getphase=async()=>{
            const q=await collection(db,"phase");
            const snap=await getDocs(q);

            snap.forEach((doc)=>{
                setphase(doc.data().phase)
            })
    }


    useEffect(() => {
        getwallet();
        getname();
        approvedstatus();
        getphase();
    }, [])

    const proceed=async()=>{

        if(approved)
        {
            alert("You are Already registered")
            return;
        }

        const q=await collection(db,"registration");

        const snap=await getDocs(q);

        var flag=0;

        snap.forEach((doc)=>{
            if(doc.data().aadhar===aadhar || doc.data().address===address)
            {
                flag=1;
                alert("AAdhar or Ethereum address already taken")
                return ;
            }

        })

        if(flag==0){

        try{
        const docRef = await addDoc(collection(db, "registration"), {
            uid:currentuser.uid,
            aadhar:aadhar,
            address:address,
            name:name,
            isVoted:false
          });

          alert("You will be registered soon")

        }

        catch(e){
            alert(e.message)
        }

    }

    }



    return (

        <div className="regis">

                
            <h1 className="head">Register Yourself</h1>
            {

                phase=="registration"?(

        <div className="registration">
            <label className="label">Enter your AAdhar</label>
            <br/>
            <input className="input"  value={aadhar} onChange={(e)=>setaadhar(e.target.value)}  type="text"></input>
            <br/>

            <label className="label">Your Ethereum Wallet Address(From Metamask wallet)</label>
            <br/>
            <input className="input"  type="text" placeholder={address} readOnly ></input>
            <br/>

            <button className="button1" onClick={proceed} >Proceed</button>


            
        </div>
                ):<h2 className="registration">Registrations phase is done . You can't Register Now </h2>
    }



        <table id="customers">
            <tr>
                <th>Name</th>
                <th>Your AAdhar</th>
                <th>Your Wallet Address</th>
                <th>Registration Status</th>
            </tr>
            <tr>
           
    <td>{name}</td>
    <td>{aad}</td>
    <td>{wallet}</td>
    {
        approved? 
        <td><button  style={{backgroundColor:"green"}} className="btn">Registered</button></td>
        :
        <td><button className="btn">Unregistered</button></td>

    }
  
            </tr>
        </table>
        </div>
    )
}

export default Registration
