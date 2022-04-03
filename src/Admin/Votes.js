import React, { useEffect ,useState} from 'react'
import { getFirestore,collection, addDoc,getDocs } from "firebase/firestore"; 

import './Votes.css'
import web3 from '../web3';
import Election from '../Election';
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

function Votes() {


    // const [cand,setcand]=useState();
    // const [list,setlist]=useState([])
    // const [account,setaccount]=useState();
    // const getdata=async()=>{

    //     const accounts=await web3.eth.getAccounts();
    //     setaccount(accounts[0]);
    //     const number=await Election.methods.candidatescount().call();
    //     const manager=await Election.methods.manager().call();
    //     setcand(number);


    //     const data = await Promise.all(
    //         Array(parseInt(number)).fill().map((element,index) =>{
    //           return Election.methods.candidates(index+1).call()
    //         })
    //       );
    //     setlist(data);

    // }

    // useEffect(() => {

    //     getdata();
      
    // }, [])
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

    return (
        <div className="votes">

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
            
            
        </div>
    )
}

export default Votes
