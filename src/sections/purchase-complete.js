

import React, { useState } from "react"
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js';

import { pinataPublicKey } from "../../projectId";
import { pinataPrivateKey } from "../../projectSecret";
import { stripePublishableKey } from "../../stripeId"
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PurchaseFeature from 'components/purchase-feature';
var FormData = require('form-data');

export default function PurchaseComplete() {

  const { query } = useRouter();
  const[saleStatus, setSaleStatus] = useState()
  const router = useRouter();
  var rStatus = router.query;
  var rCaret = ''
  var rEmail = ''
  var rCid = ''
  console.log('status ' + JSON.stringify(rStatus) + ' caret ' + rCaret + ' email ' + rEmail + ' cid' + rCid)


  var rAvail = 0
  var rPend = 1
  var rSold = 0


  var rPromo = ''
  var today = new Date();
  var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var setTime = date + '-' + time;

  // get new user ID
  var cUserEmail = ''
  const curDate = new Date().toISOString()
  var cInsertWord = ''
  var cUpdateWord = []
  cUpdateWord.push(rEmail)
  cUpdateWord.push(rCaret)
  cUpdateWord.push(rCid)
  cUpdateWord.push(rPromo)
  cUpdateWord.push(rAvail)
  cUpdateWord.push(rPend)
  cUpdateWord.push(rSold)
  cUpdateWord.push(curDate)

    console.log('1 - baseline queries')
      // -- await preInsertIPFS() 
      // -- insert IFPS
    console.log('2 - api queries')
      // -- postUser(data)
      // -- postCarot(data)
      // -- postUser(data)
      //
    console.log('3 - purchase insert queries')
      // --update IPFS Only if user has wallet
      // update carrot -- pending 0 and sold 1
      // update user -- activate = 1
      // update sales table  -- pending 0 and sold 1
      //
    console.log('4 - decline update queries')
      // --update IPFS Only if user has wallet
      // update carrot -- avail 0 if prem sold 0 -- rm row if pro or free plan
      // no action on user
      // update sales table -- rm sale row
      //

      async function postUser(user) { 
        //console.log(' user data ' + JSON.stringify( data))
        var formData = data
       
        const response = await fetch('/../api/finalUser', {
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
       
        const response = await fetch('/../api/finalSales', {
          method: 'POST',
          body: formData, 
          headers: {
            'Content-Type':'applications/json'
          },
        })
        const stepSales = await response.json()        
      }

      async function postCarrots(data){
        //console.log(' user data ' + JSON.stringify( data))
        var formData = data
       
        const response = await fetch('/../api/finalCarrot', {
          method: 'POST',
          body: formData, 
          headers: {
            'Content-Type':'applications/json'
          },
        })
        const stepCarrots = await response.json()        
      } 
    
   
    async function preInsertIPFS(){
       /*
      pinata.testAuthentication().then((result) => {
        //handle successful authentication here
        console.log('Pinata test: ', result);
        setAuthresult(result)
      }).catch((err) => {
          //handle error here
          console.log(err);
      });
       */ 
    }
  
    //if(cidDbWallet === true){
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
          console.log('result cid ' + fileCid)
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
  
      const response = await fetch('/../api/carrotCid', {
        method: 'POST',
        body:  cUpdateWord,
        headers: {
        'Content-Type':'applications/json'
        },
      })
      const dbInsert = await response.json() 
        console.log('dbCid ' + JSON.stringify(dbInsert))
        return dbInsert
  
    }
    


  return (
    <div id='purFormComplete' >
      <div className='' >
        <div className='purRowOne' >
          <div className='justify-center text-center text-6xl pl-4 mt-4 mb-6'>
            Purchase Status Page
          </div>

            <div id='resultArea' className='' >
                {/*{status && status === 'success' && (*/}
                  <div>  

                    <div className='flex inline-block justify-center text-center mb-6'>
                      <div className='justify-center text-center'>  
                        <div className='justify-center text-center text-2xl pl-4 mt-4'>
                          <div id='itemPos' className='bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700'>
                            Payment Successful
                          </div>
                        </div> 
                        <div className='justify-left text-left text-2xl pl-4 mt-4'>
                          You now have an account and your Caret can be viewed HERE
                      </div>              
                    </div>
                  </div >

                </div>                

                 {/*)}
                {status && status === 'cancel' && (*/}

                  <div>  

                    <div className='flex inline-block justify-center text-center mb-6'>
                      <div className='justify-center text-center'>  
                        <div className='justify-center text-center text-2xl pl-4 mt-4'>
                          <div id='itemNeg' className='bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700'>
                            Payment Unsuccessful
                          </div>
                        </div> 
                        <div className='justify-left text-left text-2xl pl-4 mt-4'>
                      </div>              
                    </div>
                  </div >

                </div>
                 {/*)} */} 
            </div>
        </div>
      </div>  
    </div>
  )
}

