import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import abi from '../../utils/Wall.json';
import './Main.css';
import List from '../List/List';


function Main() {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState(0);
  const [submited, setSubmited] = useState(false);
  const [loading, setLoading] = useState(false);
  const contractAddress = "0x14a365645495a620D15695f74cfD7f1061d6711b";
  const contractABI = abi.abi;

useEffect(() => {
  console.log("Loading: ", loading);
}, [loading])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const {ethereum} = window;

      if(ethereum){
        console.log("Process started!")
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wallContract = new ethers.Contract(contractAddress, contractABI, signer);

        const messageTxn = await wallContract.setMessage(text, {
          value: ethers.utils.parseUnits(amount, "ether")
        });
        setLoading(true);
        await messageTxn.wait();
        setLoading(false);
        setSubmited(true);
        
      }
    }catch(error){
      console.log(error);
    }
    setAmount(0);
    setText("");
    

  }
  const loadAnimation = () => (
    <div className='loading'>
        <div className='dot-loading'>
          <div className='dot1'></div>
          <div className='dot2'></div>
          <div className='dot3'></div>
        </div>
        <h3 style={{color: 'whitesmoke'}}>Sending the message</h3>
    </div>
    
  )
  return (
    <>
      <div className='main'>
        <div className='main-container'>
          <form onSubmit={handleSubmit}>
            <textarea placeholder='Enter message' onChange={(e) => setText(e.target.value)} />
            <div className='amount'>
              <input placeholder='Enter amount' type="number"  step="0.001" min="0.001" onChange={(e) => setAmount(e.target.value)} />
            </div>
            
            <button type='submit'>Submit!</button>
          </form>
          {
            loading && (
              loadAnimation()
            )
          }
        </div>

        <div className='list'>
          <List submited={submited} />
        </div>
      </div>
      
    </>
    
    
  )
}

export default Main