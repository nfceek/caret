
import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'

import { pinataPublicKey } from "../../projectId";
import { pinataPrivateKey } from "../../projectSecret";

import { server } from '../config';


//const redirectURL = process.env.NODE_ENV === 'development' && 'http://localhost:3000';
//export const server = dev ? 'http://localhost:3000' : 'https://caret.cloud';
export default function PurchaseComplete() {
  const[saleStatus, setSaleStatus] = useState()
  const[inCaret, setInCaret] = useState()
  //const[rStatus, setRStatus] = useState()
  const[runOnce, setRunOnce] = useState(0)

  const router = useRouter()
  const {status} = router.query
  const rStatus = status
  const {caret} = router.query 
  const fullCaret = '^' + caret
  
  //console.log('status ' + server + ' or is it '  + JSON.stringify(caret) + ' full caret ' + fullCaret)
  postUp(caret, status) 

  async function lgClick(){
    router.push('/account')
  }

  async function cClick(){
    router.push('/')
  }
  async function postUp(word, stat){

    var rStatus = stat
    var rCaret = word

    if(rStatus === 'success' || rStatus === 'promo' || rStatus === 'free' ){
      var rAvail = 0
      var rPend = 0
      var rSold = 1
      var rBan = 0
      var rActive = 1
    }else{
      var rAvail = 1
      var rPend = 0
      var rSold = 0
      var rBan = 1
      var rActive = 0
    }
  
    var cUpdateWord = []
    cUpdateWord.push(rCaret)
    cUpdateWord.push(rAvail)
    cUpdateWord.push(rPend)
    cUpdateWord.push(rSold)
    cUpdateWord.push(rBan)
    cUpdateWord.push(rActive)
  
    //console.log('prepper data ' + cUpdateWord)
     // --update IPFS Only if user has wallet
    postUser(cUpdateWord)
  
    if(rStatus === 'success' || rStatus === 'promo' || rStatus === 'free' ){
      postSales(cUpdateWord)   
    }else{
      rmSales(cUpdateWord)
    }
  }

  async function postUser(data) { 
    //console.log(' user data ' + JSON.stringify( data))
    var formData = data
  
    const response = await fetch(server + '/api/finalUser', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const stepUser = await response.json()        
  } 

  async function postSales(data){
    //console.log(' user data ' + JSON.stringify( data))
    var formData = data
  
    const response = await fetch(server + '/api/finalSales', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const stepSales = await response.json() 
    
    postCarrots(data)
  }

  async function postCarrots(data){
    //console.log(' user data ' + JSON.stringify( data))
    var formData = data
  
    const response = await fetch(server + '/api/finalCarrot', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const stepCarrots = await response.json()        
  }  

  async function rmSales(data){
    //console.log(' user data ' + JSON.stringify( data))
    var formData = data
  
    const response = await fetch(server + '/api/removeSales', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const stepSales = await response.json()
    
    rmCarrots(data)

  }
  

  async function rmCarrots(data){
    //console.log(' user data ' + JSON.stringify( data))
    var formData = data
  
    const response = await fetch(server + '/api/removeCarrot', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const stepCarrots = await response.json()        
  }
  

  async function insertIPFS(user){

    var dataIn = user.toString()
    var dataArr = dataIn.split(',');
    let userIn = dataArr[0]          
    let wordIn = dataArr[1]
    let messageIn = dataArr[9] 

    const body = {
      caret: messageIn
    };
    const options = {
      pinataMetadata: {
        name: '^'+wordIn,
        keyvalue: 'caret.cloud',
        pinataOptions: {
          cidVersion: 0
        }
      }
    }

    pinata.pinJSONToIPFS(body, options).then((result) => {
        //handle results here
        setFileCid(result.IpfsHash)
        //console.log('result cid ' + fileCid)
        updateCidCarrot(userIn,result.IpfsHash )
    }).catch((err) => {
        //handle error here
        console.log(err);
    });      
  }
      
  async function updateCidCarrot(user, cid){
    var cInsertWord = ''
    var cUpdateWord = []
    cUpdateWord.push(user)
    cUpdateWord.push(cid)

    const response = await fetch(server + '/api/carrotCid', {
      method: 'POST',
      body:  cUpdateWord,
      headers: {
      'Content-Type':'applications/json'
      },
    })
    const dbInsert = await response.json() 
      //console.log('dbCid ' + JSON.stringify(dbInsert))
      return dbInsert

  }

  return (
    <div id='purFormComplete' >
      <div className='' >
        <div className='purRowOne' >
          {rStatus ==='success' &&
              <div>
                <div className='justify-center text-center text-5xl pl-4 mt-4 mb-6'>
                  {fullCaret} Purchase Status
                </div>
              </div>
          }
          {rStatus === 'promo' || rStatus === 'free' &&
              <div>
                <div className='justify-center text-center text-5xl pl-4 mt-4 mb-6'>
                  {fullCaret} Creation Status
                </div>
              </div>
          }
          <div id='resultArea' className='' >
                        
            {rStatus === 'fail' ?
              <div>  
                <div className='flex inline-block justify-center text-center mb-6'>
                  <div className='justify-center text-center'>  
                    <div className='justify-center text-center text-2xl pl-4 mt-4'>
                      <div id='itemNeg' className='bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700'>
                        Creation Unsuccessful
                      </div>
                      </div>
                    </div >
                  </div >                                                                                     
                  <div className='flex inline-block justify-center text-center mb-6'>
                    <div className=''>  
                      <div className='justify-left text-left text-2xl pl-4 mt-4'>
                        Oops, something went wrong...Please try again.
                      </div> 
                      <div className='justify-left text-left text-2xl pl-4 mt-4 pb-5'></div> 
                      <div className='justify-right text-right pl-4 mt-4'></div>
                  </div>
                </div>
              </div>
            :
              <div>
                <div className='flex inline-block justify-center text-center mb-6'>
                  <div className=''>  
                    <div className='justify-center text-center text-2xl pl-4 mt-4'>
                      {rStatus ==='success' &&
                        <div>
                          <div id='itemPos' className='bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700'>
                            Payment Successful
                          </div>
                        </div>
                      }
                      {rStatus === 'promo' || rStatus === 'free' &&                            
                        <div>
                          <div id='itemPos' className='bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700'>
                            Caret Creation Successful
                          </div>
                        </div>
                      }
                    </div>                 
                    <div className='flex inline-block justify-center text-center mb-6'>
                      <div className=''>  
                        <div className='justify-left text-left text-2xl pl-4 mt-4'>
                          You now have an Account and your Caret is active.
                        </div> 
                        <div className='justify-left text-left text-2xl pl-4 mt-4 pb-5'>
                          Login to the user dashboard to update information or add services. 
                        </div> 
                        <div className='justify-right text-right pl-4 mt-4'>
                          <button id='btnLogin' className="btn btn-primary mr-12 mt-2 ml-8" onClick={() => lgClick()}>Login</button>
                        </div>
                      </div>
                    </div>
                  </div >
                </div>
              </div>                
            }
              </div>
          </div>
        </div>  
      </div>
    )
}

