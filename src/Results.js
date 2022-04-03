import React,{useState,useEffect} from 'react'
import './Results.css'
import Election from './Election'
import web3 from './web3';
import {db} from './Firebase';
import { collection, query, where, getDocs ,addDoc,doc,getFirestore} from "firebase/firestore"; 

const Frame = ({name,party,quali,image,count}) => {  
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
                            <td>{ count}</td>
                </tr> 
    );
}

function Results() {


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



    const [cand,setcand]=useState();
    const [list,setlist]=useState([])
    const [phase,setphase]=useState();
    const [account,setaccount]=useState();

    const getphase=async()=>{
        const q=await collection(db,"phase");
        const snap=await getDocs(q);

        snap.forEach((doc)=>{
            setphase(doc.data().phase)
        })


    }

    const getdata=async()=>{

        const accounts=await web3.eth.getAccounts();
        setaccount(accounts[0]);
        const number=await Election.methods.candidatescount().call();
        const manager=await Election.methods.manager().call();
        setcand(number);





        const data = await Promise.all(
            Array(parseInt(number)).fill().map((element,index) =>{
              return Election.methods.candidates(index+1).call()
            })
          );
        setlist(data);

    }

    useEffect(() => {

        getdata();
        getphase();
      
    }, [])




    return (
        <div className="v111">
           
             <div className="votes">
             <h1 className="vote">Results</h1>

         {   
         
         phase==="results"?(
            

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
         ):<h2 className="vote">Results are yet to be declared .Check later</h2>
}

</div>
            
        </div>
    )
}

export default Results
