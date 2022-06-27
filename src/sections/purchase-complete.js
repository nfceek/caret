

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

  const router = useRouter();
  const status = router.query;

  const { query } = useRouter();
  const item = JSON.stringify(query.price)


    // update IPFS Only if user has wallet
    //if(cidDbWallet === true){
    console.log('1 auth Pinata key')
    //await preInsertIPFS()   //authentication passed
      
    console.log('call insertIPFS')
    //await insertIPFS(cUpdateWord)
    
    console.log('update db with cid')

    // update sales table


  return (
    <div id='purFormComplete' >
      <div className='' >
        <div className='purRowOne' >
          <div className=''></div>

            <div className='' >
                return trip
                {status && status === 'success' && (
                  <div className='bg-green-100 text-green-700 p-2 rounded border mb-2 border-green-700'>
                    Payment Successful
                  </div>
                )}
                {status && status === 'cancel' && (
                  <div className='bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700'>
                    Payment Unsuccessful
                  </div>
                )}  
            </div>
            <div>
            <h1>status page</h1>
            <p>{query.status}</p>
          </div>
          <div>
            <h1>Items page</h1>
            <p>item</p>
          </div>
        </div>
      </div>  
    </div>
  )
}

