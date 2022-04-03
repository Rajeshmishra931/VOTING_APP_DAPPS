import React,{useEffect,useState} from 'react'
import './Phase.css'
import {db} from '../Firebase';
import { collection, getDocs ,setDoc,doc} from 'firebase/firestore';


function Phase() {

    const [phase,setphase]=useState();
    const getphase=async()=>{
            const q=collection(db,"phase");

            const snap=await getDocs(q);

            snap.forEach((doc)=>{
                setphase(doc.data().phase);
            })

    }


    const regisphase=async()=>{

        await setDoc(doc(db, "phase", "rysLkgBBBw6sNEpNUtxu"), {
            phase:"registration"
        });

        alert("Phase Changed")

    }

    const votephase=async()=>{
        await setDoc(doc(db, "phase", "rysLkgBBBw6sNEpNUtxu"), {
            phase:"voting"
        });

        alert("Phase changed")

    }

    const resultphase=async()=>{

        await setDoc(doc(db, "phase", "rysLkgBBBw6sNEpNUtxu"), {
            phase:"results"
        });

        alert("Phase changed")

    }

    useEffect(() => {

        getphase();
      
    }, [])

    return (
        <div className="phase">
            <h1 className="btns">Change Phase</h1>

            <div className="btns">
                <button  onClick={regisphase}  style={phase=="registration"?{backgroundColor:"red"}:null} className="bt1">Registration</button>
                <button onClick={votephase}  style={phase=="voting"?{backgroundColor:"red"}:null} className="bt1">Voting</button>
                <button onClick={resultphase} style={phase=="results"?{backgroundColor:"red"}:null} className="bt1">Results</button>

            </div>

        

            
            
        </div>
    )
}

export default Phase
