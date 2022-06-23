import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import abi from '../../utils/Wall.json';
import './List.css';
import truncateEthAddress from 'truncate-eth-address'
import { format } from 'date-fns'



const  List = ({submited}) => {
  const [allMessages, setAllMessages] = useState([]);

  
  useEffect(() => {
    console.log("Render started!")
    const getMessages = async () => {
      const contractAddress = "0x14a365645495a620D15695f74cfD7f1061d6711b";
      const contractABI = abi.abi;
      try{
        const {ethereum} = window;
        if(ethereum){
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const wallContract = new ethers.Contract(contractAddress, contractABI, signer);

          const messages = await wallContract.getMessages();
          
          let filtered = [];
          messages.forEach(item => {
            filtered.push({
              address: item._user,
              timestamp: new Date(item.timestamp * 1000),
              message: item.message,
              amount: item.amount
            })
          })
          filtered.reverse();
          console.log("filtered: ", filtered)
          setAllMessages(filtered);
        }
      }catch(error){
        console.log(error);
      }
    };
    getMessages();
  }, [submited])
  useEffect(() => {
    
    console.log("All messages:", allMessages);
    // let money = parseInt(allMessages[0].amount._hex, 16);
    // let newMoney = money.toString();
    // console.log("Message 1", parseInt(allMessages[0].amount._hex, 16)/ 10**18);

  }, [allMessages])
  

  return (
    <div className='list-container'>
      <h1 style={{color: "whitesmoke"}}>List of messages</h1>
      {
        allMessages.map(item => 
          <div className='comment'>
            <div className='comment-avatar'>
              {/* <img src='#' /> */}
            </div>
            <div className='comment-content'>
              <div className='comment-header'>
                <label className='comment-address'>
                 from {truncateEthAddress(item.address)}
                </label>
                <div className='comment-metaData'>
                    {format(item.timestamp, 'dd.MM.yyyy HH:mm:ss')}
                </div>
              </div>
                <div className='text'>
                  {item.message}
                </div>
                <p>has donated {parseInt(item.amount._hex, 16)/ 10**18} eth! Thanks for the donation!</p>
            </div>
        </div>
        )
      }
      
      
    </div>
  )
}

export default List