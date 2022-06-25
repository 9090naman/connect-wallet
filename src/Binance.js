import React from 'react'
import { ethers } from 'ethers'

const Binance = (props) => {

    const Bprovider = props.provider;
    const BAddress = props.address;


    const requestAccount = async () => {
        if (window.ethereum) {
            var account = await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log(account);
        }
    }
    const connectWallet = async () => {
        if (typeof window.ethereum != "undefined") {
            await requestAccount();
        }
    }
    const getBalance = async () => {
        const balance = await Bprovider.getBalance(BAddress);
        const realBalance = ethers.utils.formatEther(balance);
        console.log(realBalance, "BNB");
    }
    return (
        <div>
            <h2>Binance</h2>
            <div>
                <button onClick={connectWallet}>connect to Binance chain</button>
                <button onClick={getBalance}>Accouunt Balance </button>
            </div>
        </div>
    )
}

export default Binance