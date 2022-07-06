
import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'

import TeamCard from '../components/team-card';

const Member1 = '../assets/user.png';
const data = [
  {
    id: 1,
    imgSrc: Member1,
    alttext: 'user img',
    title: '',
    designation: '',
    socialProfile: ''
  },
];

export default function SectionUpper() {
  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [uname, setUname] = useState()
  const [avatar, setAvatar] = useState()
  const [caret, setCaret] = useState()
  const [plan, setPlan] = useState()
  const [dataPlan, setDataPlan] = useState()
  const [admin, setAdmin] = useState()
  const [level, setLevel] = useState()
  const [email, setEmail] = useState()
  //chain & acct 1
  const [chain,setChain] = useState()
  const [wallet, setWallet] = useState()
  //chain & acct 2
  const [chain2,setChain2] = useState()
  const [wallet2, setWallet2] = useState()
  //chain & acct 3
  const [chain3,setChain3] = useState()
  const [wallet3, setWallet3] = useState()
  const [userIn, setUserIn] = useState(0) 
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  useEffect(() => {
    var item = localStorage.getItem('caret')
    console.log('item ' + item)
    chStatus(item)
  }, [])

  async function chStatus(data){
    console.log('log status ' + data)
    if(data === null){
      setUserIn(0)
      router.push('/login');      
    }else{
      setUserIn(1)
      const cEmail = localStorage.caret
      caretInfo(cEmail)
    }   
  }

  async function caretInfo(data) { 
    var formData = data
    const response = await fetch('/../api/acctGetUser', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })

    const stepOne = await response.json() 
    //console.log(' return caret ' + JSON.stringify(stepOne))
    
    setFname(stepOne.firstname)
    setLname(stepOne.lastname)
    setUname(stepOne.username)
    //setAvatar(stepOne.avatar)
    setCaret(stepOne.caret)
    setPlan(stepOne.plan)
      if(setPlan === 3 || setPlan === 6) {
        setDataPlan('Premium')
      }else if(setPlan === 4) {
        setDataPlan('Promo')
      }else if(setPlan === 2 || setPlan === 5) {
        setDataPlan('Pro')
      }else {
        setDataPlan('Free')
      }
    setAdmin(stepOne.admin)
    setLevel(stepOne.level)
    setEmail(stepOne.email)
    //chain & acct 1
    setChain(stepOne.chain)
    setWallet(stepOne.account)
    /*chain & acct 2
    setChain2()
    setWallet2()
    //chain & acct 3
    setChain3()
    setWallet3()
    */

  }
 
  return (
    <div id='bxDash' className='block  align-center'>
        <div className='block'>
          <div className='text-center text-6xl font-bold'>
              ^{uname} Dashboard
          </div>
        </div>
        <div className='block'>
          <div className='flex display-inline justify-center'>

            <div id='bxUserLeft' className='block' key='member'>
              {data.map((item) => (
                <TeamCard 
                src = {Member1}
                alttext= 'avatar'
                title={email}

                />
              ))}
            </div>

            <div className='block'>

              <div id='bxUserInfo' className='block '>
              <div className='flex display-inline justify-left'>                 
                  <div className='text-right  w-48 mt-2'>User Plan: </div>
                  <div className='border border-gray-200 w-64 ml-4 mt-2 pl-2'>{dataPlan}</div>
                  <div>
                    <button class="bg-indigo-300 hover:bg-indigo-700 text-white font-bold py-2 px-4  pl-2  ml-2 rounded-full">
                      Upgrade
                    </button>
                  </div>
                </div>

                {/*
                  <div className='flex display-inline justify-left'>
                    <div className='text-right w-48 mt-2'>Caret Tag: </div>
                    <div className='border border-gray-200 w-64 ml-4 mt-2 pl-2'>^{caret}</div>
                    <div>* set for if no wallet*</div>
                  </div>
                */}

                <div className='flex display-inline justify-left'>
                  <div className='text-right w-48 mt-2'>Chain: </div>
                  <div className='border border-gray-200 w-64 ml-4 mt-2 pl-2'>{chain}</div>
                </div>

                <div className='flex display-inline justify-left'>
                  <div className='text-right w-48 mt-2'>Wallet: </div>
                  <div className='border border-gray-200 w-64 ml-4 mt-2 pl-2'>{wallet}</div>
                </div>

                <div className='flex display-inline justify-left'>
                  <div className='text-right w-48 mt-2'>First Name: </div>
                  <div className='border border-gray-200 w-64 ml-4 mt-2 pl-2'>{fname}</div>
                </div>

                <div className='flex display-inline justify-left'>
                  <div className='text-right w-48 mt-2'>Last Name: </div>
                  <div className='border border-gray-200 w-64 ml-4 mt-2'>{lname}</div>
                </div>

                <div className='flex display-inline justify-left'>
                  <div className='text-right w-48 mt-2'>IPFS Published: </div>
                  <div className='border border-gray-200 w-64 ml-4 mt-2 pl-2'>FALSE</div>
                </div>

                <div className='flex display-inline justify-right mt-6 '>
                  <div className='text-right w-48 mt-2'></div>
                  <div className='text-right w-64 ml-4 mt-2 pl-2'>
                    <button id='btnProfile' disabled={loading} className='btn btn-primary align-right mr-2 mt-4'>Update Info</button>
                  </div>          
                </div>
              </div>
            </div>
        </div>       
      </div>
    </div>
  );

};
