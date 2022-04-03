import React,{useState,useEffect} from 'react'
import './Add.css'
import Election from '../Election'
import web3 from '../web3';
import { getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage";
import { collection, addDoc,getFirestore } from "firebase/firestore"; 

function Add() {

    const [name,setname]=useState();
    const [quali,setquali]=useState();
    const [party,setparty]=useState();
    const [image,setimage]=useState();
    const [account,setaccount]=useState();


    // const getaccount=async()=>{
    //     const accounts=await web3.eth.getAccounts();
    //     setaccount(accounts[0]);

    // }

    // useEffect(() => {

    //     getaccount();
        
      
    // }, [])

    // const addCandidate=(e)=>{

    //     try{
    //         await Election.methods.addcandidate(name,party,quali,image).send({
    //           from:account
    //         })

    //         alert("Candidate Added Successfully")
    //       }
    //       catch(e){
    //           alert(e.message)
      
    //       }
      

    // }
    const addCandidate=(e)=>{ 
            e.preventDefault();  
        //Image Upload  
        let bucketName='Candidates';
        let file=e.target[3].files[0];
        const storage = getStorage();
        const storageRef = ref(storage, `${bucketName}/${name}`);
        uploadBytes(storageRef, file).then((snapshot) => {  
        const firestore=getFirestore();
        getDownloadURL(ref(storage, `${bucketName}/${name}`)).then((url)=>{
            console.log(url);
            const newCityRef = addDoc(collection(firestore, "Candidates"),{
                name:name,
                party:party,
                quali:quali,
                image:image,
                count:0
            });
        }) 

        alert("Upload successful"); 
        }); 
    }

    return (
        <div className="addcandi">
<form onSubmit={addCandidate}>
            <label className="label">
                Name of Candidate
            </label>
            <br/>
            <input className="input" value={name} onChange={(e)=>setname(e.target.value)}  type="text"></input>
            <br/>

            <label className="label">
                Party 
            </label>
            <br/>
            <input className="input" value={party} onChange={(e)=>setparty(e.target.value)} type="text"></input>
            <br/>

            <label className="label">
                Qualification
            </label>
            <br/>
            <input className="input" value={quali} onChange={(e)=>setquali(e.target.value)} type="text"></input>
            <br/>

            <label className="label">
                Image Url
            </label>
            <br/>
            <input className="input" value={image} onChange={(e)=>setimage(e.target.value)}  type="file"></input>
            <br></br>

            {/* <button className="add" onClick={addCandidate} >Add</button> */}
            <button className="add" type="submit" >Add</button>
            </form>
        </div>
    )
}

export default Add
