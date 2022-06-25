import './App.css';
import { useState } from "react";
import { ethers } from 'ethers'
import { parseEther, parseUnits } from 'ethers/lib/utils';
import Binance from './Binance';
import NetworkChange from './examples/Network';



function App() {
  const INFURA_ID = 'a51eb94aac1c456884a93bdca9670717';

  // senders address
  const address = '0x9fb39197cEa2eDFEBc6261797845af322C549000';

  //receivers address
  const address2 = '0x4ea2442021981944dba62c80c40de3c65573f254';

  //coneecting jsonrpc
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const tokenAddress = '0x4Ea2442021981944dbA62c80C40de3c65573F254';

  // private key
  const signer = provider.getSigner();   // used to sign transactions





  // contract abi
  const ERC20_ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "tokens", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "tokens", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "tokenOwner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }], "name": "safeSub", "outputs": [{ "name": "c", "type": "uint256" }], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "tokens", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }], "name": "safeDiv", "outputs": [{ "name": "c", "type": "uint256" }], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "tokens", "type": "uint256" }, { "name": "data", "type": "bytes" }], "name": "approveAndCall", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }], "name": "safeMul", "outputs": [{ "name": "c", "type": "uint256" }], "payable": false, "stateMutability": "pure", "type": "function" }, { "constant": true, "inputs": [{ "name": "tokenOwner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "remaining", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "a", "type": "uint256" }, { "name": "b", "type": "uint256" }], "name": "safeAdd", "outputs": [{ "name": "c", "type": "uint256" }], "payable": false, "stateMutability": "pure", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "tokens", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "tokenOwner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "tokens", "type": "uint256" }], "name": "Approval", "type": "event" }]


  //creating SMART CONTRACT instance(Object instance)

  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("");
  const [name, setName] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [loading, setLoading] = useState(false);



  // fucntion for  detecting metamask
  const requestAccount = async () => {
    console.log("Requesting accounts...")

    //check if metamsk Extension exists//
    if (window.ethereum) {
      console.log("metamsk detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(accounts);
        setWalletAddress(accounts);
      }
      catch (error) {
        console.log("Error connecting");
      }
    }
    else {
      console.log("metamask not detected");
    }
  }


  //function for connecting metamask
  const connectWallet = async () => {
    if (typeof window.ethereum != "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }

  // function to get metamsk balance
  const requestBalance = async () => {
    setLoading(true)
    const balance = await provider.getBalance(address);
    setLoading(false)
    const realBalance = ethers.utils.formatEther(balance)
    console.log(realBalance);
    setBalance(realBalance);
  }

  //function to call Smart contract functions
  const requestContract = async () => {

    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    // const name = await contract.functions.name();
    // const decimals = await contract.functions.decimals();
    const balanceOf = await contract.balanceOf(signer.getAddress());
    const real = ethers.utils.formatEther(balanceOf)
    console.log(real);
  }





  //
  const startpayment = async ({ ether, addr }) => {
    console.log({ ether, addr })
    // const transaction = await signer.sendTransaction({
    //   to: addr,    //receivers address,
    //   value: ethers.utils.parseEther(ether)    // eth amount to transfer(in wei)
    // })

    const contracterc = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    const tx = await contracterc.transfer(addr, ethers.utils.parseEther(ether));
    tx.wait();
    console.log(tx);

    console.log(tx.hash);
  }


  // handlesubmit function
  function handlesubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    startpayment({
      addr: data.get("addr"),
      ether: data.get("ether")
    })
  }

  const receivers = "0x58cd4ef2802aaedecfd766c0da776b4b1774b97c"

  const sendContract = async () => {

  }







  return (
    <div className="App">
      <header className="App-header">
        <button onClick={requestAccount}>Connect Wallet</button>
        <h3>Wallet Address : {walletAddress}</h3>

        <button onClick={requestBalance}>Get Balance</button>
        <h3>Balance :{loading ? "loading....." : balance} ETH </h3>

        <button onClick={requestContract}>Read Contract</button>

        <h3>Contract name : { }</h3>
        <h3>totalSupply : { }</h3>
        <button onClick={sendContract}>contractpay</button>


        <form onSubmit={handlesubmit}>
          <main>
            <h1>Send ETH</h1>
            <div>
              <input type="text" name='addr' placeholder='receivers address' />
            </div>

            <div>
              <input type="text" name='ether' placeholder='eth amount' />
            </div>
          </main>

          <footer>
            <button type='submit'>Pay now</button>
          </footer>
        </form>


      </header>

      <div>
        <NetworkChange />
      </div>

      <Binance provider={provider} address={address} />
    </div>
  );
}

export default App;
