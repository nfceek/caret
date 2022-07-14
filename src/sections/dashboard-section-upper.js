
import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'

import TeamCard from '../components/team-card';
import { useForm } from 'react-hook-form';
import RegisterFeature from 'components/register-feature';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Member1 = '../assets/user.png';
const data = [
  {
    id: 1,
    imgSrc: '',
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
  const [pname, setPname] = useState()
  const [avatar, setAvatar] = useState()
  const [caret, setCaret] = useState()
  const [caret2, setCaret2] = useState()
  const [caret3, setCaret3] = useState()

  const [primaryChain, setPrimaryChain] = useState('');
  const [secondChain, setSecondChain] = useState('');
  const [thirdChain, setThirdChain] = useState('');
  const [primaryWallet, setPrimaryWallet] = useState() 
  const [primaryWalletIsSet, setPrimaryWalletIsSet] = useState(true) 
  const [secondWallet, setSecondWallet] = useState('')  
  const [thirdWallet, setThirdWallet] = useState('')

  const [plan, setPlan] = useState()
  const [dataPlan, setDataPlan] = useState()
  const [level, setLevel] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [prePassword, setPrePassword] = useState('******')
  const [userCount, setUserCount] = useState()
  const [upgradePlan, setUpgradePlan] = useState()

  // emails for updates
  const [userInfoEmail, setUserInfoEmail] = useState(false)
  const [userPwdEmail, setUserPwdEmail] = useState(false)
  const [userWalletEmail, setUserWalletEmail] = useState(false)
  const [userWallet2Email, setUserWallet2Email] = useState(false)
  const [userWallet3Email, setUserWallet3Email] = useState(false)
  //form
  const [fmAvatar, setFmAvatar] = useState('')
  const [fmUserName, setFmUserName] = useState('')
  const [fmFirstName, setFmFirstName] = useState('')
  const [fmLastName, setFmLastName] = useState('')
  const [fmPlan, setFmPlan] = useState('')
  const [account, setAccount] = useState()
  const [account2, setAccount2] = useState()
  const [account3, setAccount3] = useState()
  const [chain, setChain] = useState()
  const [chain2, setChain2] = useState()
  const [chain3, setChain3] = useState()
  const [fmPassword, setFmPassword] = useState('')
  const [fmPwdConfirm, setFmPwdConfirm] = useState('')


  const [isAdmin, setIsAdmin] = useState(false)
  const [userIn, setUserIn] = useState(0) 
  const [loading, setLoading] = useState(false)
  const [premPlan, setPremPlan] = useState(false)
  const [aUpdate, setAUpdate] = useState(false)
  const [uUpdate, setUUpdate] = useState(false)
  const [uPUpdate, setPUpdate] = useState(false)
  const [uWUpdate, setWUpdate] = useState(false)
  const [uW2Update, setW2Update] = useState(false)
  const [uW3Update, setW3Update] = useState(false)

  // admin section
  const [aAdminCount, setAAdminCount] = useState()
  const [aPendCount, setAPendCount] = useState()
  const [aUserCount, setAUserCount] = useState()

  // sales section
  const[sFree, setSFree] = useState()
  const[sPro, setSPro] = useState()
  const[sPrem, setSPrem] = useState()
  const[sPromo, setSPromo] = useState()
  const[sProPromo, setSProPromo] = useState()
  const[sPremPromo, setSPremPromo] = useState()
  // rollups
  
  const[rollPro, setRollPro] = useState()
  const[rollPrem, setRollPrem] = useState()
  const[rollTotal, setRollTotal] = useState()
  const[rollPaid, setRollPaid] = useState()
  const[rollPromo, setRollPromo] = useState()

  const router = useRouter()
  
  useEffect(() => {
    var item = localStorage.getItem('caret')
    //console.log('item ' + item)
    chStatus(item)
  }, [])

  const validationRequest = Yup.object().shape({
    username: Yup.string(),    
    firstname: Yup.string()
      .matches(/^[a-zA-Z-_\s]*$/, "Only Alpha characters, dash ( - ) and underscore ( _ ) are allowed.")
      .min(2, 'First Name must be at least 3 characters'),  
    lastname: Yup.string()
      .matches(/^[a-zA-Z-_\s]*$/, "Only Alpha characters, dash ( - ) and underscore ( _ ) are allowed.")
      .min(2, 'First Name must be at least 3 characters'), 
        
    });

  const formOptions = { resolver: yupResolver(validationRequest) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(user) {

    console.log('on submit ' + JSON.stringify(user) )

    /*
    router.push(
      {
        pathname: '/purchase',
        query: {data: item}   
      }, '/purchase')
      //},) 
    */       
  }

  // admin updating
  function editAInfo(){
    setAUpdate(true)
  }
  
  function cancelAInfo(){
    setAUpdate(false)
  }

  async function updateAInfo(user){

  }

  // user info
  function editInfo(){
    setUUpdate(true)
  }
  
  function cancelInfo(){
    setUUpdate(false)
  }

  async function updateInfo(user){
    var cAvatar = ''
    var cUser = ''
    var cFname = ''
    var cLname = ''
    var cEmail = email

    console.log('updateUser data ' + JSON.stringify(user))
    console.log(' avatar ' + avatar + ' avatarNu '+ fmAvatar)    
    console.log('user ' + uname + ' fname ' + fname + ' lname ' + lname)
    console.log('userNu ' + fmUserName + ' fnameNu ' + fmFirstName + ' lnameNu ' + fmLastName)
    if(fmAvatar === '' || avatar === fmAvatar){
      cAvatar = avatar
    }else{
      cAvatar = fmAvatar
    }

    if(fmUserName === '' || uname === fmUserName){
      cUser = uname
    }else{
      cUser = fmUserName
    }

    if(fmFirstName === '' || fname === fmFirstName){
      cFname = fname
    }else{
      cFname = fmFirstName
    }

    if(fmLastName === '' || lname === fmLastName){
      cLname = lname
    }else{
      cLname = fmLastName
    }

    var cUpdateUser = []
    cUpdateUser.push(cAvatar)
    cUpdateUser.push(cUser)
    cUpdateUser.push(cFname)
    cUpdateUser.push(cLname)
    cUpdateUser.push(cEmail)    

    console.log(JSON.stringify(cUpdateUser))

    const uUsersInfo = await updateUsersInfo(cUpdateUser)

    //need to trigger close only after update is done
  }

  async function updateUsersInfo(data){
    var formData = data
    console.log(' userUpdate ' + JSON.stringify(data))
    const response = await fetch('/../api/users/updateInfo', {
      method: 'POST',
      body: formData,
      headers: {
      'Content-Type':'applications/json'
      },
  })
    const userUpdated = await response.json() 
    //console.log(' user update result ' + JSON.stringify(userUpdated))
    //return userUpdated
  }

  // pwd updating
  function editPInfo(){
    setPUpdate(true)
  }
  
  function cancelPInfo(){
    setPUpdate(false)
  }

  async function updatePInfo(user){
    var cEmail = email  
    var cChain = ''
    var cWallet = ''


  }

  // wallet 1 updating
  function editWInfo(){
    setWUpdate(true)
  }
  
  function cancelWInfo(){
    setWUpdate(false)
  }

  async function updateWInfo(user){
    console.log('wallet prime: ' + primaryWallet + ' chain ' + primaryChain)
    var cEmail = email  
    var cChain = ''
    var cWallet = ''

    if(chain === '' || primaryChain === chain){
      cChain = primaryChain
    }else{
      cChain = chain
    }

    if(account === '' || primaryWallet === account){
      cWallet = primaryWallet
    }else{
      cWallet = account
    }

    setAccount(cWallet)
    setChain(cChain)

    var cUpdateUser = []
    cUpdateUser.push(cEmail)
    cUpdateUser.push(cChain)
    cUpdateUser.push(cWallet)
    //console.log(JSON.stringify(cUpdateUser))
    
    setWUpdate(false)
    var type = 'wallet1'
    var data = '1'    
    const walletUpdate = await updateWalletInfo(type, cUpdateUser)
      pageReset(type, data)
  }  

  // wallet 2 updating
  function editW2Info(){
    console.log('secondwallet: ' + secondWallet + ' secondchain ' + secondChain)
    setW2Update(true)
  }
  
  function cancelW2Info(){
    setW2Update(false)
  }

  async function updateW2Info(user){
    console.log('secondwallet: ' + secondWallet + ' secondchain ' + secondChain)
    var cEmail = email  
    var cChain = ''
    var cWallet = ''

    if(chain2 === '' || secondChain === chain2){
      cChain = secondChain
    }else{
      cChain = chain2
    }

    if(account2 === '' || secondWallet === account2){
      cWallet = secondWallet
    }else{
      cWallet = account2
    }

    setAccount2(cWallet)
    setChain2(cChain)

    var cUpdateUser = []
    cUpdateUser.push(cEmail)
    cUpdateUser.push(cChain)
    cUpdateUser.push(cWallet)
    //console.log(JSON.stringify(cUpdateUser))
    
    setW2Update(false)
    var type = 'wallet2'
    var data = '2'    
    const walletUpdate = await updateWalletInfo(type, cUpdateUser)
      pageReset(type, data)
  }

    // wallet 3 updating
  function editW3Info(){
    setW3Update(true)
  }
  
  function cancelW3Info(){
    setW3Update(false)
  }

  async function updateW3Info(user){
    console.log('thirdwallet: ' + thirdWallet + ' thirdchain ' + thirdChain)
    var cEmail = email  
    var cChain = ''
    var cWallet = ''

    if(chain3 === '' || thirdChain === chain3){
      cChain = thirdChain
    }else{
      cChain = chain3
    }

    if(account3 === '' || thirdWallet === account3){
      cWallet = thirdWallet
    }else{
      cWallet = account3
    }

    setAccount3(cWallet)
    setChain3(cChain)

    var cUpdateUser = []
    cUpdateUser.push(cEmail)
    cUpdateUser.push(cChain)
    cUpdateUser.push(cWallet)
    //console.log(JSON.stringify(cUpdateUser))
    
    setW3Update(false)
    var type = 'wallet3'
    var data = '3'    
    const walletUpdate = await updateWalletInfo(type, cUpdateUser)
      pageReset(type, data)
  }

  async function updateWalletInfo(type, data){
    var formData = data
    var formType = ''

    console.log(' Update ' + JSON.stringify(data))
    if(type === 'wallet1'){
      formType = '/../api/users/updateWallet'
    }else if(type === 'wallet2'){
      formType = '/../api/users/updateWallet2'
    }else if(type === 'wallet3'){
      formType = '/../api/users/updateWallet3'
    }

    const response = await fetch(formType, {
      method: 'POST',
      body: formData,
      headers: {
      'Content-Type':'applications/json'
      },
  })
    const walletUpdated = await response.json() 
    console.log(' wallet update result ' + JSON.stringify(walletUpdated))
    //return userUpdated
  }


  function pageReset(type, data){  
    if(type === 'user'){

    }else if(type === 'pwd'){

    }else if(type === 'wallet1'){
      if(primaryWallet !== account || primaryChain !== chain){
        //console.log(' type ' + type +  ' data ' + data + 'wallet prime: ' + primaryWallet + ' chain ' + primaryChain)	
        //console.log('Nu acct ' + account + ' Nu chain ' + chain)          
        router.reload('/dashboard'); 
      }
    }else if(type === 'wallet2'){
      if(secondWallet !== account2 || secondChain !== chain2){
        //console.log(' type ' + type +  ' data ' + data + 'secondwallet : ' + secondWallet + ' secondchain ' + secondChain)	
        //console.log('Nu acct2 ' + account2 + ' Nu chain2 ' + chain2)
        router.reload('/dashboard'); 
      }
    }else if(type === 'wallet3'){
      if(thirdWallet !== account3 || thirdChain !== chain3){
        //console.log(' type ' + type +  ' data ' + data + 'thirdwallet: ' + thirdWallet + ' thirdchain ' + thirdChain)	
        //console.log('Nu acct3 ' + account3 + ' Nu chain3 ' + chain3)
        router.reload('/dashboard'); 
      }
      }else{

    }

  }

  async function chStatus(data){
    //console.log('log status ' + data)
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
    
    if(stepOne.admin === false){
      setAvatar('../assets/avatar/user-med.png')
    }else{
      setAvatar('../assets/avatar/admin-med.png')

      //console.log('active ' + stepOne.active + ' admin ' + stepOne.admin)
      // admin section
      const aCount = await adminAdminCount(stepOne.admin)
        setAAdminCount(aCount)
      const uCount = await adminUserCount(stepOne.active)
        setAUserCount(uCount)
      const pCount = await adminPendCount(stepOne.active)
        setAPendCount(pCount)
      //console.log('returned active count: ' + aUserCount)
      //sales section
      const freeCount = await salesCount(1)
        setSFree(freeCount)
      const proCount = await salesCount(2)
        setSPro(proCount)
      const premCount = await salesCount(3)
        setSPrem(premCount)
      const promoCount = await salesCount(4)
        setSPromo(promoCount)
      const proPromoCount = await salesCount(5)
        setSProPromo(proPromoCount)
      const premPromoCount = await salesCount(6)
        setSPremPromo(premPromoCount)

      setRollPro(sPro * 5)
      setRollPrem(sPrem * 20)

      setRollTotal(rollPro + rollPrem)

      setRollPaid(sPro + sPrem)
      
      setRollPromo(sFree + sPromo + sProPromo + sPremPromo)

    }

    setFname(stepOne.firstname)
    setLname(stepOne.lastname)
    setPname(stepOne.password)

    if(stepOne.username === "" || stepOne.username === undefined){
      setUname('^' + stepOne.caret)  
    }else{
      setUname(stepOne.username)
    }

    //setAvatar(stepOne.avatar)
    if(stepOne.caret === "" || stepOne.caret === undefined){
      setCaret('No Input')
    }else{
      setCaret('^' + stepOne.caret)
    }

    if(stepOne.caret2 === "" || stepOne.caret2 === undefined){
      setCaret2('No Input')
    }else{
      setCaret2('^' + stepOne.caret)
    }

    if(stepOne.caret3 === "" || stepOne.caret3 === undefined){
      setCaret3('No Input')
    }else{
      setCaret3('^' + stepOne.caret)
    }
        
    //wallet    
    setPrimaryWallet(stepOne.account)
    setSecondWallet(stepOne.account2)
    setThirdWallet(stepOne.account3)

    if(stepOne.account === "" || stepOne.account === undefined){
      setAccount('No Input')
    }else{
      setAccount(stepOne.account)
    }

    if(stepOne.account2 === "" || stepOne.account2 === undefined){
      setAccount2('No Input')
    }else{
      setAccount2(stepOne.account2)
    }

    if(stepOne.account3 === "" || stepOne.account3 === undefined){
      setAccount3('No Input')
    }else{
      setAccount3(stepOne.account3)
    }
      
    //chain
    setPrimaryChain(stepOne.chain)   
    setSecondChain(stepOne.chain2)
    setThirdChain(stepOne.chain3)
    if(stepOne.chain === "" || stepOne.chain === undefined){
      setChain('')
    }else{
      setChain(stepOne.Chain)
    }

    if(stepOne.chain2 === "" || stepOne.chain2 === undefined){
      setChain2('')
    }else{
      setChain2(stepOne.Chain2)
    }

    if(stepOne.chain3 === "" || stepOne.chain3 === undefined){
      setChain3('')
    }else{
      setChain3(stepOne.Chain3)
    }

    setPlan(stepOne.plan)
    console.log(' plan ' + stepOne.plan)
      if(plan === 99){
        setPremPlan(true)
        setDataPlan('Admin')
        setUpgradePlan(false)
      }else if(plan === 3 || plan === 6) {
        setDataPlan('Premium')
        setPremPlan(true)
        setUpgradePlan(false)
      }else if(plan === 4) {
        setDataPlan('Promo')
        setPremPlan(true)
        setUpgradePlan(truee)
      }else if(plan === 2 || plan === 5) {
        setDataPlan('Pro')
        setUpgradePlan(true)
      }else {
        setDataPlan('Free')
        setUpgradePlan(true)
      }
    setIsAdmin(stepOne.admin)
    setLevel(stepOne.level)
    setEmail(stepOne.email)
    
    if(stepOne.password === ''){
      setPrePassword('Pwd Not Set')
    }else{
      setPassword(stepOne.password)
    }

  }

  async function salesCount(data){
    var formData = data
    //console.log(' admin ' + JSON.stringify(data))
    const response = await fetch('/../api/admin/salesCount', {
      method: 'POST',
      body: formData,
      headers: {
      'Content-Type':'applications/json'
      },
  })
    const AdminCount = await response.json() 
    return AdminCount
  }

  async function adminAdminCount(data){
    var formData = 'true'
    //console.log(' admin ' + JSON.stringify(data))
    const response = await fetch('/../api/admin/adminCount', {
      method: 'POST',
      body: formData,
      headers: {
      'Content-Type':'applications/json'
      },
  })
    const AdminCount = await response.json() 
    return AdminCount
  }

  async function adminUserCount(data){
    var formData = 1
    //console.log(' user ' + JSON.stringify(data))
    const response = await fetch('/../api/admin/userCount', {
      method: 'POST',
      body: formData,
      headers: {
      'Content-Type':'applications/json'
      },
  })
    const adminUserCount = await response.json() 
    return adminUserCount
  }

   async function adminPendCount(data){
    var formData = 0
    //console.log(' pend ' + JSON.stringify(data))
    const response = await fetch('/../api/admin/userCount', {
      method: 'POST',
      body: formData,
      headers: {
      'Content-Type':'applications/json'
      },
  })
    const adminUserPendCount = await response.json() 
    return adminUserPendCount
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
          <div id='bxUserLeft' className='block' key='member'>
            {data.map((item) => (
              <TeamCard 
              key={item.id}
              src = {avatar}
              alttext= 'avatar'
              title={email}
              />
            ))}
      </div>
      <div className='block'>
      {isAdmin === true ? 
        <div className='primaryCaret border border-gray-200 m-2 pr-6 pb-6 pt-6'>
          <div className='flex display-inline justify-left'>
            <div className='text-right w-48 mt-2 pt-2'>Update User: </div>
              <div>                  
                <div className=''>
                  <div className='w-64 ml-4 mt-2 pl-2'></div>
                </div>
                <div className=''>
                  <input name="updateUser" type="text" placeholder=' enter Email ' 
                  className={'border border-gray-300 w-64 ml-4 mt-2 pl-2'} />
                </div>
              </div>
          </div>
            {aUpdate === false ?
              <div>
                <div className='flex display-inline justify-right m-6 '>
                  <div className='text-right w-48 mt-2'> </div>
                  <div className='text-right ml-4 mt-2 pl-2'>
                    <button id='btnEditInfo' 
                      className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={() => {editAInfo()}}>Edit Info</button>
                  </div>          
                </div>
              </div>
            :
              <div className='flex display-inline justify-right m-6 '>
                <div className='text-right w-48 mt-2'>
                  <button id='btnACancel' disabled={loading} 
                    className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => {cancelAInfo()}}>Cancel</button>
                </div>
                <div className='text-right ml-4 mt-2 pl-2'>
                  <button id='btnAUpdateUser' disabled={loading} 
                    className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => {updateAInfo()}}>Update User Info</button>
                </div>          
              </div>
            }
        </div>              
      :
        <div></div>
      }         
        <div className='primaryCaret border border-gray-200 m-2 pr-6 pb-6 pt-6'>
            <form onSubmit={handleSubmit(updateInfo)}>
              {uUpdate === false ?
                <div> 

                <div className='flex display-inline justify-left'>
                  <div className='text-right w-48 mt-2'>Username: </div>                    
                  <div>
                    <div className='w-64 ml-4 mt-2 pl-2'>{uname}</div>
                  </div> 
                </div>

                <div className='flex display-inline justify-left'>
                  <div className='text-right w-48 mt-2'>First Name: </div>                    
                  <div>
                    <div className='w-64 ml-4 mt-2 pl-2'>{fname}</div>
                  </div>                  
                </div>

                <div className='flex display-inline justify-left'>
                  <div className='text-right w-48 mt-2'>Last Name: </div>                      
                    <div className=''>
                      <div className='w-64 ml-4 mt-2 pl-2'>{lname}</div>
                    </div>                                 
                </div>

                <div>
                  <div className='flex display-inline justify-right m-6 '>
                    <div className='text-right w-48 mt-2'> </div>
                    <div className='text-right ml-4 mt-2 pl-2'>
                      <button id='btnEditInfo' 
                        className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={() => {editInfo()}}>Edit Info</button>
                    </div>          
                  </div>
                </div>
                </div>
              :
                <div>
                  <div className='flex display-inline justify-left mt-2'>                   
                    <div className='text-right w-48 mt-2'>Avatar: </div>
                    <div>
                      <div name="avatar" className="ml-2 pl-2 pt-2"> Avatars avail Soon </div>
                    </div>
                  </div>
                  <div className='flex display-inline justify-left'>
                    <div className='text-right w-48 mt-2'>Username: </div>                    
                    <div>
                      <input name="username" type="text" text={uname} placeholder={uname} value={fmUserName} 
                        onChange={(e) => { setFmUserName(e.target.value); }} className={'border border-gray-300 w-64 ml-4 mt-2 pl-2'} /> 
                    </div>                   
                  </div>

                  <div className='flex display-inline justify-left'>
                    <div className='text-right w-48 mt-2'>First Name: </div>                                    
                    <div>
                      <input name="firstname" type="text" placeholder={fname} value={fmFirstName} 
                        onChange={(e) => { setFmFirstName(e.target.value); }} className={'border border-gray-300 w-64 ml-4 mt-2 pl-2'} />
                    </div>
                  </div>

                  <div className='flex display-inline justify-left'>
                    <div className='text-right w-48 mt-2'>Last Name: </div>                                       
                      <div className=''>
                        <input name="lastname" type="text" text={lname} 
                          placeholder={lname} value={fmLastName} 
                          onChange={(e) => { setFmLastName(e.target.value); }} 
                          className={'border border-gray-300 w-64 ml-4 mt-2 pl-2'} />                     
                      </div>                 
                  </div>

                  <div className='flex display-inline justify-left m-6 '>                     
        
                    <div className='flex display-inline justify-left'>
                      <div className='mr-6 '>Email confirmation : </div>
                      <div  className="flex display-inline">
                        <input type="radio" className='ml-4 mr-4' value="Yes" name="userInfoEmail" onClick={() => {setUserInfoEmail(true)}}  />&nbsp;Yes
                        <div className='ml-4 text-sm'> </div>
                        <input type="radio" className='l-4' value="No" defaultChecked="false" name="userInfoEmail" onClick={() => {setUserInfoEmail(true)}} />&nbsp;No
                      </div>
                    </div>                 
                  </div>
                  
                  <div>
                    <div className='flex display-inline justify-right m-6 '>
                      <div className='text-right w-48 mt-2'>
                        <button id='btnCancel' disabled={loading} 
                          className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                          onClick={() => {cancelInfo()}}>Cancel</button>
                      </div>
                      <div className='text-right ml-4 mt-2 pl-2'>
                        <button id='btnUpdateInfo' disabled={loading} 
                          className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                          onClick={() => {updateInfo()}}>Update User Info</button>
                      </div>          
                    </div>
                  </div>
                </div>
              }
          </form>
        </div>
        <div className='primaryCaret border border-gray-200 m-2 pr-6 pb-6 pt-6'>                
          {uPUpdate === true ?                        
            <div>
              <div className='flex display-inline justify-left'>
                <div className='text-right w-48 mt-2'>Password: </div>
                <div>
                  <input name="password" type="text"  placeholder=' Password ' 
                  {...register('password')} 
                  className={'border border-gray-300 w-64 ml-4 mt-2 pl-2' + `form-control ${errors.password ? 'is-invalid' : ''}`} />                  
                  <div className="invalid-feedback">{errors.username?.message}</div>
                </div>
              </div>                  
              <div className='flex display-inline justify-left'>
                <div className='text-right w-48 mt-2'>Confirm Password: </div>
              <div>
                <input name="confirmPassword" type="text" placeholder=' Confirm Password ' 
                {...register('confirmPassword')} value={fmPwdConfirm} 
                onChange={(e) => { setFmPwdConfirm(e.target.value); }} 
                className={'border border-gray-300 w-64 ml-4 mt-2 pl-2' + `form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
              </div>
                  
              </div>
              <div className='flex display-inline justify-right m-6 '>
                <div className='mr-6 '>Email confirmation : </div>
                <div  className="flex display-inline">
                  <input type="radio" className='ml-4 mr-4' value="Yes" name="userPwdEmail" onClick={() => {setUserPwdEmail(true)}}  />&nbsp;Yes
                  <div className='ml-4 text-sm'> </div>
                  <input type="radio" className='l-4' value="No" defaultChecked="false" name="userPwdEmail" onClick={() => {setUserPwdEmail(true)}}  />&nbsp;No
              </div>
              </div>
              <div className='flex display-inline justify-right m-6 '>
              <div className='text-right w-48 mt-2'>
                <button id='btnCancel' disabled={loading} 
                  className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => {cancelPInfo()}}>Cancel</button>
              </div>
              <div className='text-right ml-4 mt-2 pl-2'>
                <button id='btnPassword' disabled={loading} 
                  className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={() => {updatePInfo()}}>Update Password</button>
              </div>          
              </div>

            </div>          
          :
            <div>
              <div className='flex display-inline justify-left'>
                <div className='text-right w-48 mt-2'>Password: </div>
                <div className='w-64 ml-4 mt-2 pl-2'>{prePassword}</div>
              </div>
              <div className='flex display-inline justify-right m-6 '>
                <div className='text-right w-48 mt-2'> </div>
                <div className='text-right ml-4 mt-2 pl-2'>
                  <button id='btnEditInfo' 
                    className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => {editPInfo()}}>Edit Info</button>
                </div>          
              </div>
            </div>
          }     
        </div>
      </div>             

      <div className='block'>
          <div className='updateUserInfo pt-2 pb-6'>
            <div id='bxUserInfo' className='block border border-gray-300'>
              <form onSubmit={handleSubmit(onSubmit)}>
                {aUpdate === false ?
                  <div>
                    <div className='flex display-inline justify-left'>                 
                    <div className='text-center text-3xl w-48 mt-2'>User Plan: </div>
                    <div className=' text-3xl w-64 ml-4 mt-2 pl-2 mb-2'>{dataPlan}</div>
                  </div>
                  <div className='flex display-inline justify-left mb-6 pl-10'> 
                    {upgradePlan === true  &&                    
                      <div className=''> 
                        <button 
                          class="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                          >Upgrade
                        </button>
                      </div>
                    }
                    </div>
                  </div>
                :
                  <div className='flex display-inline justify-left'>                 
                    <div className='text-center text-3xl w-48 mt-2'>User Plan: </div>
                    <div className=''>
                    <input name="userPlan" type="text" text={dataPlan}
                      placeholder={dataPlan}
                      value={fmPlan} onChange={(e) => { setFmPlan(e.target.value); }} 
                      className={'border border-gray-300 w-64 ml-4 mt-2 pl-2'} />                     
                  </div>
                </div>
                }

                <div className='primaryCaret border border-gray-200 m-2 pr-6 pb-6 pt-6'>
                  {uWUpdate === false ?
                    <div>
                      <div className='flex display-inline justify-left'>
                        <div className='text-right w-48 mt-2'>Primary Caret: </div>
                        <div className='font-bold w-64 ml-4 mt-2 pl-2'>{caret}</div>                           
                      </div>

                      <div className='flex display-inline justify-left'>
                        <div className='text-right w-48 mt-2'>Chain: </div>                         
                        <div className='w-64 ml-4 mt-2 pl-2'>{primaryChain}</div>
                      </div>

                      <div className='flex display-inline justify-left'>
                        <div className='text-right w-48 mt-2'>Wallet: </div>
                        <div className='w-144 ml-4 mt-2 pl-2'>{primaryWallet}</div>
                      </div>

                      <div className='flex display-inline justify-left'>
                        <div className='text-right w-48 mt-2'>IPFS Published: </div>
                        <div className='primaryIFPS w-64 ml-4 mt-2 pl-2'>FALSE</div>
                      </div>

                      <div className='flex display-inline justify-right m-6 '>
                        <div className='text-right w-48 mt-2'> </div>
                          {primaryWalletIsSet === true &&
                            <div>
                              <div className='text-right ml-4 mt-2 pl-2'>
                                <button id='btnEditInfo' 
                                  className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                                  onClick={() => {editWInfo()}}>
                                Edit Info</button>
                              </div> 
                            </div>
                          }
                      </div>                        
                    </div>
                  :
                    <div>    
                      <div className='flex display-inline justify-left'>
                        <div className='text-right w-48 mt-2'>Primary Caret: </div>
                        <div className='font-bold w-64 ml-4 mt-2 pl-2'>{caret}</div>                           
                      </div>

                      <div className='flex display-inline justify-left'>
                        <div className='text-right w-48 mt-2'>Chain : </div>
                        <div className=''>
                          <select id='primarychain' name="primarychain" placeholder=""
                          text={primaryChain} onChange={(e) => { setChain(e.target.value); }} 
                          className='border border-gray-300 h-10 pt-2 ml-4 pl-2' >
                            <option value="" >Chain</option>
                            <option value="Eth">Ethereum</option>
                            <option value="Btc">Bitcoin</option>
                            <option value="Matic">Matic</option>
                            <option value="Doge">Doge</option>
                          </select>
                        </div>  
                      </div>
                    
                      <div className='flex display-inline justify-left'>
                        <div className='text-right w-48 mt-2'>Wallet: </div>
                        <input name="primarywallet" type="text" text={primaryWallet} placeholder={primaryWallet}
                        onChange={(e) => { setAccount(e.target.value); }} className='border border-gray-300 ml-4 mt-2 pl-2' /> 
                      </div> 

                      <div className='flex display-inline justify-right m-6 '>
                        <div className='mr-6 '>Email confirmation : </div>
                        <div  className="flex display-inline">
                        <input type="radio" className='ml-4 mr-4' value="Yes" name="userWalletEmail" onClick={() => {setUserWalletEmail(true)}}  />&nbsp;Yes
                        <div className='ml-4 text-sm'> </div>
                        <input type="radio" className='l-4' value="No" defaultChecked="false" name="userWalletEmail" onClick={() => {setUserWalletEmail(true)}}  />&nbsp;No
                        </div>
                      </div>
        
                      <div className='flex display-inline justify-right m-6 '>
                        <div className='text-right w-48 mt-2'>
                          <button id='btnCancel' disabled={loading} 
                            className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={() => {cancelWInfo()}}>Cancel</button>
                        </div>
                        <div className='text-right ml-4 mt-2 pl-2'>
                        <button id='btnChain' disabled={loading} 
                          className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                          onClick={() => {updateWInfo()}}>Update Master Chain</button>
                        </div>          
                      </div>                           

                    </div>
                  }
                </div>
                  
                {premPlan === true &&
                  <div>
                    {uW2Update === false ?
                      <div>
                        <div className='secondCaret border border-gray-200 m-2 pr-6 pb-6 pt-6'>
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>Caret 2: </div>
                            <div className='font-bold w-64 ml-4 mt-2 pl-2'>{caret2}</div>                           
                          </div>
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>Chain 2: </div>                         
                            <div className='w-64 ml-4 mt-2 pl-2'>{secondChain}</div>
                          </div>
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>Wallet 2: </div>
                            <div className='w-144 ml-4 mt-2 pl-2'>{secondWallet}</div>
                          </div>
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>IPFS Published: </div>
                            <div className='primaryIFPS w-64 ml-4 mt-2 pl-2'>FALSE</div>
                          </div>
                          <div className='flex display-inline justify-right m-6 '>
                            <div className='text-right w-48 mt-2'> </div>
                            <div className='text-right ml-4 mt-2 pl-2'>
                              <button id='btnEditInfo' className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={() => {editW2Info()}}>Edit Info</button>
                            </div>          
                          </div>                        
                        </div>
                      </div>
                    :
                      <div> 
                        <div className='secondCaret border border-gray-200 m-2 pr-6 pb-6 pt-6'>   
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>Caret 2: </div>
                            <div className='font-bold w-64 ml-4 mt-2 pl-2'>{caret2}</div>                           
                          </div>
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>Chain 2: </div>
                            <div className=''>
                              <select id='secondchain' name="secondchain" placeholder="" 
                              text={secondChain} onChange={(e) => { setChain2(e.target.value); }} 
                              className='border border-gray-300 h-10 pt-2 ml-4 pl-2' >
                                <option value="">Chain</option>
                                <option value="Eth">Ethereum</option>
                                <option value="Btc">Bitcoin</option>
                                <option value="Matic">Matic</option>
                                <option value="Doge">Doge</option>
                              </select>
                            </div>  
                          </div>                            
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>Wallet 2: </div>
                            <input name="primarywallet" type="text" text={secondWallet} placeholder={secondWallet}
                              onChange={(e) => { setAccount2(e.target.value); }} 
                              className='border border-gray-300 ml-4 mt-2 pl-2' />
                          </div> 
                          <div className='flex display-inline justify-right m-6 '>
                            <div className='mr-6 '>Email confirmation : </div>
                            <div  className="flex display-inline">
                            <input type="radio" className='ml-4 mr-4' 
                              value="Yes" name="userWalletsecondEmail" 
                              onClick={() => {setUserWallet2Email(true)}}  />&nbsp;Yes
                            <div className='ml-4 text-sm'> </div>
                            <input type="radio" className='l-4' 
                              value="No" defaultChecked="false" name="userWallet2Email" 
                              onClick={() => {setUserWallet2Email(true)}}  />&nbsp;No
                            </div>
                          </div>                 
                          <div className='flex display-inline justify-right m-6 '>
                            <div className='text-right w-48 mt-2'>
                              <button id='btnW2Cancel' disabled={loading} 
                                className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={() => {cancelW2Info()}}>Cancel</button>
                            </div>
                            <div className='text-right ml-4 mt-2 pl-2'>
                            <button id='btnW2Chain' disabled={loading} 
                              className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                              onClick={() => {updateW2Info()}}>Update Master Chain</button>
                            </div>          
                          </div>                           
                        </div>
                      </div>
                    }
                    {uW3Update === false ?
                      <div>
                        <div className='secondCaret border border-gray-200 m-2 pr-6 pb-6 pt-6'>
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>Caret 3: </div>
                            <div className='font-bold w-64 ml-4 mt-2 pl-2'>{caret2}</div>                           
                          </div>
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>Chain 3: </div>                         
                            <div className='w-64 ml-4 mt-2 pl-2'>{thirdChain}</div>
                          </div>
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>Wallet 3: </div>
                            <div className='w-144 ml-4 mt-2 pl-2'>{thirdWallet}</div>
                          </div>
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>IPFS Published: </div>
                            <div className='primaryIFPS w-64 ml-4 mt-2 pl-2'>FALSE</div>
                          </div>
                          <div className='flex display-inline justify-right m-6 '>
                            <div className='text-right w-48 mt-2'> </div>
                            <div className='text-right ml-4 '>
                              <button id='btnEdit3Info' 
                                className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={() => {editW3Info()}}>Edit Info</button>
                            </div>          
                          </div>                        
                        </div>
                      </div>
                    :
                      <div> 
                        <div className='secondCaret border border-gray-200 m-2 pr-6 pb-6 pt-6'>   
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>Caret 3: </div>
                            <div className='font-bold w-64 ml-4 mt-2 pl-2'>{caret2}</div>                           
                          </div>
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>Chain 3: </div>
                            <div className=''>
                              <select id='thirdchain' name="thirdchain" placeholder="" 
                                text={thirdChain} onChange={(e) => { setChain3(e.target.value); }} 
                                className='border border-gray-300 h-10 pt-2 ml-4 pl-2' >
                                  <option value="">Chain</option>
                                  <option value="Eth">Ethereum</option>
                                  <option value="Btc">Bitcoin</option>
                                  <option value="Matic">Matic</option>
                                  <option value="Doge">Doge</option>
                              </select>
                            </div>  
                          </div>                            
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>Wallet 3: </div>
                            <input name="thirdwallet" type="text"  text={thirdWallet} placeholder={thirdWallet}
                              onChange={(e) => { setAccount3(e.target.value); }} 
                              className='border border-gray-300 ml-4 mt-2 pl-2' />
                          </div> 
                          <div className='flex display-inline justify-right m-6 '>
                            <div className='mr-6 '>Email confirmation : </div>
                            <div  className="flex display-inline">
                            <input type="radio" className='ml-4 mr-4' 
                              value="Yes" name="userWalletThirdEmail" 
                              onClick={() => {setUserWallet3Email(true)}}  />&nbsp;Yes
                            <div className='ml-4 text-sm'> </div>
                            <input type="radio" className='l-4' 
                              value="No" defaultChecked="false" name="userWallet3Email" 
                              onClick={() => {setUserWallet3Email(true)}}  />&nbsp;No
                            </div>
                          </div>                 
                          <div className='flex display-inline justify-right m-6 '>
                            <div className='text-right w-48 mt-2'>
                              <button id='btnW3Cancel' disabled={loading} className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"
                                onClick={() => {cancelW3Info()}}>Cancel</button>
                            </div>
                            <div className='text-right ml-4 mt-2 pl-2'>
                            <button id='btnW3Chain' disabled={loading} className="inline-block px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-500 hover:shadow-lg focus:bg-blue-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg transition duration-150 ease-in-out"

                              onClick={() => {updateW3Info()}}>Update Master Chain</button>
                            </div>          
                          </div>                           
                        </div>
                      </div>
                    }
                  </div>
                }

              </form>
            </div>
          </div>
        
      </div>
      </div>       
      </div>
      {isAdmin === true &&
        <div>
          <div className='block py-10 mb-6'>
          <div className='text-center'>
              <div className='text-center text-6xl font-bold py-6 '>Admin Section</div>
            <div>
              <div class="grid grid-rows-3 border border-gray-200 grid-flow-col gap-4 text-3xl bg-slate-100 ">
                <div class="row-span-3 ... bg-gray-100 m-2 p-2"></div>

                <div class="col-span-2 ...  border border-gray-200">
                  <div class="col-span-2 ... text-4xl font-bold py-6">Total Users: {userCount}</div>
                  <div class="grid grid-cols-3 gap-4 px-10">
                    <div class="bg-blue-100 m-2 py-4">Admins: {aAdminCount}</div>
                    <div class="bg-blue-100 m-2 py-4">Active Users: {aUserCount} </div>
                    <div class="bg-blue-100 m-2 py-4">Pending Users: {aPendCount}</div>               
                  </div>
                </div>

                <div class="row-span-2 col-span-2 ... border border-gray-200">
                  <div class="row-span-2 col-span-2 ... text-4xl font-bold py-6">Sales Data</div>
                  <div class="col-span-2 ... bg-gray-100">
                  <div class="row-span-2 col-span-2 ... text-3xl font-bold ">Promos</div>                            
                    <div class="grid grid-cols-5 gap-4">
                      <div class=" bg-blue-100 m-2 p-2">Free: {sFree}</div>
                      <div class=" bg-blue-100 m-2 p-2">Promo: {sPromo} </div>   
                      <div class=" bg-blue-100 m-2 p-2">Pro Promo: {sProPromo} </div>
                      <div class=" bg-blue-100 m-2 p-2">Prem promo: {sPremPromo}</div> 
                      <div class=" bg-blue-100 m-2 p-2">Total Promos Signups: {rollPromo} </div>                                
                  </div>

                  <div class="col-span-2 ... bg-gray-100 m-2 py-2">
                  <div class="row-span-2 col-span-2 ... text-3xl font-bold pb-2">Sales</div>
                  <div class="grid grid-cols-5 gap-4 ml-2">                    
                    <div class=" bg-blue-100 m-2 p-2">Pro: {sPro} @ $ 5.00 = $ {rollPro}.00</div>
                    <div class=" bg-blue-100 m-2 p-2">Prem: {sPrem} @ $ 20.00 = $ {rollPrem}.00</div>
                    <div class=" bg-blue-100 m-2 p-2">Total Sale: $ {rollTotal}.00</div> 
                    <div class=" bg-gray-100 m-2 p-2"></div> 
                    <div class=" bg-blue-100 m-2 p-2">Total Paid Signups: {rollPaid}</div>         
                      </div>
                    </div>
                 </div>               
                </div>
                <div class="row-span-3 ... bg-gray-100 m-2 p-2"></div>
              </div>
            </div>
          </div>
      
      



            </div>
        </div>
      }
  </div>
  );

};
