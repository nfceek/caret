
import React, { useState } from 'react';

import TeamCard from '../components/team-card';
import { useRouter } from 'next/router'


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

  const router = useRouter()
  
  React.useEffect(() => {
    console.log(localStorage === window.localStorage);
  }, [])


  if(typeof window !== "undefined" && localStorage.caret !== null){
    console.log('caret set ' + localStorage.caret)
    const cEmail = localStorage.caret
    caretInfo(cEmail)

  }else{
    //kick them back to login page
    //router.push('/login')
  }

  async function caretInfo(data) { 
    var formData = data
    console.log('caretCheck 1 ' + data)
    const response = await fetch('/../api/acctGetUser', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })

    const stepOne = await response.json() 
    console.log(' return caret ' + JSON.stringify(stepOne))
    
    setFname(stepOne.firstname)
    setLname(stepOne.lastname)
    setUname(stepOne.username)
    //setAvatar(stepOne.avatar)
    setCaret(stepOne.caret)
    setPlan(stepOne.plan)
      if(setPlan === 3) {
        setDataPlan('Premium')
      }else if(setPlan === 2) {
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
              {uname} Dashboard
          </div>
        </div>
        <div className='block'>
          <div className='flex display-inline justify-center'>

            <div id='bxUserLeft' className='block'>
              {data.map((item) => (
                <TeamCard 
                src = {Member1}
                alttext= 'avatar'
                title={email}

                />
              ))}
            </div>

            <div className='block'>

              <div id='bxUserInfo' className='block'>
                <div className='flex display-inline justify-left'>
                  <div className='mt-2'>Caret Tag: </div>
                  <div className='ml-4 mt-2'>{caret}</div>
                  {/* <div>* set for if no wallet*</div>*/}
                </div>
                <div className='flex display-inline justify-left'>
                  <div className='mt-2'>Chain: </div>
                  <div className='ml-4 mt-2'>{chain}</div>
                </div>
                <div className='flex display-inline justify-left'>
                <div className='mt-2'>Wallet: </div>
                <div className='ml-4 mt-2'>{wallet}</div>
                </div>
                <div className='flex display-inline justify-left'>                 
                  <div className='mt-2'>User Plan: </div>
                  <div className='ml-4 mt-2'>{dataPlan}</div>
                </div>
                <div className='flex display-inline justify-left'>
                  <div className='mt-2'>First Name: </div>
                  <div className='ml-4 mt-2'>{fname}</div>
                  </div>
                <div className='flex display-inline justify-left'>
                  <div className='mt-2'>Last Name: </div>
                  <div className='ml-4 mt-2'>{lname}</div>
                </div>
                <div className='flex display-inline justify-left'>
                  <div className='mt-2'>User Name: </div>
                  <div className='ml-4 mt-2'>{uname}</div>
                </div>
              </div>
            </div>
        </div>       
      </div>
    </div>
  );

};
