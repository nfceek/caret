
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
  const [isAdmin, setIsAdmin] = useState(1)
  const [level, setLevel] = useState()
  const [email, setEmail] = useState()

  const [primaryChainValue, setPrimaryChainValue] = useState('');
  const [primaryWallet, setPrimaryWallet] = useState()
  const [secondChainValue, setSecondChainValue] = useState('');
  const [secondWallet, setSecondWallet] = useState('')
  const [thirdChainValue, setThirdChainValue] = useState('');
  const [thirdWallet, setThirdWallet] = useState('')

  const [userIn, setUserIn] = useState(0) 
  const [loading, setLoading] = useState(true)
  const [uUpdate, setUUpdate] = useState(false)
  const [premPlan, setPremPlan] = useState(false)


  const router = useRouter()
  
  useEffect(() => {
    var item = localStorage.getItem('caret')
    //console.log('item ' + item)
    chStatus(item)
  }, [])

  const validationRequest = Yup.object().shape({
    firstname: Yup.string()
        .matches(/^[a-zA-Z-_\s]*$/, "Only Alpha characters, dash ( - ) and underscore ( _ ) are allowed.")
        .min(4, 'Password must be at least 5 characters'),  
    lastname: Yup.string(),
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
    var rUpper = user.request.toUpperCase()

    const item = rUpper
    console.log(item)

    /*
    router.push(
      {
        pathname: '/purchase',
        query: {data: item}   
      }, '/purchase')
      //},) 
    */       
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
    setIsAdmin(stepOne.admin)
    setLevel(stepOne.level)
    setEmail(stepOne.email)
    //chain & acct 1
    setPrimaryChainValue(stepOne.chain)
    setPrimaryWallet(stepOne.account)
    setSecondChainValue()
    setSecondWallet()
    setThirdChainValue()
    setThirdWallet()
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
              src = {Member1}
              alttext= 'avatar'
              title={email}
              />
            ))}
          </div>
          <div className='block'>
              <div className='updateUserInfo'>
                <div id='bxUserInfo' className='block '>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex display-inline justify-left'>                 
                      <div className='text-right text-3xl w-48 mt-2'>User Plan: </div>
                      <div className=' text-3xl w-64 ml-4 mt-2 pl-2 mb-6'>{dataPlan}</div>
                      <div>
                        {/*<button class="bg-indigo-300 hover:bg-indigo-700 text-white font-bold py-2 px-4  pl-2  ml-2 rounded-full">Upgrade</button>*/}
                      </div>
                    </div>
                      <div className='primaryCaret border border-gray-200 ml-4 mt-2 pr-6 pb-6 pt-6'>
                        <div className='flex display-inline justify-left'>
                          <div className='text-right w-48 mt-2'>Primary Caret: </div>
                          <div className='font-bold w-64 ml-4 mt-2 pl-2'>^{caret}</div>                           
                        </div>
                        <div className='flex display-inline justify-left'>
                          <div className='text-right w-48 mt-2'>Chain: </div>
                          {uUpdate !== 'never' ?
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
                          
                          {uUpdate !== 'never' ?
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
                        <div className='secondCaret border border-gray-200 ml-4 mt-2 pr-6 pb-6 pt-6'>
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

                        <div className='thirdCaret border border-gray-200 ml-4 mt-2 pr-6 pb-6 pt-6'>
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
                                  <input name="thirdwallet" type="text" placeholder=" Add Third Wallet" {...register('thirdwallet')} className={'border border-gray-300 ml-4 mt-2 pl-2' + `form-control ${errors.thirdwallet ? 'is-invalid' : ''}`} />
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
                    <div className='primaryCaret border border-gray-200 ml-4 mt-2 pr-6 pb-6'>
                      <div className='flex display-inline justify-left mt-6'>
                        <div className='text-right w-48 mt-2'>First Name: </div>
                          {uUpdate === false ?                        
                            <div>
                              <div className='w-64 ml-4 mt-2 pl-2'>{fname}</div>
                            </div>
                          :
                            <div>
                              <input name="firstname" type="text" placeholder=" Add First Name" {...register('firstname')} className={'border border-gray-300 w-64 ml-4 mt-2 pl-2' + `form-control ${errors.firstname ? 'is-invalid' : ''}`} />
                              <div className="invalid-feedback">{errors.firstname?.message}</div>
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
                            <input name="lastname" type="text" placeholder=" Add Last Name" {...register('lastname')} className={'border border-gray-300 w-64 ml-4 mt-2 pl-2' + `form-control ${errors.lastname ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.lastname?.message}</div>
                          </div>
                        }
                      </div>
                    </div>
                    <div className='flex display-inline justify-right mt-6 '>
                      <div className='text-right w-48 mt-2'></div>
                      <div className='text-right ml-4 mt-2 pl-2'>
                        <button id='btnProfile' disabled={loading} className='btn btn-primary align-right mr-2 mt-4'>Update Info</button>
                      </div>          
                    </div>
                  </form>
                </div>
              </div>
            
          </div>
      </div>       
      </div>
      {isAdmin === false &&
        <div>
          <div className='block pt-10 pb-10 mb-6'>
            <div className='text-center text-6xl font-bold pb-4 mb-4'>Admin Section
            <div>
              <div class="grid grid-rows-3 grid-flow-col gap-4 text-3xl bg-slate-100 pt-2">
                <div class="row-span-3 ... bg-indigo-100 m-2 p-2">01 - graph</div>
                <div class="col-span-2 ... bg-amber-100 m-2 p-2">Totalusers
                  <div class="grid grid-cols-3 gap-4">
                    <div class=" bg-indigo-100 m-2 p-2">01 - admins</div>
                    <div class=" bg-blue-100 m-2 p-2">02 - active </div>
                    <div class=" bg-indigo-100 m-2 p-2">03 - pend</div>               
                  </div>
                </div>
                <div class="row-span-2 col-span-2 ... bg-blue-100 m-2 p-2">Sales Data
                <div class="col-span-2 ... bg-amber-100 m-2 px-2 py-6">Recent

                  <div class="grid grid-cols-4 gap-4">
                    <div class=" bg-indigo-100 m-2 p-2">01 - free</div>
                    <div class=" bg-blue-100 m-2 p-2">02 - pro </div>
                    <div class=" bg-indigo-100 m-2 p-2">03 - prem</div> 
                    <div class=" bg-blue-100 m-2 p-2">04 - promo </div>              
                  </div>


                  <div class="col-span-2 ... bg-green-100 m-2 px-2 py-6">30 Day                             
                    <div class="grid grid-cols-4 gap-4"> 
                    <div class=" bg-indigo-100 m-2 p-2">01 - free</div>
                    <div class=" bg-blue-100 m-2 p-2">02 - pro </div>
                    <div class=" bg-indigo-100 m-2 p-2">03 - prem</div> 
                    <div class=" bg-blue-100 m-2 p-2">04 - promo </div>              
                    </div>
                  </div>
                 </div>
                
                </div>
              </div>
            </div>

            </div>
      
      



            </div>
        </div>
      }
  </div>
  );

};
