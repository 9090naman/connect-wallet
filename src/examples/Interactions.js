import React, { useState } from 'react'
import { ethers } from 'ethers'
import "./Wallet.css";
import simple_token_abi from './ABI.json'


const Interactions = (props) => {

    const [transferHash, setTransferHash] = useState();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = '0x9fb39197cEa2eDFEBc6261797845af322C549000';


    const transferHandler = async (e) => {
        e.preventDefault();
        let receiverAddress = e.target.receiverAddress.value;
        let transferAmount = e.target.sendAmount.value;
        let realAmount = ethers.utils.parseEther(transferAmount);
        // console.log(receiverAddress);
        // console.log(transferAmount);


        let txt = await props.contract.transfer(receiverAddress, realAmount);

        console.log(txt);
        setTransferHash(txt.hash);
    }


    return (
        <div>
            <form onSubmit={transferHandler}>
                <h3>Transfer Coins</h3>

                <p>Receivers address</p>
                <input type="text" id="receiverAddress" placeholder='recepient address' />


                <p>Ether amount</p>
                <input type="number" id='sendAmount' placeholder='amount in eth' />

                <button type="submit" >Pay</button>
                <div>
                    {transferHash}
                </div>
            </form>
        </div>
    )
}

export default Interactions