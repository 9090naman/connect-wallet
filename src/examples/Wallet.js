import { React, useState, useEffect } from "react";
import { ethers } from "ethers";
import "./Wallet.css"
import Interactions from "./Interactions";
import simple_token_abi from './ABI.json';

const Wallet = () => {
    const address = "0x9fb39197cEa2eDFEBc6261797845af322C549000";
    const contractAddress = '0x4Ea2442021981944dbA62c80C40de3c65573F254';

    const [tokenName, setTokenName] = useState("Token");
    const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAcccount, setDeFaultAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);


    //creating Provider
    let provider = new ethers.providers.Web3Provider(window.ethereum);

    //getting signer from provider
    let signer = provider.getSigner();

    //getting contract 
    let contract = new ethers.Contract(address, simple_token_abi, signer);






    //Connect Wallet function 
    const connectWalletHandler = async () => {
        if (window.ethereum) {
            try {
                const account = await window.ethereum.request({ method: "eth_requestAccounts" });

                console.log(account, "wallet connected");
                // setConnectButtonText('Wallet Connected');
                // setDeFaultAccount(account);
            }
            catch (error) {
                // setErrorMessage(error);
            }
        }
        else {
            console.log("need to install metamask");
            // setErrorMessage("Please install metamsk");
        }
    }

    // requesting balance 
    const getBal = async () => {
        setLoading(true);
        const accountbalance = await provider.getBalance(address);
        console.log(accountbalance);
        const realBalance = ethers.utils.formatEther(accountbalance);
        setLoading(false);
        console.log(realBalance);
        setBalance(realBalance);
    }

    const getTransactions = async () => {
        const transaction = await provider.getTransaction("0xc6540ea5f254d7213b6ecbbe317768cdd9b58439c487b4a10241cf1d9712a0f0");
        console.log(transaction);
    }

    return (
        <div>
            <h1>{tokenName + " ERC20_WALLET"}</h1>
            <div className="container">
                <button onClick={connectWalletHandler}>{connectButtonText}</button>
                {/*Default account component */}
                <div>
                    <h3>Account : {defaultAcccount}</h3>
                </div>

                {/*Balance component */}
                <button onClick={getBal}>Get Balacne </button>
                <div>
                    <h3>{tokenName} Balance : {loading ? "load... " : balance}</h3>
                </div>
                {errorMessage}
                <div>
                    <button onClick={getTransactions}>Get Transaction</button>
                </div>
            </div>

            <Interactions contract={contract} address={address} />
        </div>
    )
}
export default Wallet;

