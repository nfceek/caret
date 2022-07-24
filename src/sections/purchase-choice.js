
import React, { useState } from "react"
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js';

//import { pinataPublicKey } from "../../projectId";
//import { pinataPrivateKey } from "../../projectSecret";
import { stripePublishableKey } from "../../stripeId"
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PurchaseFeature from 'components/purchase-feature';
import { server } from '../config';

const publishableKey = stripePublishableKey
const stripePromise = loadStripe(publishableKey); 

export default function PurchaseChoice() {
  const bcrypt = require('bcryptjs');
  //const pinataSDK = require('@pinata/sdk');
  //const pinata = pinataSDK(pinataPublicKey, pinataPrivateKey);
  
  const [carrotAvail, setCarrotAvail] = useState()
  const [carrotIsAvail, setCarrotIsAvail] = useState(false) 
  const [carrotInDb, setCarrotInDb ] = useState('')
  const [carrotNumInDb, setCarrotNumInDb ] = useState('')
  const [userCountCheck, setUserCountCheck] = useState(0) 
  const [itemData, setItemData] = useState('') 
  const [numberCount, setNumberCount] = useState(Math.floor(Math.random() * (999 - 50 + 1)) + 4)
  const [itemDataAppend, setItemDataAppend] = useState('')
  const [chainValue, setChainValue] = useState('');
  const [walletState, setwalletState] = useState(false)   // does user have wallet
  const [feeFree, setFeeFree] = useState(false)             // no strings attached
  const [feePro, setFeePro] = useState(false)               // is this a paid word -- Pro
  const [feePrem, setFeePrem] = useState(false)             // is this a paid word == Prem
  const [busWord, setBusWord] = useState(false)             // is this a bus word               
  const [banWord, setBanWord] = useState(false)             // is this a banned word
  const [wordPrice, setWordPrice] = useState(0)             // word cost how much
  const [pymtChoice, setPymtChoice] = useState('none')
  const [contractData, setContractData] = useState()
  const [pubKey, setPubKey] = useState()
  const [privKey, setPrivKey] = useState()
  const [newUser, setNewUser] = useState()
  const [maxUser, setMaxUser] = useState()
  const [emailDupe, setEmailDupe] = useState(0)         // if user, is email a dupe
  const [walletDupe, setWalletDupe] = useState(0)
  const [userIn, setUserIn] = useState(0)               // is user logged in
  const [cidDbWallet, setCidDbWallet] = useState(true)
  const [authResult, setAuthresult] = useState()
  const [fileCid, setFileCid] = useState(null)
  const [loading, setLoading] = useState(false)  
  const [stripeReturn, setStripeReturn] = useState(false)
  const [proCost, setProCost] = useState('$ 5.00 USD')
  const [premCost, setPremCost] = useState('$ 20.00 USD')
  const [promoError, setPromoError] = useState('hidden')
  const [promoApplied, setPromoApplied] = useState('hidden')
  const [promoAgain, setPromoAgain] = useState(false)
  const [promoWord, setPromoWord] = useState('none')

  const [stripe5Data, setStripe5Data] = useState({
    name: 'Caret PRO Plan',
    description: 'Crypto Address Naming Service for Single Wallet Address. Get Caret Tag vanity name for 1 Crypto wallet address.',
    image: 'https://caret.cloud/images/cnas-pro-sm.png',
    quantity: 1,
    price: 5,
  });

  const [stripe20Data, setStripe20Data] = useState({
    name: 'Caret PREM Plan',
    description: 'Crypto Address Naming Service for Multi Wallet Address. Get Caret Tag vanity name for 3 Crypto wallet address.',
    image: 'https://caret.cloud/images/cnas-prem-sm.png',
    quantity: 1,
    price: 20,
  });


  var secureKeys=['']
  var maxUserNum=['']
  
  const router = useRouter();
  const statusIn = router.query;

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
        setItemData(router.query.data)
        caretCheck(router.query.data)
        var item = localStorage.getItem('caret')
        //var item = uStatus
        //console.log('uStatus in ' + item)
        chStatus(item)
      } catch (error) {
        console.log('purchase routing error: ', error)
        //router.push('/')
      }
    }
  }, [router.isReady]);
  
  function chStatus(data){
    if(data === null){
      setUserIn(0)
    }else{
      setUserIn(1)
    }
  }

  async function caretCheck(data) { 
    var formData = JSON.stringify(data)
    //console.log('caretCheck 1 ' + data)
    const response = await fetch('../api/validate/returnCarrot', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const stepOne = await response.json() 
    //console.log('caretCheck 1 result ' + JSON.stringify(stepOne))
    caretInformation(data, stepOne)
  }

  async function caretInformation(data, info) {
    //console.log('caretData ' + data + ' caretInfo ' + info) 
    // is person logged in
    if(localStorage === window.localStorage){
      if(typeof window !== "undefined" && localStorage.caret !== null || localStorage.caret !== "undefined"){
      }
    } 
    if(info === 0){ 
      setCarrotIsAvail(' is available')
      setCarrotAvail(true)
      setCarrotInDb(false)
    } else {      
      const wordAvail = await caretAvailCheck(data)
      //console.log('returned availWord ' + JSON.stringify(wordAvail))    
        if(wordAvail === 0){
          setCarrotIsAvail(' is NOT available ')
          setCarrotAvail(false)
          console.log('not avail')
        }else{          
          var data = (data + numberCount.toString())
          //console.log('numCheck data ' + data)
          const wordNumAvail = await caretNumCheck(data)
          //console.log('word and number avail ' + wordNumAvail)
            if(wordNumAvail === 0){
              setCarrotIsAvail(' is available')
              setCarrotAvail(true)
              setCarrotInDb(true)
            }else{
              setCarrotIsAvail(' is NOT available ')
              setCarrotAvail(false)
            }           
        } 
      }
  }

  async function caretAvailCheck(data) { 
    var formData = data
    const response = await fetch('../api/validate/returnAvailCarrot', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const stepTwo = await response.json() 
    //console.log('caretCheck 3 test ' + stepTwo[0].available)
    const availWord = stepTwo[0].available
    return availWord
    
  }

  async function caretNumCheck(data) { 
    var formData = JSON.stringify(data)
    //console.log('numCheck 2 ' + formData)
    const response = await fetch('../api/validate/returnCarrot', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const stepThree = await response.json() 
    //console.log('caretCheck 3 ' + JSON.stringify(stepThree))
    return stepThree
  }

  var validationProcess = ''
  if(carrotAvail === false){
    validationProcess = Yup.object().shape({
      request: Yup.string()
        .min(5, 'Caret choice must be at least 5 characters') 
        .max(15, 'Caret choice must be less than 15 characters')
        .matches(/^[aA-zZ0-9-_\s]+$/, "Only Alpha characters are allowed for Caret choice")
    });   
  }else{
    if(walletState === true){
     validationProcess = Yup.object().shape({
        email: Yup.string()
          .required('Email is required')
          .min(6, 'Email to short')
          .max(50, 'Email to long')
          .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "Email must be in standard format"),
        chain: Yup.string()
          .min(2, 'Chain Name Required'),
        account: Yup.string()
          .required('Wallet Address is Required')
          .min(12, 'Wallet Addres must be at least 12 characters')
          .max(100, 'wallet address to long'),         
      });
    }else{
      validationProcess = Yup.object().shape({
       email: Yup.string()
          .required('Email is required')
          .min(6, 'Email to short')
          .max(50, 'Email to long')
          .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "Email must be in standard format"),
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
    
    // is it in db
    /console.log('in db ' + carrotInDb + ' wallet State ' + walletState )
    //console.log('pre validate data: ' + JSON.stringify(data))
    // get keys
    preKeys()

    var cWord = ''
    var append = numberCount
    var cWallet = ''
    var cChain = ''
    var cIpfs = 0
    var cPwd = ''
    var cidWallet = ''
    // set wallet state
    if(walletState === true){
      cChain = data.chain
      cWallet = data.account
      cIpfs = 1
      cidWallet = '_' + cChain +  ':' + cWallet
      setCidDbWallet(true)
    }else{
      cPwd = data.password
      cidWallet = '_NONE:TBD'
      setCidDbWallet(false)
    }
    var cPrice = ''
    var planChoice = ''
    var numChoice = ''
    if(pymtChoice === 'Prem'){
      cWord = itemData.toLowerCase()
      numChoice = '0'
      setNumberCount(0)
      cPrice = 20
      planChoice = 3
    } else if (pymtChoice === 'Pro') {      
      cWord = itemData.toLowerCase() + numberCount
      numChoice = numberCount
      cPrice = 5;
      planChoice = 2
    } else if (pymtChoice === 'Promo') {
      cWord = itemData.toLowerCase()
      numChoice = '0'
      setNumberCount(0)
      cPrice = 10
      planChoice = 4
    } else if (pymtChoice === 'freePro') {     
      cWord = itemData.toLowerCase() + numberCount
      numChoice = numberCount
      cPrice = 0;
      planChoice = 5
    } else if (pymtChoice === 'freePrem') {
      cWord = itemData.toLowerCase()
      numChoice = '0'
      setNumberCount(0)
      cPrice = 0
      planChoice = 6
    } else {
      cWord = itemData.toLowerCase() + numberCount
      numChoice = numberCount
      cPrice = 0;
      planChoice = 1
    }
    var cSitepublickey = secureKeys[0]
    var cSiteprivatekey = secureKeys[1]
    var cPublickey = secureKeys[2]
    var cPrivkey = secureKeys[3]
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var setTime = date + '-' + time;
    var promo = ''
    //assemble caret string for CID
    var cCid = ('^' + cWord + '::CNAS' + cidWallet + '::pKey:' + cPublickey + '::settime:' + setTime)
    // set carrot pending
    var cAvail = 0
    var cPend = 1
    var cSold = 0
    var cPromo = promoWord
    // get new user ID
    var cUserEmail = data.email
    var curDate = new Date().toISOString()

    var cUpdateWord = []
    cUpdateWord.push(cUserEmail)
    cUpdateWord.push(cWord)
    cUpdateWord.push(numChoice)
    cUpdateWord.push(cPrice)
    cUpdateWord.push(cSitepublickey)
    cUpdateWord.push(cSiteprivatekey)
    cUpdateWord.push(cPublickey)
    cUpdateWord.push(cPrivkey)
    cUpdateWord.push(curDate)
    cUpdateWord.push(cCid)
    cUpdateWord.push(planChoice)
    cUpdateWord.push(promo)
    cUpdateWord.push(cAvail)
    cUpdateWord.push(cPend)
    cUpdateWord.push(cSold)
    cUpdateWord.push(cPromo)
    cUpdateWord.push(cIpfs)

    // user
    preAddUser(data)
    //update db word
    //console.log('master word avail: ' + carrotInDb + ' numWord avail ' + carrotNumInDb)
    if(carrotInDb === true){
      //console.log('UpdateDB: ' + carrotInDb)
      await updateCarrot(cUpdateWord)
    }else {
      //console.log('InsertDB: ' + carrotInDb)   
      await insertCarrot(cUpdateWord)
    }
    // set sales data
    preSalesData(cUpdateWord)

    // check for promo code
    //console.log('pymt choice ' + pymtChoice)
    if(pymtChoice === 'Pro'){
      createCheckOutSession(stripe5Data, cUserEmail, cCid, cWord )
    }else if(pymtChoice === 'Prem'){
      createCheckOutSession(stripe20Data, cUserEmail, cCid, cWord )
    }else{
      // is it free - promo pro free - or promo prem free  
      createFreeCheckOutSession(data, cUserEmail, cCid, cWord )
    }

    async function createFreeCheckOutSession(data, uEmail, cCid, cWord){
      //console.log('free data' + JSON.stringify(data) )
      var cStat = 'success'
      if(pymtChoice === 'free'){
        cStat = 'free'
      }else if(pymtChoice === 'freePro' || pymtChoice === 'freePrem') {
        cStat = 'promo'
      }

      router.push(
        {
          pathname: '/complete',
          query: {status: cStat, caret: cWord}   
        //}, '/complete')
        },)        
    }

    async function createCheckOutSession(data, uEmail, cCid, cWord){
      //console.log('data in: ' + JSON.stringify(data) + ' word ' + cWord)
      var wordIn = cWord.toUpperCase()
      var toItem = []
      var toItem = {
        'name':data.name  + ' for: ^' + wordIn,
        'description': data.description,
        'image': data.image,
        'quantity': data.quantity,
        'price': data.price,
        'caret': wordIn, 
       }
    
        const stripe = await stripePromise;
        const checkoutSession = await axios.post('../api/create-stripe-session', {
          item: toItem,
        });  
        const result = await stripe.redirectToCheckout({         
          sessionId: checkoutSession.data.id,
        });
        if (result.error) {
          alert(result.error.message);
        } 
                  
      }
     
    //if we get past 5 kick user to main page
    //console.log('form abuse ct check: ' + userCountCheck)
    //{userCountCheck === 5 && router.push('/')}

    //flush()
    
  }

  function flush(data){
    //console.log('sayonara baby')
   // redirect user to dashboard/ty page

    return
  }

  async function preSalesData(data){
    //console.log('sales user data ' + JSON.stringify( data))
    var formData = data
    const response = await fetch(server + '/api/carrotSold', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const stepSales= await response.json()
    return stepSales 
  }

  async function prePymt(user) {
    var formData = JSON.stringify(data)
    const response = await fetch('../api/validate/returnCarrot', {
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
    //console.log('load ' + JSON.stringify(user) + ' data ' + JSON.stringify(data))
    const curDate = new Date().toISOString()
    var pwd = ''
    var uname = ''
    var planChoice = 1
    var fkword = 0
    //console.log(' wall state ' + walletState)
    if(walletState === false){
      pwd = bcrypt.hashSync(user.password, 10) 
    }else{
      fkword = 1
    }

    if(pymtChoice === 'Prem'){
      planChoice = 3;
      setNumberCount(0)
      uname = itemData;
    } else if (pymtChoice === 'Pro') {
      planChoice = 2;
      uname = itemData + numberCount
    } else if (pymtChoice === 'Promo') {
      planChoice = 4;
      uname = itemData;
    } else if (pymtChoice === 'freePro') {
      planChoice = 5;
      uname = itemData + numberCount
    } else if (pymtChoice === 'freePrem') {
      planChoice = 6;
      setNumberCount(0)
      uname = itemData;
    } else {
      planChoice = 1;
      uname = itemData + numberCount
    }

    const response = await fetch(server + '/api/carrotRegister', {
        method: 'POST',
        body:  [JSON.stringify(user.email),uname,pwd,JSON.stringify(user.chain), JSON.stringify(user.account), planChoice, fkword],
        headers: {
          'Content-Type':'applications/json'
        },
    })

    const regSuccess = await response.json()      
    return regSuccess

  }

  async function preMaxUserId(user){

    const response = await fetch(server + '/api/validate/preCarrotUserId', {
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

  async function prePromoCheck(data){
    //console.log(' user data ' + JSON.stringify( data))
    var formData = JSON.stringify(data)
    const response = await fetch(server + '/api/validate/prePromo', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const stepPromo = await response.json()
    return stepPromo
  }

  async function salesCarrot(data){
    //console.log(' user data ' + JSON.stringify( data))
    const response = await fetch(server + '/api/salesCarrot', {
      method: 'POST',
      body:  data,
      headers: {
      'Content-Type':'applications/json'
      },
    })
    const dbInsert = await response.json() 
      //console.log('dbCid ' + JSON.stringify(dbInsert))
      return dbInsert

  }

  async function insertCarrot(data){
    //console.log('insert user data ' + JSON.stringify( data))
    const response = await fetch(server + '/api/insertCarrot', {
      method: 'POST',
      body:  data,
      headers: {
      'Content-Type':'applications/json'
      },
    })
    const dbInsert = await response.json() 
      //console.log('dbInsert ' + dbInsert)
      return dbInsert
  }

  async function updateCarrot(data){
    //console.log('update user data ' + JSON.stringify( data))
    const response = await fetch(server + '/api/updateCarrot', {
      method: 'POST',
      body:  data,
      headers: {
      'Content-Type':'applications/json'
      },
    })
    const dbUpdatePrem = await response.json() 
      //console.log('dbUpdatePrem ' + dbUpdatePrem)
      return dbUpdatePrem
  }

  async function updatePromo(data){
    //console.log(' user data ' + JSON.stringify( data))
    const response = await fetch(server + '/api/updatePromo', {
      method: 'POST',
      body:  data,
      headers: {
      'Content-Type':'applications/json'
      },
    })
      const updatePromo = await response.json() 
      return updatePromo
  }


  async function emailCheck(data) {
    //console.log(' user data ' + JSON.stringify( data))
    var formData = JSON.stringify(data)
    //console.log('formData out Email: ' + formData)
    const response = await fetch(server + '/api/validate/preEmail', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const dbEmail = await response.json() 
      //console.log('dbEmail ' + dbEmail)
      return dbEmail
  }

  async function accountCheck(data) {
    //console.log(' user data ' + JSON.stringify( data))
    var formData = JSON.stringify(data)
    const response = await fetch(server + '/api/validate/preAccount', {
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
    //console.log('req ' + user.request + ' user ' + JSON.stringify(user) )
    const availCheck = user.request.toUpperCase()
    setItemData(availCheck)
    caretCheck(availCheck)
  }

  let txtPromoApply = React.createRef();
  async function promoApply() {
    //console.log('promoApply value: ' + txtPromoApply.current.value)
    var data = txtPromoApply.current.value
    const checkPromo = await prePromoCheck(data) 
   
    if(checkPromo === undefined || checkPromo.length === 0){
      //console.log(' im not dead yet ' + checkPromo )
      setPromoAgain(false)
      setPromoError('visible pt-4 ml-6 mb-6 text-pink-800')
      setPromoApplied('hidden pt-4 ml-6 mb-6 text-teal-800')
    }else{
      var proDisc = 5 - (5 * ( parseInt(checkPromo[0].prodisc) / 100))
      var premDisc = 20 - (20 * ( parseInt(checkPromo[0].premdisc) / 100))      
      var cCode = checkPromo[0].code
      setPromoWord(cCode)
      var ctPromo = parseInt(checkPromo[0].counter)
      if(ctPromo === 0 ){
        setPromoAgain(false)
        setPromoError('visible pt-4 ml-6 mb-6 text-pink-800')
        setPromoApplied('hidden pt-4 ml-6 mb-6 text-teal-800')
      }else{
      ctPromo = (ctPromo - 1)    
      //console.log('Gimmie the Promo ' + JSON.stringify(checkPromo) + ' disc pro ' + proDisc + ' disc prem ' + premDisc)
        if(proDisc === 0){
          setPymtChoice('Promo')
          setProCost(' FREE ')
          setPromoAgain(true)
          setPromoApplied('visible pt-4 ml-6 mb-6 text-teal-800')
          setPromoError('hidden pt-4 ml-6 mb-6 text-pink-800')
        }         
        if(premDisc === 0){
          setPymtChoice('Promo')
          setPremCost(' FREE ')
          setPromoAgain(true)
          setPromoApplied('visible pt-4 ml-6 mb-6 text-teal-800')
          setPromoError('hidden pt-4 ml-6 mb-6 text-pink-800')
        } else {
          setPymtChoice('Promo')
          setPromoAgain(true)
          setPremCost('$ ' + premDisc + '.00 USD')
          setPromoApplied('visible pt-4 ml-6 mb-6 text-teal-800')
          setPromoError('hidden pt-4 ml-6 mb-6 text-pink-800')
        }      
      
      var cCounter = ctPromo
      var cUpdatePromo = []
      cUpdatePromo.push(cCode)
      cUpdatePromo.push(cCounter)
      updatePromo(cUpdatePromo)
    }

    }
    return
  }

  function regClick(user) {
    var pymt
   // console.log('Free click Check: ' + itemData + numberCount  + ' data ' + JSON.stringify(data) + ' pymt Choice ' + pymtChoice)
    pymt = 'free'
    createPayment(pymt)
  }

  function proClick(user) {
    var pymt
    //console.log('Pro click Check: ' + itemData + numberCount  + ' data ' +JSON.stringify(data) + ' pymt Choice ' + pymtChoice)
    if(pymtChoice === 'Promo'){
      pymt = 'freePro'     
    } else {
      pymt = 'Pro'    
    } 
    createPayment(pymt)
  }

  function premClick(user) {
    var pymt
    //console.log('Prem click Check: ' + itemData + numberCount  + ' data ' + JSON.stringify(data) + ' pymt Choice ' + pymtChoice)
    if(pymtChoice === 'Promo'){
      pymt = 'freePrem'   
    } else {
      pymt = 'Prem'    
    }
    createPayment(pymt)
  }

  async function createPayment(data){
    setPymtChoice('none')
    setPymtChoice(data)
    //console.log('create pymt setting2: ' + pymtChoice)
  }


  return (
    <div id='purForm' >
      <div className='' >
        <div className='purRow1' >
          <div className=''>
            <div>
              <PurchaseFeature title={data.title} /> 
            </div>
            <div>
              <PurchaseFeature subTitle={data.subTitle} /> 
            </div>
          </div>
        </div>
        {userIn === 1 ? 
            <div>
              <div className='purRow2'>
                <div className ="block inline-block justify-center text-center mb-6">
                  <div>
                    <div className='text-3xl mb-4'>{itemData}{carrotIsAvail}</div>
                  </div>
                  <div className ="flex inline-block justify-center text-center mb-6">
                    <div>
                      <div id='bxloggedIn' className='text-3xl mt-8 mb-4'><p>We are very happy that you want to buy another Caret Tag.<br />
                      <br />
                      You already have an account and are logged in. <br />
                      <br />
                      Please login to your dashboard to add Caret Tags <br />
                      and/or upgrade your subscription plan
                        </p></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            :
            <div className=''>
              <div className='purRow3'>
                <div className ="flex inline-block justify-center text-center mb-6">
                  <div>
                    <div className='text-3xl mb-4'>{itemData}{carrotIsAvail}</div>
                  </div>
                </div>
                  {banWord === 1 &&
                    <div> 
                    <div className='purRow4'>
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
                    <div className=' container purRow5'>
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
                      </div>            
                    }
                </div>
              <form onSubmit={handleSubmit(onSubmit)}> 
                {carrotAvail === false ?
                  <div></div>
                :      
                  <div>              
                    <div className='purRow6'>
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
                                        <option value="BTC">Bitcoin</option>
                                        <option value="CHIA">Chia</option>
                                        <option value="DOGE">Doge</option>
                                        <option value="ETH">Ethereum</option>
                                        <option value="LTC">LiteCoin</option>
                                        <option value="MATIC">Matic</option>
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
              
              <div className=''></div>
              <div className='purRow7'>
                <div className ="flex inline-block justify-center text-center mt-2 mb-2">
                  <div className='flex row display-inline justify-center mb-2'>
                    <input ref={txtPromoApply} disabled={promoAgain} className='promoApply rounded-xl' type="text" placeholder=' promo code' />
                    <div id='btnPromoA' disabled={promoAgain} className="btn btn-primary pt-2 ml-4 mr-4" onClick={() => promoApply()}>Apply</div>
                  </div>
                </div>
                  <div className='flex row display-inline justify-center mb-2'>
                    <div id='promoErr' className={promoError}> That Promo Code Is Incorrect or Expired</div>
                    <div id='promoApp' className={promoApplied}> Your Promo Code Was Applied</div>
                  </div>        
              </div>

              <div className=''></div>
              <div className='purRow8'>        
                <div id='boxPrice' className='bxPrice justify-center items-center gap-4'>

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
                                        <div className='justify-center text-center font-bold text-2xl pl-4 mt-4'>
                                              <p>^{itemData}{numberCount} </p>
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
                                <button id='btnFree' disabled={loading} className="btn btn-primary mr-12 mt-2 ml-8" onClick={() => regClick()}>{loading ? 'Processing...' : 'FREE'}</button>  
                              </div>
                            }
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
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
                                    <div className='justify-center text-center font-bold text-2xl pl-4 mt-4'>
                                      <p>^{itemData}{numberCount} </p>
                                    </div> 
                                    <div className=''></div>
                                      <div className='text-2xl pl-4 pr-4'>
                                        <p> 1 Wallet Address <br />
                                            Auto 3 digit extension<br />
                                            <br />
                                        </p>
                                      </div>
                                      <div className='justify-center text-xl text-center pl-4 pr-4'></div>                                                
                                  </div>
                                </div>
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
                                 <button id='btnPro' disabled={loading}  className="btn btn-primary mr-12 mt-2 ml-8" onClick={() => proClick()}>{proCost}</button>                     
                                {/*<button id='btnPro' disabled={loading} className="btn btn-primary mr-12 mt-2 ml-8" onClick={() => proClick()}>{loading ? 'Processing...' : '$ 5.00 USD'}</button>*/}
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
                                    <div className='justify-center font-bold text-center text-2xl pl-4 mt-4'>
                                      <p> ^{itemData}</p>
                                    </div> 
                                    <div className=''></div>
                                      <div className='justify-center text-center text-2xl pl-4 pr-4'>
                                        <p> 3 Wallet Addresses <br />
                                            No Auto Extension on Caret<br />
                                            <br />
                                          </p>
                                      </div>
                                      <div className='justify-center text-xl text-center pl-4 pr-4'></div>                                                 
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
                                <button id='btnPrem' disabled={loading} className="btn btn-primary mr-12 mt-2 ml-8" onClick={() => premClick()}>{premCost}</button>                     
                                {/* <button id='btnPrem' disabled={loading} className="btn btn-primary mr-12 mt-2 ml-8" onClick={() => premClick()}>{loading ? 'Processing...' : '$ 20.00 USD'}</button>  */}
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

                </div>
              </div>             
             </form> 
              <div className=''>
            </div>
          </div>            
        }           
      </div>
    </div>
  )
}

