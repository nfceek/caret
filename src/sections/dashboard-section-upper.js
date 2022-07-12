
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
  const [avatar, setAvatar] = useState()
  const [caret, setCaret] = useState()
  const [plan, setPlan] = useState()
  const [dataPlan, setDataPlan] = useState()
  const [level, setLevel] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [prePassword, setPrePassword] = useState('******')
  const [userCount, setUserCount] = useState()
  const [primaryChainValue, setPrimaryChainValue] = useState('');
  const [primaryWallet, setPrimaryWallet] = useState()
  const [secondChainValue, setSecondChainValue] = useState('');
  const [secondWallet, setSecondWallet] = useState('')
  const [thirdChainValue, setThirdChainValue] = useState('');
  const [thirdWallet, setThirdWallet] = useState('')
  const [userInfoEmail, setUserInfoEmail] = useState(false)
  const [userPwdEmail, setUserPwdEmail] = useState(false)
  const [userWalletEmail, setUserWalletEmail] = useState(false)

  const [fmAvatar, setFmAvatar] = useState('')
  const [fmUserName, setFmUserName] = useState('')
  const [fmFirstName, setFmFirstName] = useState('')
  const [fmLastName, setFmLastName] = useState('')

  const [fmPassword, setFmPassword] = useState('')
  const [fmPwdConfirm, setFmPwdConfirm] = useState('')


  const [isAdmin, setIsAdmin] = useState(false)
  const [userIn, setUserIn] = useState(0) 
  const [loading, setLoading] = useState(false)
  const [uUpdate, setUUpdate] = useState(false)
  const [uPpdate, setPUpdate] = useState(false)
  const [uWpdate, setWUpdate] = useState(false)
  const [premPlan, setPremPlan] = useState(true)

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
    primarychain: Yup.string(),
    primarywallet: Yup.string(),
    secondchain: Yup.string(),
    secondwallet: Yup.string(),
    thirdchain: Yup.string(),
    thirdwallet: Yup.string(),          
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

  function editPassword(){
    setPUpdate(true)
  }
  
  function cancelPassword(){
    setPUpdate(false)
  }

  async function updatePassord(user){

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

    if(stepOne.caret === "" || stepOne.caret === undefined){
      setUname(stepOne.username)
    }else{
      setUname('^' + stepOne.caret)
    }

    //setAvatar(stepOne.avatar)
    if(stepOne.caret === "" || stepOne.caret === undefined){
      setCaret('No Input')
    }else{
      setCaret('^' + stepOne.caret)
    }
      
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
    setIsAdmin(stepOne.admin)
    setLevel(stepOne.level)
    setEmail(stepOne.email)
    
    if(stepOne.password === ''){
      setPrePassword('Pwd Not Set')
    }else{
      setPassword(stepOne.password)
    }

    //chain & acct 1
    setPrimaryChainValue(stepOne.chain)
    setPrimaryWallet(stepOne.account)
    setSecondChainValue()
    setSecondWallet()
    setThirdChainValue()
    setThirdWallet()
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
              src = {avatar}
              alttext= 'avatar'
              title={email}
              />
            ))}
          {isAdmin === true ? 
            <div className='primaryCaret border border-gray-200 m-2 pr-6 pb-6 pt-6'>
              <div className='flex display-inline justify-left'>
                <div className='text-right w-48 mt-2 pt-2'>Update User: </div>
                  <div>                  
                    <div className=''>
                      <div className='w-64 ml-4 mt-2 pl-2'></div>
                    </div>
                    <div className=''>
                      <input name="updateUser" type="text" placeholder=' enter Email ' className={'border border-gray-300 w-64 ml-4 mt-2 pl-2'} />
                    </div>
                  </div>
              </div>
              <div className='flex display-inline justify-right m-6 '>
                <div className='text-right w-48 mt-2'>
                  <button id='btnCancel' disabled={loading} className='btn btn-primary align-right m-2 pb-4'>Cancel</button>
                </div>
                <div className='text-right ml-4 mt-2 pl-2'>
                  <button id='btnUpdateUser' disabled={loading} className='btn btn-primary align-right m-2 pb-4'>Update User Info</button>
                </div>          
              </div>
            </div> 
          :
            <div></div>
          }         
            <div className='primaryCaret border border-gray-200 m-2 pr-6 pb-6 pt-6'>
                <form onSubmit={handleSubmit(updateInfo)}>
                <div className='flex display-inline justify-left mt-2'>
                  {uUpdate === false ?                     
                      <div>
                        <div className='w-64 ml-4 mt-2 pl-2'></div>
                      </div>
                    :
                    <div className='flex display-inline justify-left mt-2'>
                      <div>
                        <div className='text-right w-48 mt-2'>Avatar: </div>
                      </div>
                      <div>
                        <div name="avatar" className="ml-2 pl-2 pt-2"> Avatars avail Soon </div>
                      </div>
                    </div>
                    }
                </div>
                <div className='flex display-inline justify-left'>
                  <div className='text-right w-48 mt-2'>Username: </div>
                    {uUpdate === false ?                        
                      <div>
                        <div className='w-64 ml-4 mt-2 pl-2'>{uname}</div>
                      </div>
                    :
                      <div>
                        <input name="username" type="text" text={uname} placeholder={uname} value={fmUserName} 
                          onChange={(e) => { setFmUserName(e.target.value); }} className={'border border-gray-300 w-64 ml-4 mt-2 pl-2'} /> 
                      </div>
                    }
                </div>
                <div className='flex display-inline justify-left'>

                  <div className='text-right w-48 mt-2'>First Name: </div>
                    {uUpdate === false ?                        
                      <div>
                        <div className='w-64 ml-4 mt-2 pl-2'>{fname}</div>
                      </div>
                    :
                      <div>
                        <input name="firstname" type="text" placeholder={fname} value={fmFirstName} 
                          onChange={(e) => { setFmFirstName(e.target.value); }} className={'border border-gray-300 w-64 ml-4 mt-2 pl-2'} />
                      </div>
                    }
                </div>
                <div className='flex display-inline justify-left'>
                  <div className='text-right w-48 mt-2'>Last Name: </div>
                  {uUpdate === false ?                        
                    <div className=''>
                      <div className='w-64 ml-4 mt-2 pl-2'>{lname}</div>
                    </div>
                  :
                    <div className=''>
                      <input name="lastname" type="text" text={lname} 
                        placeholder={lname} 
                        value={fmLastName} onChange={(e) => { setFmLastName(e.target.value); }} 
                        className={'border border-gray-300 w-64 ml-4 mt-2 pl-2'} />                     
                    </div>
                  }
                </div>
                <div className='flex display-inline justify-right m-6 '>
                  {uUpdate === false ?                        
                    <div>
                      <div className='w-64 ml-4 mt-2 pl-2'></div>
                    </div>
                  :
                    <div className='flex display-inline justify-right'>
                      <div className='mr-6 '>Email confirmation : </div>
                      <div  className="flex display-inline">
                        <input type="radio" className='ml-4 mr-4' value="Yes" name="userInfoEmail" onClick={() => {setUserInfoEmail(true)}}  />&nbsp;Yes
                        <div className='ml-4 text-sm'> </div>
                        <input type="radio" className='l-4' value="No" defaultChecked="false" name="userInfoEmail" onClick={() => {setUserInfoEmail(true)}} />&nbsp;No
                      </div>
                    </div>
                  }
                </div>
                {uUpdate === false ?
                  <div>
                    <div className='flex display-inline justify-right m-6 '>
                      <div className='text-right w-48 mt-2'> </div>
                      <div className='text-right ml-4 mt-2 pl-2'>
                        <button id='btnEditInfo' className='btn btn-primary align-right m-2 pb-4'
                         onClick={() => {editInfo()}}>Edit Info</button>
                      </div>          
                    </div>
                  </div>
                :
                  <div>
                    <div className='flex display-inline justify-right m-6 '>
                      <div className='text-right w-48 mt-2'>
                        <button id='btnCancel' disabled={loading} className='btn btn-primary align-right m-2 pb-4'
                         onClick={() => {cancelInfo()}}>Cancel</button>
                      </div>
                      <div className='text-right ml-4 mt-2 pl-2'>
                        <button id='btnUpdateInfo' disabled={loading} className='btn btn-primary align-right m-2 pb-4'
                         onClick={() => {updateInfo()}}>Update User Info</button>
                      </div>          
                    </div>
                  </div>
                }
              </form>
            </div>
            <div className='primaryCaret border border-gray-200 m-2 pr-6 pb-6 pt-6'>
              <div className='flex display-inline justify-left'>
                <div className='text-right w-48 mt-2'>Password: </div>
                  {uUpdate === false ?                        
                    <div>
                      <div className='w-64 ml-4 mt-2 pl-2'>{prePassword}</div>
                    </div>
                  :
                    <div>
                      <input name="password" type="text"  placeholder=' Password ' 
                      {...register('password')} 
                      className={'border border-gray-300 w-64 ml-4 mt-2 pl-2' + `form-control ${errors.password ? 'is-invalid' : ''}`} />
                    
                      <div className="invalid-feedback">{errors.username?.message}</div>
                    </div>
                  }
              </div>
              <div className='flex display-inline justify-left'>
                <div className='text-right w-48 mt-2'>Confirm Password: </div>
                  {uUpdate === false ?                        
                    <div>
                      <div className='w-64 ml-4 mt-2 pl-2'></div>
                    </div>
                  :
                    <div>
                      <input name="confirmPassword" type="text" placeholder=' Confirm Password ' 
                      {...register('confirmPassword')} value={fmPwdConfirm} 
                      onChange={(e) => { setFmPwdConfirm(e.target.value); }} 
                      className={'border border-gray-300 w-64 ml-4 mt-2 pl-2' + `form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                      <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                    </div>
                  }
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
                  <button id='btnCancel' disabled={loading} className='btn btn-primary align-right m-2 pb-4'>Cancel</button>
                </div>
                <div className='text-right ml-4 mt-2 pl-2'>
                  <button id='btnPassword' disabled={loading} className='btn btn-primary align-right m-2 pb-4'>Update Pasword</button>
                </div>          
              </div>              
            </div>
          </div>
          <div className='block'>
              <div className='updateUserInfo py-6'>
                <div id='bxUserInfo' className='block border border-gray-300'>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex display-inline justify-left'>                 
                      <div className='text-center text-3xl w-48 mt-2'>User Plan: </div>
                      <div className=' text-3xl w-64 ml-4 mt-2 pl-2 mb-6'>{dataPlan}</div>
                      <div>
                        {/*<button class="bg-indigo-300 hover:bg-indigo-700 text-white font-bold py-2 px-4  pl-2  ml-2 rounded-full">Upgrade</button>*/}
                      </div>
                    </div>
                      <div className='primaryCaret border border-gray-200 m-2 pr-6 pb-6 pt-6'>
                        <div className='flex display-inline justify-left'>
                          <div className='text-right w-48 mt-2'>Primary Caret: </div>
                          <div className='font-bold w-64 ml-4 mt-2 pl-2'>{caret}</div>                           
                        </div>
                        <div className='flex display-inline justify-left'>
                          <div className='text-right w-48 mt-2'>Chain: </div>
                          {uUpdate !== true ?
                            <div>
                              <div className='w-64 ml-4 mt-2 pl-2'>{primaryChainValue}</div>
                            </div>
                          :
                            <div>    
                              <div className=''>
                                <select id='primarychain' name="primarychain" placeholder="" {...register('primarychain')} value={primaryChainValue} onChange={(e) => { setPrimaryChainValue(e.target.value); }} className={'border border-gray-300 h-10 pt-2 ml-4 pl-2' + `form-control ${errors.primarychain ? 'is-invalid' : ''}`} >
                                <option value="" disabled hidden>chain</option>
                                    <option value="Eth">Ethereum</option>
                                    <option value="Btc">Bitcoin</option>
                                    <option value="Matic">Matic</option>
                                    <option value="Doge">Doge</option>
                                </select>
                              </div>                             
                              <div className="invalid-feedback">{errors.primarychain?.message}</div>
                            </div> 
                          }
                        </div>
                        <div className='flex display-inline justify-left'>
                          
                          {uUpdate !== true ?
                            <div className='flex display-inline justify-left'>
                              <div className='text-right w-48 mt-2'>Wallet: </div>
                              <div className='w-144 ml-4 mt-2 pl-2'>{primaryWallet}</div>
                            </div>
                          :
                            <div>
                              <div className='flex display-inline justify-left'>
                                <div className='text-right w-48 mt-2'>Wallet: </div>
                                <input name="primarywallet" type="text" placeholder=" Add Primary Wallet" {...register('primarywallet')} value={primaryWallet} onChange={(e) => { setPrimaryWallet(e.target.value); }} className={'border border-gray-300 ml-4 mt-2 pl-2' + `form-control ${errors.primarywallet ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.primarywallet?.message}</div>  
                              </div>
                            </div>                          
                          }
                        </div>
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>IPFS Published: </div>
                            <div className='primaryIFPS w-64 ml-4 mt-2 pl-2'>FALSE</div>
                          </div> 
                      </div>
                    {premPlan === true &&
                      <div>
                        <div className='secondCaret border border-gray-200 m-2 pr-6 pb-6 pt-6'>
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>Caret 2: </div>
                            <div className='font-bold w-64 ml-4 mt-2 pl-2'>^{caret}</div>                           
                          </div>
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>Chain 2: </div>
                            {uUpdate === false ?
                              <div>
                                <div className='w-64 ml-4 mt-2 pl-2'>{secondChainValue}</div>
                              </div>
                            :
                              <div>    
                                <div className=''>
                                  <select id='secondchain' name="secondchain" placeholder="" {...register('secondchain')} value={secondChainValue} onChange={(e) => { setSecondChainValue(e.target.value); }} className={'border border-gray-300 h-10 pt-2 ml-4 pl-2' + `form-control ${errors.secondchain ? 'is-invalid' : ''}`} >
                                  <option value="" disabled hidden>chain</option>
                                      <option value="Eth">Ethereum</option>
                                      <option value="Btc">Bitcoin</option>
                                      <option value="Matic">Matic</option>
                                      <option value="Doge">Doge</option>
                                  </select>
                                </div>                             
                                <div className="invalid-feedback">{errors.secondchain?.message}</div>
                              </div> 
                            }
                          </div>
                          <div className='flex display-inline justify-left'>
                          {uUpdate === false ?
                            <div className='flex display-inline justify-left'>
                              <div className='text-right w-48 mt-2'>Wallet 2: </div>
                              <div className='w-144 ml-4 mt-2 pl-2'>{secondWallet}</div>
                            </div>
                          :
                            <div>
                              <div className='flex display-inline justify-left'>
                              <div className='text-right w-48 mt-2'>Wallet 2: </div>
                              <input name="secondwallet" type="text" placeholder=" Add Primary Wallet" {...register('secondwallet')} value={secondWallet} onChange={(e) => { setSecondWallet(e.target.value); }} className={'border border-gray-300 ml-4 mt-2 pl-2' + `form-control ${errors.secondwallet ? 'is-invalid' : ''}`} />
                              <div className="invalid-feedback">{errors.secondwallet?.message}</div>  
                            </div>                         
                            <div className='flex display-inline justify-left'>
                              <div className='text-right w-48 mt-2'>IPFS Published: </div>
                              <div className='secondIFPS w-64 ml-4 mt-2 pl-2'>FALSE</div>
                              </div>
                            </div>                          
                          }
                          </div>
                        </div>

                        <div className='thirdCaret border border-gray-200 m-2 pr-6 pb-6 pt-6'>
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>Caret 3: </div>
                            <div className='font-bold w-64 ml-4 mt-2 pl-2'>^{caret}</div>                           
                          </div>
                          <div className='flex display-inline justify-left'>
                            <div className='text-right w-48 mt-2'>Chain 3: </div>
                            {uUpdate === false ?
                              <div>
                                <div className='w-64 ml-4 mt-2 pl-2'>{thirdChainValue}</div>
                              </div>
                            :
                              <div>    
                                <div className=''>
                                  <select id='thirdchain' name="thirdchain" placeholder="" {...register('thirdchain')} value={thirdChainValue} onChange={(e) => { setThirdChainValue(e.target.value); }} className={'border border-gray-300 h-10 pt-2 ml-4 pl-2' + `form-control ${errors.thirdchain ? 'is-invalid' : ''}`} >
                                  <option value="" disabled hidden>chain</option>
                                      <option value="Eth">Ethereum</option>
                                      <option value="Btc">Bitcoin</option>
                                      <option value="Matic">Matic</option>
                                      <option value="Doge">Doge</option>
                                  </select>
                                </div>                             
                                <div className="invalid-feedback">{errors.thirdchain?.message}</div>
                              </div> 
                            }
                          </div>
                          <div className='flex display-inline justify-left'>
                            {uUpdate === false ?
                              <div className='flex display-inline justify-left'>
                                <div className='text-right w-48 mt-2'>Wallet 3: </div>
                                <div className='w-144 ml-4 mt-2 pl-2'>{thirdWallet}</div>
                              </div>
                            :
                              <div>
                                <div className='flex display-inline justify-left'>
                                  <div className='text-right w-48 mt-2'>Wallet 3: </div>
                                  <input name="thirdwallet" type="text" placeholder=" Add Third Wallet" {...register('thirdwallet')} value={thirdWallet} onChange={(e) => { setThirdWallet(e.target.value); }} className={'border border-gray-300 ml-4 mt-2 pl-2' + `form-control ${errors.thirdwallet ? 'is-invalid' : ''}`} />
                                  <div className="invalid-feedback">{errors.thirdwallet?.message}</div>  
                                </div>
    
                                <div className='flex display-inline justify-left'>
                                  <div className='text-right w-48 mt-2'>IPFS Published: </div>
                                  <div className='secondIFPS w-64 ml-4 mt-2 pl-2'>FALSE</div>
                                </div>
                              </div>                          
                            }
                          </div>
                        </div>
                      </div>
                    }
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
                      <button id='btnCancel' disabled={loading} className='btn btn-primary align-right m-2 pb-4'>Cancel</button>
                      </div>
                      <div className='text-right ml-4 mt-2 pl-2'>
                        <button id='btnChain' disabled={loading} className='btn btn-primary align-right m-2 pb-4'>Update Chain Info</button>
                      </div>          
                    </div>
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
