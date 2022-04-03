import logo from './logo.svg';
import {useState,useEffect} from 'react';
import web3 from './web3';
import Election from './contracts/Vote.json'
import './App.css';
import { firebase } from './Firebase';
import Home from './Home';
import Login from './Login';
import Adminlogin from './Adminlogin';
import RegisterVoter from './Admin/RegisterVoter';
import Signup from './Signup';
import { AuthProvider } from './AuthContext';
import Voting from './Voting'
import Registration from './Registration';
import Mainpage from './Mainpage';
import Admin from './Admin/Admin';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import Phase from './Admin/Phase';
import Add from './Admin/Add';
import Votes from './Admin/Votes';
import Results from './Results';

function App() {


  const getaccounts=async()=>{

    const accounts=await web3.eth.getAccounts();
    console.log(accounts[0]);

  }

  const deploycontract=async()=>{

    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);
  
    const result = await new web3.eth.Contract(
      Election.abi
    )
      .deploy({ data: Election.bytecode })
      .send({ gas: '1000000', from: accounts[0] }); 
  
    console.log('Contract deployed to', result.options.address);


  }

  useEffect(() => {

    getaccounts();
    deploycontract();
    // 0x477eA13E420BBf6fc010F4d6Ba615B6a6Ea4C82E
    //0xF1150cd477b1d64A1183d89668aA0c1838fB4f38
  
  }, [])

  return (

    <AuthProvider>
    <div className="App">
      
      <Router>

      <Switch>

      <Route exact path="/">

      <Mainpage></Mainpage>
      </Route>

      <Route exact path="/login">
        <Login></Login>

      </Route>

      <Route exact path="/votes">
      <div className="adminhome">
        <Admin></Admin>
        <Votes></Votes>
        </div>
       

      </Route>

      <Route exact path="/adminlogin">
        <Adminlogin></Adminlogin>

      </Route>

      <Route exact path="/adminhome">
        <div className="adminhome">
        <Admin></Admin>
        <RegisterVoter></RegisterVoter>
        </div>

      </Route>

      <Route exact path="/phase">
        <div className="adminhome">
        <Admin></Admin>
        <Phase></Phase>
        </div>

      </Route>

      <Route exact path="/add">
        <div className="adminhome">
        <Admin></Admin>
        <Add></Add>
        </div>

      </Route>

      <Route exact path="/signup">
        <Signup></Signup>

      </Route>



      <Route exact path="/voting">

      <div className="home1">
       
      <Home></Home>
      <Voting ></Voting>
   

      </div>
      </Route>

      <Route exact path="/results">

      <div className="home1">
       
      <Home></Home>
      <Results></Results>
   

      </div>
      </Route>

      <Route exact path="/home">

<div className="home1">
 
<Home></Home>
<Registration></Registration>

</div>
</Route>



    </Switch>

      </Router>
    </div>
    </AuthProvider>
  );
}

export default App;
