import Web3 from 'web3';

let web3;

if(typeof window !=='undefined' && typeof window.web3 !=='undefined'){  // we are in browser and metamask is running

web3=new Web3(window.web3.currentProvider);
}
else{
// we are on server or the user is not running metamask
const provider=new Web3.providers.HttpProvider(
    // 'https://rinkeby.infura.io/v3/248f97ed213b449ab657a31c86b5ac64'
    // 'https://rinkeby.infura.io/v3/ec8eadd0ea474e3da463c6c026bc8e78'
    'https://rinkeby.infura.io/v3/ec8eadd0ea474e3da463c6c026bc8e78'
);

web3=new Web3(provider);

}

export default web3;
