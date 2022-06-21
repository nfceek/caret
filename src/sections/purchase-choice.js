
import React, { useState } from "react"
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '../services';
import PurchaseFeature from 'components/purchase-feature';

const bcrypt = require('bcryptjs');
const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK('95e746aca5e5bb9755a5', '08dd9abee5aa3c4e6d086d59d0029fcdaf12987f4a85d51315ae6b70a605ca54');

export default function PurchaseChoice() {  
  const router = useRouter();

  const [carrotAvail, setCarrotAvail] = useState()
  const [carrotIsAvail, setCarrotIsAvail] = useState(false) 
  const [carrotInDb, setCarrotInDb ] = useState('')
  const [userCountCheck, setUserCountCheck] = useState(0) 
  const [itemData, setItemData] = useState('') 
  const [numberCount, setNumberCount] = useState(Math.floor(Math.random() * (999 - 100 + 1)) + 0)
  const [itemDataAppend, setItemDataAppend] = useState('')
  const [chainValue, setChainValue] = useState('');
  const [walletState, setwalletState] = useState(false)   // does user have wallet
  const [feeFree, setFeeFree] = useState(false)             // no strings attached
  const [feePro, setFeePro] = useState(false)               // is this a paid word -- Pro
  const [feePrem, setFeePrem] = useState(false)             // is this a paid word == Prem
  const [busWord, setBusWord] = useState(false)             // is this a bus word               
  const [banWord, setBanWord] = useState(false)             // is this a banned word
  const [wordPrice, setWordPrice] = useState(0)             // word cost how much
  const [pymtChoice, setPymtChoice] = useState('')
  const [contractData, setContractData] = useState()
  const [pubKey, setPubKey] = useState()
  const [privKey, setPrivKey] = useState()
  const [newUser, setNewUser] = useState()
  const [maxUser, setMaxUser] = useState()
  const [emailDupe, setEmailDupe] = useState(0)      // if user, is email a dupe
  const [walletDupe, setWalletDupe] = useState(0)
  var secureKeys=['']
  var maxUserNum=['']
  
  const data = {
    subTitle: '4 Simple steps',
    title: 'Caret Tag Word: ' + itemData,
  };

  const walletValue = (data) => {
    setwalletState(data)
  }

  React.useEffect(() => {
    if (router.isReady) {
      try {
        setItemData(router.query.data.toUpperCase())
        caretCheck(router.query.data.toUpperCase())
        //console.log(localStorage === window.localStorage);        
      } catch (error) {
        console.log('purchase routing error: ', error)
        //router.push('/')
      }
    }
  }, [router.isReady]);
  
  async function caretCheck(data) { 
    var formData = JSON.stringify(data)
    console.log('caretCheck 1 ' + data)
    const response = await fetch('/../api/validate/returnCarrot', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const stepOne= await response.json() 
    caretInformation(stepOne)
  }

  async function caretNumCheck(data) { 
    var formData = JSON.stringify(data)
    console.log('caretCheck 2 ' + formData)
    const response = await fetch('/../api/validate/returnCarrot', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const stepTwo= await response.json() 
    caretNumInformation(stepTwo)
  }

  
  function caretInformation(data) { 
    // is person logged in
    if(localStorage === window.localStorage){
      if(typeof window !== "undefined" && localStorage.caret !== null || localStorage.caret !== "undefined"){
        console.log('status ' + localStorage.caret)
        //let userLoggedIn = localStorage.caret.replaceAll('"', '')
        //  inputEmail.value = userLoggedIn || {}
      }
    } 

    if(data === null){ 
      console.log('Im null')
      setCarrotIsAvail(' is available')
      setCarrotAvail(true)
      setCarrotInDb(false)
    } else {
      //console.log(' caretInfo ' + JSON.stringify(data) )     
      const dbAvail = JSON.stringify(data.available)
        if(dbAvail === 'false'){
          setCarrotIsAvail(' is NOT available ')
          setCarrotAvail(false)
          //console.log(' dbAvail-1 ' + dbAvail + ' carrotIsAvail-1 ' + carrotIsAvail + ' carrotAvail-1 ' + carrotAvail)
        }else{         
          var data = (data.word.toUpperCase() + numberCount.toString())
          caretNumCheck(data)
          //console.log(' dbAvail-2 ' + dbAvail + ' carrotIsAvail-1 ' + carrotIsAvail + ' carrotAvail-1 ' + carrotAvail)
        }
    }
  }

  function caretNumInformation(data){
    if(data === null){ 
      console.log('Im null')
      setCarrotIsAvail(' is available')
      setCarrotAvail(true)
      setCarrotInDb(false)
    }else{
      const dbAvailNum = JSON.stringify(data.available)
        console.log(' dbAvailNum ' + dbAvailNum )
        if(dbAvailNum === 'false'){
          setCarrotIsAvail(' is NOT available ')
          setCarrotAvail(false)
        }else{
          setCarrotIsAvail(' is available ')
          setCarrotAvail(true)
          setCarrotInDb(true)
          setWordPrice(data.price) 
        }
    }
  }

  //console.log('ch Avail: ' + carrotAvail + ' ch Info ' )
  //console.log('In Avail: ' + carrotAvail + ' in Info ' + JSON.stringify(carrotInDb))
  var validationProcess = ''
  if(carrotAvail === false){
    validationProcess = Yup.object().shape({
      request: Yup.string()
        .min(5, 'Caret choice must be at least 5 characters') 
        .max(12, 'Caret choice must be less than 12 characters')
        .matches(/^[aA-zZ0-9-_\s]+$/, "Only Alpha characters are allowed for Caret choice")
    });
    
  } else {
    if(walletState === true){
     validationProcess = Yup.object().shape({
        email: Yup.string()
          .required('Email is required')
          .min(6, 'Email to short')
          .max(50, 'Email to long'),
        chain: Yup.string()
          .min(2, 'Chain Name Required'),
        account: Yup.string()
          .required('Wallet Address is Required')
          .min(12, 'Wallet Addres must be at least 12 characters')
          .max(100, 'wallet address to long'),         
      });
    } else {
      validationProcess = Yup.object().shape({
       email: Yup.string()
          .required('Email is required')
          .min(6, 'Email to short')
          .max(50, 'Email to long'),
        password: Yup.string()
          .required('Passord is Required')
          .min(6, 'Password must be at least 6 characters')
          .max(50, 'Password to long')      
      });
    }  
  }
    const formOptions = { resolver: yupResolver(validationProcess)};
    var { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;  

  async function onSubmit(user) {
    const chEmail = user.email
    const checkEmail = await emailCheck(chEmail)
      if(checkEmail === 0) {                      // 0 means not is system now check address
        // if using wallet -- check in db
        //console.log('wState ' + walletState)
        if(walletState === true){
          const chWallet = user.account          
          //console.log('validate data: ' + JSON.stringify(user) + ' chWallet ' + chWallet)
          const checkWallet = await accountCheck(chWallet)
          //console.log('checkWallet back: ' + checkWallet)
            if(checkWallet === 0){             
              pre(user)
            } else {
              // dupe found
              if(checkWallet > 0){    
                  setWalletDupe(1)
                }else{
                  setWalletDupe(0)                
              }
            }
        } else {
          pre(user)
        }
      } else {
          // dupe found
          if(checkEmail > 0) {    
            setEmailDupe(1)
          }else{
            setEmailDupe(0)
          }
      }
  }

  async function pre(data) {
    // add acounter to prevent wholesale slamming of words
    //setUserCountCheck(userCountCheck + 1) 
    //console.log(' pymt choice ' + pymtChoice + ' user data ' +JSON.stringify( user))
    
    // is it in db
    //console.log('in db ' + carrotInDb + ' wallet State ' + walletState )
    //console.log('pre validate data: ' + JSON.stringify(data))
    // get keys
    preKeys()
    
    //caret string in db parts
    if(carrotInDb === true){
      var dbWord = carrotInDb.word
      var dbAppend = carrotInDb.append
      var dbPrice = carrotInDb.price
    }
    var cWord = ''
    var cWord2 = ''
    var cWord3 = ''
    var append = numberCount
    var cWallet = ''
    var cChain = ''
    var cPwd = ''
    var cidWallet
    // set wallet state
    if(walletState === true){
      cChain = data.chain
      cWallet = data.account
      if(pymtChoice === 'free'){
        cidWallet = '_NONE:TBD'
      }else{
        cidWallet = '_' + cChain +  ':' + cWallet
      }
    }else{
      cPwd = data.password
      cidWallet = '_NONE:TBD'
    }
    var cAvailable = 1
    var cPrice = ''
    if(pymtChoice === 'Prem'){
      cWord = itemData.toLowerCase()
      cWord2 = itemData.toLowerCase() + '01'
      cWord3 = itemData.toLowerCase() + '02'
      cPrice = 20;
    } else if (pymtChoice === 'Pro') {
      cWord = itemData.toLowerCase() + numberCount
      cPrice = 5;
    } else {
      cWord = itemData.toLowerCase() + numberCount
      cPrice = 0;
    }
    
    var cSitepublickey = secureKeys[0]
    var cSiteprivatekey = secureKeys[1]
    var cPublickey = secureKeys[2]
    var cPrivkey = secureKeys[3]
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var setTime = date + '-' + time;

    //assemble caret string for CID
    //console.log(' pymt choice ^' + pymtChoice + ' cid -> ' + cWord + cidWallet + '::pKey:' + cPublickey + '::settime:' + setTime)
    var cCid = ('^' + cWord + '::CNAS' + cidWallet + '::pKey:' + cPublickey + '::settime:' + setTime)
    console.log('cid ' + cCid)
    //process pymt before updating !!

    //update db - user and word
    // user
    preAddUser(data)

    // get new user ID
    var cUserEmail = data.email
    const curDate = new Date().toISOString()
    var cInsertWord = ''
    var cUpdateWord = []
    cUpdateWord.push(cUserEmail)
    cUpdateWord.push(cWord)
    cUpdateWord.push(numberCount)
    cUpdateWord.push(cPrice)
    cUpdateWord.push(cSitepublickey)
    cUpdateWord.push(cSiteprivatekey)
    cUpdateWord.push(cPublickey)
    cUpdateWord.push(cPrivkey)
    cUpdateWord.push(curDate)
    // word string   
    console.log(' update array ->' + pymtChoice)
    if(carrotInDb === true){
      // get word ID -- update
      console.log('UpdateDB')
      updatePremCarrot(cUpdateWord)
    }else {
      console.log('InsertDB')
      insertCarrot(cUpdateWord)
    }
    
    //create CID

    // update IPFS    
    //preInsertIPFS() authentication passed
    
    // redirect user to dashboard/ty page

    //if we get past 5 kick user to main page
    //console.log('form abuse ct check: ' + userCountCheck)
    //{userCountCheck === 5 && router.push('/')}
  }

  function flush(data){

  }

  async function prePymt(user) {
    //console.log(' pymt choice ' + pymtChoice + ' user data ' +JSON.stringify( user))
    var formData = JSON.stringify(data)

    const response = await fetch('/../api/validate/returnCarrot', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const stepOne= await response.json() 
    caretInformation(stepOne)
  }

  function preKeys(){   
    const crypto = require('crypto');
    var prime_length = 100;
    let sitePublicKey = null
    let sitePrivateKey = null
    let publicKey = null
    let privateKey = null
    const dhSite = crypto.createDiffieHellman(prime_length);
    dhSite.generateKeys('hex')    
      sitePublicKey = dhSite.getPublicKey('hex')
      sitePrivateKey = dhSite.getPrivateKey('hex')
    const dh = crypto.createDiffieHellman(prime_length);
    dh.generateKeys('hex')
      publicKey = dh.getPublicKey('hex')
      privateKey = dh.getPrivateKey('hex')

    secureKeys = [sitePublicKey, sitePrivateKey, publicKey, privateKey]
    return secureKeys
}

  async function preAddUser(user) { 
    console.log('load ' + JSON.stringify(user) + ' data ' + JSON.stringify(data) + ' plan ' + pymtChoice)
    const curDate = new Date().toISOString()
    var pwd = ''
    var uname = ''
    var planChoice = 1
    console.log(curDate)

    if(walletState === false){
        pwd = bcrypt.hashSync(user.password, 10) 
    }

    if(pymtChoice === 'Prem'){
      planChoice = 3;
      uname = itemData;
    } else if (pymtChoice === 'Pro') {
      planChoice = 2;
      uname = itemData + numberCount
    } else {
      planChoice = 1;
      uname = itemData + numberCount
    }

    const response = await fetch('/../api/carrotRegister', {
        method: 'POST',
        body:  [JSON.stringify(user.email),uname,pwd,JSON.stringify(user.chain), JSON.stringify(user.account), planChoice],
        headers: {
        'Content-Type':'applications/json'
        },
    })

    const regSuccess = await response.json()      
    setNewUser(regSuccess)

  }

  async function preMaxUserId(user){
    const response = await fetch('/../api/validate/preCarrotUserId', {
      method: 'POST',
      body:  [JSON.stringify(user.email)],
      headers: {
      'Content-Type':'applications/json'
      },
  })
    const preMaxUser = await response.json()
    var returnMax = await preMaxUser[0].max      
    setMaxUser(returnMax)

  }

  async function preInsertIPFS(){

    pinata.testAuthentication().then((result) => {
      //handle successful authentication here
      console.log(result);
    }).catch((err) => {
        //handle error here
        console.log(err);
    });

  }
  
  async function insertCarrot(data){

    const response = await fetch('/../api/insertCarrot', {
      method: 'POST',
      body:  data,
      headers: {
      'Content-Type':'applications/json'
      },
    })
    const dbInsert = await response.json() 
      console.log('dbInsert ' + dbInsert)
      return dbInsert
  }

  async function updateCarrot(data){
    console.log('word data in ' + data)
    const response = await fetch('/../api/updateCarrot', {
      method: 'POST',
      body:  data,
      headers: {
      'Content-Type':'applications/json'
      },
    })
    const dbUpdate = await response.json() 
      console.log('dbUpdate ' + dbUpdate)
      return dbUpdate
  }

  async function updatePremCarrot(data){
    const response = await fetch('/../api/updateCarrot', {
      method: 'POST',
      body:  data,
      headers: {
      'Content-Type':'applications/json'
      },
    })
    const dbUpdatePrem = await response.json() 
      console.log('dbUpdatePrem ' + dbUpdatePrem)
      return dbUpdatePrem
  }

  async function emailCheck(data) {
    var formData = JSON.stringify(data)
    //console.log('formData out Email: ' + formData)
    const response = await fetch('/../api/validate/preEmail', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const dbEmail = await response.json() 
      console.log('dbEmail ' + dbEmail)
      return dbEmail
  }

  async function accountCheck(data) {
    var formData = JSON.stringify(data)
    //console.log('formData out Acct: ' + formData)
    const response = await fetch('/../api/validate/preAccount', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const chWallet = await response.json() 
      //console.log('chWallet ' + chWallet)
      return chWallet
  }
  
  function availClick(user) {
    console.log('req ' + user.request + ' user ' + JSON.stringify(user) )
    const availCheck = user.request.toUpperCase()
    setItemData(availCheck)
    caretCheck(availCheck)
  }

  function regClick(data) {
    console.log('Free click Check: ' + itemData + numberCount  + ' data ' + data)
    //chFormData()
    setPymtChoice('free')
  }

  function proClick(data) {
    console.log('Pro click Check: ' + itemData + numberCount  + ' data ' + data)
    setPymtChoice('Pro')
  }

  function premClick(data) {
    console.log('Prem click Check: ' + itemData + ' data ' + data)
    setPymtChoice('Prem')
  }


  return (
    <div id='purForm'>
      <div className='' >
        <div className='purRowOne' >
          <div className=''>
            <div>
              <PurchaseFeature title={data.title} /> 
            </div>
            <div>
              <PurchaseFeature subTitle={data.subTitle} /> 
            </div>
          </div>
        </div>
        <div className='purRow2'>
          <div className ="flex inline-block justify-center text-center mb-6">
            <div>
              <div className='text-3xl mb-4'>{itemData}{carrotIsAvail}</div>
            </div>
          </div>
            {banWord === 1 &&
              <div> 
              <div className='purRow2a'>
                <div className='flex inline-block justify-center text-center mb-6'>
                  <div id='purSignUp' className='flex inline-block justify-center text-center'>
                    <div>
                      <div className='text-3xl'>Banned Word. Please try again.</div>              
                    </div>
                  </div >
                </div>
              </div>
            </div>               
            }
            {carrotAvail === false &&         
              <div className='purRow3'>
                <div className ="flex inline-block justify-center text-center"> 
                    <form onSubmit={handleSubmit(availClick)}>               
                        <div className ="flex inline-block justify-center text-center">                                    
                          <div className ="form-group">
                            <input name="request" type="text" autoComplete="off" placeholder="Enter your Word" {...register('request')} className={`mt-2 form-control ${errors.request ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.request?.message}</div>
                            </div>
                            <div>                                 
                              <button disabled={formState.isSubmitting} className="btn btn-primary mr-12  mt-2 ml-8">
                                  {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                  Check Availabilty
                              </button>
                          </div>                                      
                        </div> 
                      </form>                 
                  </div>
                    <div> </div>
                </div>            }
          </div>
        <form onSubmit={handleSubmit(onSubmit)}> 
          {carrotAvail === false ?
            <div></div>
          :      
            <div>              
              <div className='purRow4'>
              <div className='flex inline-block justify-center text-center mb-6'>
                <div className='' ></div>
                <div id='purSignUp' >              

                    <div id='bxWallet' className=''>         
                      <div className="form-group mb-6 justify-left text-left">
                          <label>1) Email: </label>
                          <input id='inputEmail' name="email" type="text" onChange={e => this.setState({ text: e.target.value })} placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} autoComplete="off" />
                          <div className="invalid-feedback">{errors.email?.message}</div>
                          {emailDupe === 1 &&<div id='errEmail' className='errEmail' >Email already in use</div>}
										  </div>

                      <div>
                          <div className="form-group mt-6 justify-left text-left">
                              <label>2) Do you have a Crypto Wallet? </label>
                              <div  className="flex display-inline">
                                  <input type="radio" className='ml-4 mr-4' value="Yes" name="wallet" onClick={() => {walletValue(true)}} />&nbsp;Yes
                                  <div className='ml-4 text-sm'> </div>
                                  <input type="radio" className='l-4' value="No" name="wallet" defaultChecked="true" onClick={() => {walletValue(false)}} />&nbsp;No
                              </div>

                          </div>
                      </div>
                      
                      {walletState === false ? 
                        <div>
                            <div className="form-group mt-6 justify-left text-left">
                                <label>3) Password: </label>
                                <input name="password" type="password" placeholder='Password' {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                        </div>
                      :
                        <div>
                          <div className="form-group mt-6 justify-left text-left">
                              <label>3a) Wallet Chain</label>
                              <div className=''>
                                  <select id='selChain' name="chain" {...register('chain')} value={chainValue} onChange={(e) => { setChainValue(e.target.value); }} className={`form-control ${errors.chain ? 'is-invalid' : ''}`} >
                                  <option value="" disabled hidden>chain</option>
                                      <option value="Eth">Ethereum</option>
                                      <option value="Btc">Bitcoin</option>
                                      <option value="Matic">Matic</option>
                                      <option value="Doge">Doge</option>
                                  </select>
                              </div>
                              <div className='ml-4 text-sm'> ( example: Bitcoin )</div>
                          </div> 

                          <div className="form-group mt-6 justify-left text-left">
                              <label>3b) Wallet Address</label>
                              <input name="wallet" type="text" placeholder="wallet address" {...register('account')} className={`form-control ${errors.account ? 'is-invalid' : ''}`} />
                              <div className="invalid-feedback">{errors.account?.message}</div>  
                              {walletDupe === 1 &&<div id='errEmail' className='errEmail' >Account already in use</div>}                             
                          </div> 
                      </div>
                      }
                    </div>  
                      <div className="form-group mt-6 justify-left text-left">
                          <label>4) Choose a Plan</label>                            
                      </div>                               
                
                </div>
                <div className=''></div> 
                </div>
              </div>
            </div>
          }
        <div></div>
        <div className='purRow8'>        
          <div className='grid grid-cols-5 gap-4'>
            <div className='' ></div>
            <div className='bg-slate-200 text-3xl pt-4 mt-4 mb-6 rounded-xl'> FREE Option
                <div className=''>
                  <div className=''>
                    <div id='bxFree' className=''>                      
                        <div>                         
                          <div className='flex inline-block justify-center text-center mb-6'>
                            <div className='flex inline-block justify-left text-left'>  
                              { walletState === true ? 
                                <div>                         
                                <div className='flex inline-block justify-center text-center mb-6'>
                                  <div className=' inline-block justify-left text-left'>  
                                    <div className='justify-center text-center text-2xl pl-4 mt-4'>
                                          <p> Caret Tag: ^{itemData}{numberCount} </p>
                                        </div>                             

                                        <div className=''></div>
                                          <div className='text-2xl pl-4 pr-4'>
                                            <p> 1 Wallet Address <br />
                                                Auto 3 digit extension<br />
                                                <br />
                                                <br />
                                            </p>
                                          </div>                                                   
                                      </div>
                                    </div >
                                  </div>
                                :
                                  <div>
                                    <div className='justify-center text-center text-2xl pl-4 mt-4'>
                                      NOT AVAILABLE
                                    </div>
                                    {carrotAvail === true ?
                                        <div className='justify-center text-center text-2xl pl-4 mt-4'>
                                            Must have Crypto Wallet
                                        </div>
                                    :
                                        <div className='justify-center text-center text-2xl pl-4 mt-4'>
                                        
                                        </div>
                                    }
                                  </div>
                              }
                            </div>
                          </div >
                        </div>

                    </div>
                    <div className='flex inline-block justify-center text-center mt-4 mb-6'>
                      { walletState === false ? 
                        <div>                     
                          <button id='btnFree' disabled className="btn btn-primary mr-12 mt-2 ml-8" >Register</button>  
                        </div>
                      :
                        <div>
                          <button id='btnFree' className="btn btn-primary mr-12 mt-2 ml-8" onClick={() => regClick()}>FREE</button>  
                        </div>
                      }
                    </div>                  
                </div>
              </div>
            </div>
            <div className='bg-blue-200 text-3xl pt-4 mt-4 mb-6 rounded-xl'> Pro Option 
              <div className=''>
                  <div className=''>
                    <div id='bxPro' className=''>
                      {carrotAvail === true ?
                        <div>                         
                          <div className='flex inline-block justify-center text-center mb-6'>
                            <div className=' inline-block justify-left text-left'>  
                              <div className='justify-center text-center text-2xl pl-4 mt-4'>
                                <p> Caret Tag: ^{itemData}{numberCount} </p>
                              </div> 
                              <div className=''></div>
                                <div className='text-2xl pl-4 pr-4'>
                                  <p> 1 Wallet Address <br />
                                      Auto 3 digit extension<br />
                                      <br /><br />
                                  </p>
                                </div>                                                   
                            </div>
                          </div >
                        </div>
                      :
                        <div>                         
                          <div className='flex inline-block justify-center text-center mb-6'>
                            <div className='flex inline-block justify-left text-left'>  
                              <div className='justify-center text-center text-2xl pl-4 mt-4'>
                                <p>NOT AVAILABLE</p>                        
                              </div>
                    
                            </div>
                          </div >
                        </div>
                      }
                    </div>
                    <div className='flex inline-block justify-center text-center mt-4 mb-6'>                      
                      {carrotAvail === true ? 
                        <div>                     
                           <button id='btnPro' className="btn btn-primary mr-12 mt-2 ml-8" onClick={() => proClick()}> $ 5.00 USD </button>
                        </div>
                      :
                        <div>                         
                          <button id='btnPro' disabled className="btn btn-primary mr-12 mt-2 ml-8" >Register</button>   
                        </div>
                      }
                    </div>                 
                </div>
              </div>
            </div>
            <div className='bg-gray-300 text-3xl pt-4 mt-4 mb-6 rounded-xl'> Premium Option
              <div className=''>
                <div className=''>
                  <div id='bxPrem' className=''>
                    {carrotAvail === true ?
                      <div>                         
                          <div className='flex inline-block justify-center text-center mb-6'>
                            <div className=' inline-block justify-left text-left'>  
                              <div className='justify-center text-center text-2xl pl-4 mt-4'>
                                <p>Caret Tag: ^{itemData}</p>
                              </div> 
                              <div className=''></div>
                                <div className='justify-center text-center text-2xl pl-4 pr-4'>
                                  <p> 3 Wallet Addresses <br />
                                      {/*Add extension digits*<br />
                                      <br />
                                      <small>*apply a unique 3 digit ext 
                                        <br />to caret word. ie: ^{itemData}123 </small>*/}
                                    </p>
                                </div>                                                   
                            </div>
                          </div >
                        </div>
                    :
                      <div>                         
                        <div className='flex inline-block justify-center text-center mb-6'>
                          <div className='justify-center text-center'>  
                            <div className='justify-center text-center text-2xl pl-4 mt-4'>
                            <p>NOT AVAILABLE</p>  
                            </div> 
                            <div className='justify-left text-left text-2xl pl-4 mt-4'>

                            </div>              
                          </div>
                        </div >
                      </div>
                    }
                  </div>
                  <div className='flex inline-block justify-center text-center mt-4 mb-6'>
                    {carrotAvail === true ?
                        <div>                     
                           <button id='btnPrem' className="btn btn-primary mr-12 mt-2 ml-8" onClick={() => premClick()}> $ 20.00 USD</button>  
                        </div>
                      :
                        <div>                         
                           <button id='btnPrem' disabled className="btn btn-primary mr-12 mt-2 ml-8" >Register</button>    
                        </div>
                      }                   
                  </div>                  
                </div>
              </div>
            </div> 
            <div className=''></div> 
          </div>
        </div>
        </form>      
      </div>
    </div>
  )
}

