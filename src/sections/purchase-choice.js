
import React, { useState } from "react"
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '../services';
import PurchaseFeature from 'components/purchase-feature';
//const requestIp = require('request-ip');

export default function PurchaseChoice() {
  const router = useRouter(); 
  const [carrotAvail, setCarrotAvail] = useState('')
  const [carrotInAvail, setCarrotInAvail] = useState(false) 
  const [carrotInfo, setCarrotInfo ] = useState('')
  const [dbCheck, setDbCheck] = useState(false) 
  const [itemData, setItemData] = useState('') 
  const [numberCount, setNumberCount] = useState(Math.floor(Math.random() * (999 - 100 + 1)) + 0)
  const [itemDataAppend, setItemDataAppend] = useState('')
  const [chainValue, setChainValue] = useState('');
  const [walletState, setwalletState] = useState(false)   // does user have wallet
  const [hasEmail, setHasEmail] = useState(true)            // if user has wallet, auth reply
  const [hasWallet, setHasWallet] = useState(false)         // if user has wallet, auth reply
  const [feeFree, setFeeFree] = useState(false)             // no strings attached
  const [feePro, setFeePro] = useState(false)               // is this a paid word -- Pro
  const [feePrem, setFeePrem] = useState(false)             // is this a paid word == Prem
  const [busWord, setBusWord] = useState(false)             // is this a bus word               
  const [banWord, setBanWord] = useState(false)             // is this a banned word
  const [wordPrice, setWordPrice] = useState(0)             // word cost how much
  //console.log( 'availPro ' + feePro + ' availPrem ' +  feePrem + ' availBus ' + busWord + ' availBan ' +  banWord+ ' availPrice ' +  wordPrice)
 
  const data = {
    subTitle: '4 Simple steps',
    title: 'Caret Tag Word: ' + itemData,
    features: [],
  };

  const walletValue = (data) => {
    setwalletState(data)
  }

  React.useEffect(() => {
    if (router.isReady) {
      try {
        setItemData(router.query.data.toUpperCase()) 
        caretCheckIn(router.query.data.toUpperCase())        
      } catch (error) {
        console.log('purchase routing error: ', error)
      }
    }
  }, [router.isReady]);

  async function caretCheckIn(data) {
    var formData = JSON.stringify(data)
    console.log('formData out : ' + formData)
    const response = await fetch('/../api/validate/preCarrot', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })

    
    const stepOne= await response.json() 

    if (stepOne > 0){
      var dbCheck = false
      caretCheck(data)
    } else {
      dbCheck = true      
    }

    caretInformation(dbCheck, data)
  }

  async function caretCheck(data) {
    var formData = JSON.stringify(data)
    console.log('caretCheck out : ' + data)
    const response = await fetch('/../api/validate/returnCarrot', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })

  const dbCheck = true
  const isCarrotInfo = await response.json()   
    setCarrotInfo(isCarrotInfo)  
    caretInformation(dbCheck, isCarrotInfo)
  }

  async function caretInformation(dbCheck, data) {  
    console.log(' dbCheck ' + dbCheck + ' banned ' + data.banned)
    console.log(' caretInfo ' + JSON.stringify(data) ) 
    console.log('ch Avail openner: ' + carrotAvail)

    {dbCheck === false && setCarrotAvail(true)}
    {data.banned === true && setCarrotAvail(false)}

    /*
    setBanWord(data.banned)
    setBusWord(data.business)
    setWordPrice(data.price)
    setCarrotInAvail(data.available)
    {carrotInAvail === true && setCarrotAvail(0)}

    {wordPrice === 0  && setFeePrem(false) && setFeePro(false)}
    {wordPrice === 5  && setFeePrem(false) && setFeePro(true)}
    {wordPrice > 5    && setFeePrem(true) && setFeePro(false)}
 
    console.log( 'carrotIn ' + carrotInAvail + ' availPro ' + feePro + ' availPrem ' +  feePrem + ' availBus ' + busWord + ' availBan ' +  banWord+ ' availPrice ' +  wordPrice)

  */ 
  
    console.log('ch Avail after party : ' + carrotAvail)
  }

  console.log('ch Avail: ' + carrotAvail + ' ch Info ' )
  //console.log('In Avail: ' + carrotAvail + ' in Info ' + JSON.stringify(carrotInfo))
 
  const validationCaret = Yup.object().shape({
    request: Yup.string()
      .min(3, 'Caret choice must be at least 5 characters') 
      .max(12, 'Caret choice must be less than 12 characters')
      .matches(/^[aA-zZ\s]+$/, "Only Alpha characters are allowed for Caret choice")
  });
 
  const validationEmail = Yup.object().shape({
      email: Yup.string().required('Email is already registered')
  });
  const validationWallet = Yup.object().shape({
      account: Yup.string().required('Wallet Address is already registered')         
  });

  const formOptions = { resolver: yupResolver(validationCaret) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;


  async function onSubmit(user) {
    //console.log('send out: ' + JSON.stringify(user))
    // this is submit of email/chain
     console.log('validate data: ' + JSON.stringify(user))
    const checkCaret = await caretCheck(user)

    if (checkCaret > 0){
        setCarrotAvail(0)
    }
  }

  async function emailCheck(data) {
    var formData = JSON.stringify(data.email)
    console.log('formData out : ' + formData)
    const response = await fetch('/../api/validate/preEmail', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const unameAvail = await response.json() 
      return unameAvail
  }

  function availClick() {
    console.log('Free click Check: ' + itemDataAppend + ' data ' + JSON.stringify(data))

  }

  function regClick(data) {
    console.log('Free click Check: ' + itemDataAppend + ' data ' + data)
  }

  function proClick(data) {
    console.log('Pro click Check: ' + itemData + ' data ' + data)
  }

  function premClick(data) {
    console.log('Prem click Check: ' + itemData + ' data ' + data)
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
            {carrotAvail === false ?
              <div className='text-3xl mb-4'>{itemData}  is unavailable.</div>
            :
              <div>
                <div className='text-3xl mb-4'>{itemData}  is available.</div>
              </div>
            }
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
                            <input name="request" type="text" placeholder="Enter your Word" {...register('request')} className={`mt-2 form-control ${errors.request ? 'is-invalid' : ''}`} />
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
        {carrotAvail === false ?
          <div></div>
        :      
          <div> 
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='purRow4'>
              <div className='flex inline-block justify-center text-center mb-6'>
                <div className='' ></div>
                <div id='purSignUp' >              

                    <div id='bxWallet' className=''>         
                      <div className="form-group mb-6 justify-left text-left">
                          <label>1) Email: </label>
                          <input name="email" type="text" placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                          <div className="invalid-feedback">{errors.email?.message}</div>
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
                      
                      { walletState === false ? 
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
            </form>
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
                                                Auto 3 digit extension on Word<br />
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
                                    {carrotAvail === 0 ?
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
                      {carrotAvail === 0 ?
                        <div>                         
                          <div className='flex inline-block justify-center text-center mb-6'>
                            <div className=' inline-block justify-left text-left'>  
                              <div className='justify-center text-center text-2xl pl-4 mt-4'>
                                <p> Caret Tag: ^{itemData} </p>
                              </div> 
                              <div className=''></div>
                                <div className='text-2xl pl-4 pr-4'>
                                  <p> 1 Wallet Address <br />
                                      Choose word without digits<br />
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
                      {carrotAvail === 0 ? 
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
                    {carrotAvail === 0 ?
                      <div>                         
                          <div className='flex inline-block justify-center text-center mb-6'>
                            <div className=' inline-block justify-left text-left'>  
                              <div className='justify-center text-center text-2xl pl-4 mt-4'>
                                <p>Caret Tag: ^{itemData}</p>
                              </div> 
                              <div className=''>price: {wordPrice}</div>
                                <div className='text-2xl pl-4 pr-4'>
                                  <p> 5 Wallet Address <br />
                                      Choose multiple 3 digit addons*<br />
                                      <br />
                                      <small>*apply a unique 3 digit extension to
                                      to your caret word up to 4 times.
                                      ie: ^{itemData}123, ^{itemData}234 </small>
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
                    {carrotAvail === 0 ?
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
                
      </div>
    </div>
  )
}

