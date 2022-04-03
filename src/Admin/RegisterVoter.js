import React ,{useEffect,useState}from 'react'
import './RegisterVoter.css'
import Election from '../Election'
import {db} from '../Firebase'
import { collection, doc,query, where, getDocs ,deleteDoc,addDoc} from "firebase/firestore";


function RegisterVoter() {


    const [data,setdata]=useState([]);
    const [approved,setapproved]=useState(new Set());
    const [approvedvoterss,setapprovedvoters]=useState([]);
    const [votedornot,setvotedornot]=useState([])
    const [numbervoted,setnumbervoted]=useState();


    const approvedvoters=async()=>{
        const q=await collection(db,"approved")
        const snap=await getDocs(q);
        const temp=[];
      
         snap.forEach((doc)=>{
                    
                temp.push(doc.data())
        })
   
        setapprovedvoters(temp);
    }

    const getvotednumbers=async()=>{
            const numbervoted=await Election.methods.voterscount().call();
            const data = await Promise.all(
                Array(parseInt(numbervoted)).fill().map((element,index) =>{
                  return Election.methods.voters(index+1).call()
                })
              );
            setnumbervoted(numbervoted);
              setvotedornot(data);

    }


    const approveddata=async()=>{

        const q=await collection(db,"approved")
        const snap=await getDocs(q);

        const set =new Set();
        snap.forEach((doc)=>{
                set.add(doc.data().uid)
        })

        setapproved(set);
    }

    const getdata=async()=>{

        const temp=[];

        const q =await collection(db, "registration")
    const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
                temp.push(doc.data());
      
});

    setdata(temp);
    }



    useEffect(() => {
        approveddata();
      getdata();
      approvedvoters();
      getvotednumbers();
     
    }, [])


    const approve=async(uid,name,address,aadhar)=>{

        try{

        const docRef = await addDoc(collection(db, "approved"), {
            uid:uid,
            name:name,
            address:address,
            aadhar:aadhar
          });
          alert("Approved")
         

        }
        catch(e){
            alert(e.message)
        }

    }        

    return (
        <div className="registervoter">

            <h2 className="vote">List of Voters Registered Recently</h2>

            <table id="customers">
                <tr>
                    <th>Name</th>
                    <th>AAdhar</th>
                    <th>Wallet Address</th>
                    <th>Approve</th>
                </tr>
                {
                    data.map((val,key)=>{
                        return (

                            approved.has(val.uid)?
                            null
                            :                    
                            (
        
                            <tr>
                    <td>{val.name}</td>
                    <td>{val.aadhar}</td>
                    <td>{val.address}</td>
                    <td><button className="approve" onClick={()=>approve(val.uid,val.name,val.address,val.aadhar)} >Approve</button></td>
                        </tr>
          
                        )

                        );
                    })
                    
                }
                
                </table>     

                <br/>
                <br/>
                <h2 className="vote">Approved Voters</h2>

                <table id="customers">
                <tr>
                    <th>Name</th>
                    <th>AAdhar</th>
                    <th>Wallet Address</th>
                    <th>Voting Status</th>
                </tr>
                {
                    approvedvoterss.map((val,key)=>{
                        return (
                            <tr>
                    <td>{val.name}</td>
                    <td>{val.aadhar}</td>
                    <td>{val.address}</td>
                    <td>{

                        votedornot.indexOf(val.address)!=-1?<button className="btnn1">Voted</button>:<button className="btnn2">Not Voted</button>
                        }</td>
                   
                   
                        </tr>
                            
    

                        );
                    })
                    
                }
                
                </table>   

                <br/>
                <br/>
                <h2 className="vote">{numbervoted} Voters Voted </h2>


                


            

        </div>
    )
}

export default RegisterVoter
