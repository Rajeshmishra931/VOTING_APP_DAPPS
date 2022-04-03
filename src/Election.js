import web3 from "./web3";
import Electionabi from '../src/contracts/Vote.json';

const instance=new web3.eth.Contract(
    Electionabi.abi,
    // "0x477eA13E420BBf6fc010F4d6Ba615B6a6Ea4C82E"
    // "0xF1150cd477b1d64A1183d89668aA0c1838fB4f38"
    "0xF1150cd477b1d64A1183d89668aA0c1838fB4f38"
);



export default instance;
