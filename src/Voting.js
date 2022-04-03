import React,{useEffect,useState} from 'react'
import { getFirestore,collection, addDoc,getDocs,deleteDoc } from "firebase/firestore"; 
import './Voting.css'
import { db } from './Firebase';
import { useAuth } from './AuthContext';
import { query, where,doc} from "firebase/firestore";
import Candidates from './Candidates'
import Election from './Election'
import web3 from './web3';

var voted=false;
const Frame = ({name,party,quali,image,count,id}) => {
    const [data,setData]=useState("Vote");  
    const dovote=()=>{ 
        if(voted==true){
            alert("you've already voted"); 
        }else{
        voted=true;
        const firestore=getFirestore();
        deleteDoc(doc(db, "Candidates", id));
        addDoc(collection(firestore, "Candidates"),{
            name:name,
            party:party,
            quali:quali,
            image:image,
            count:count+1
        });
        setData("Voted");
    }
 
    }
     
    return (

        

        <tr>
                    <td>
                        <div>
                        <img src={image} className="image11"  >
                            
                            </img>
                            </div>
                            </td>

                            <td>{ name.toUpperCase()}</td>
                            <td>{ party.toUpperCase()}</td>
                            <td><button onClick={dovote} >{data}</button></td>
                </tr>


    // <div  key={id} class="flex-box">
    //     <center class="flex-row">
    //     <div> 
    //             <p><h4>Title : {title}</h4></p> 
    //             </div>
    //             <div>
    //             <img src={url} className="img-responsive" ></img>  
    //             </div>
    //             <div>
    //             <Link to={{
    //                 pathname:`/${id}`,
    //                 state:{  
    //                     title:{title},
    //                     id:{id},
    //                     url:{url},
    //                     price:{price},
    //                     description:{description}
    //                     }
    //                 }} >Show details</Link>
    //             </div>
    //     </center>
    // </div>
    );
}

function Voting() {
    const [info , setInfo] = useState([]);  
      const firestore = getFirestore();
      const fetchBlogs=async()=>{
      const querySnapshot =await  getDocs(collection(firestore,"Candidates")).then((querySnapshot) => { 
        querySnapshot.forEach(element => {  
            var data={
              name:element.data().name,
              party:element.data().party,
              id:element.id,
              quali:element.data().quali,
              image:element.data().image,
              count:element.data().count,

            } 
            setInfo(arr=>[...arr , data]);
              
        });
    })
}
    useEffect(() => {
        fetchBlogs();
      }, [])
    console.log(info); 



    const [phase,setphase]=useState();
    const [approved,setapproved]=useState(false);
    const {currentuser}=useAuth();
    const [account,setaccount]=useState();
    const [manager,setmanager]=useState();
    const [cand,setcand]=useState();
    const [list,setlist]=useState([])


    const approvedstatus=async()=>{
        const q=await collection(db,"approved");
        const snap=await getDocs(q);
        snap.forEach((data)=>{
            if(data.data().uid===currentuser.uid)
            setapproved(true);
        })
}

    const getdata=async()=>{
        const accounts=await web3.eth.getAccounts();
        setaccount(accounts[0]);
        const number=await Election.methods.candidatescount().call();
        const manager=await Election.methods.manager().call();
        setmanager(manager);
        setcand(number);


        const data = await Promise.all(
            Array(parseInt(number)).fill().map((element,index) =>{
              return Election.methods.candidates(index+1).call()
            })
          );
        setlist(data);

    }

    const getphase=async()=>{
        const q=await collection(db,"phase");
        const snap=await getDocs(q);

        snap.forEach((doc)=>{
            setphase(doc.data().phase)
        })
}

    
    useEffect(() => {

        getphase();
        approvedstatus();
        getdata();
        
    }, [])

    return (
        <div className="voting">


            <h1 className="vote">Caste your Vote Here</h1>
            {
                phase=="voting" && approved==true ?(
            <div className="voter" >

            <table id="customers">

                <tr>

                    <th>
                        Image
                    </th>
                    <th>
                        Name
                    </th>
                    <th>Party</th>
                    <th>Votes</th>
                </tr>

            {
            (info.map((data) => (
            <Frame 
                name={data.name}
                party={data.party}  
                quali={data.quali}
                image={data.image}
                count={data.count}
                id={data.id}
            />
            )))
        }
                {/* {
                    list.map((val,index)=>{
                        return(
                            <tr>
                    <td>
                        <div>
                        <img className="image11" src={val.imageurl}>
                            
                            </img>
                            </div>
                            </td>

                            <td>{val.name.toUpperCase()}</td>
                            <td>{val.party}</td>
                            <td>{val.votes}</td>
                </tr>


                        );
                    })
                } */}

            </table>
                {/* {
                    list.map((val,index)=>{
                        return(
                            <Candidates 
                                key={index+1}
                                id={index+1}
                                name={val.name}
                                qualification={val.qualification}
                                party={val.party}
                                imageurl={val.imageurl}
                            ></Candidates>

                        );
                    })
                } */}
                
               
                 

            </div>
                ):(
                    approved==="false"?<h2 className="vote">You haven't Registered , you cant Vote</h2>:
                (<h2 className="vote">Voting Phase is yet to start or its over</h2>))
            }
            
            
        </div>
    )
}

export default Voting
