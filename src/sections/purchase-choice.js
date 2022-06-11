
import React, { useState } from "react"
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '../services';
import PurchaseFeature from 'components/purchase-feature';


export default function PurchaseChoice() {
  const router = useRouter() 
  const [carrotAvail, setCarrotAvail] = useState(0)
  const [carrotInAvail, setCarrotInAvail] = useState(0)  
  const [carrotChoose, setCarrotChoose] = useState('') 
  const [itemData, setItemData] = useState('') 

  const data = {
    subTitle: 'Lets Get Started',
    title: 'Caret Tag word: ' + itemData,
    features: [],
  };

  React.useEffect(() => {
    if (router.isReady) {
      try {
        setItemData(router.query.data)
        caretCheckIn(router.query.data)
      } catch (error) {
        console.log('purchase routing error: ', error)
      }
    }
  }, [router.isReady]);

  async function caretCheckIn(data) {
    var formData = JSON.stringify(data)
    //console.log('formData out : ' + formData)
    const response = await fetch('/../api/validate/preCarrot', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
      setItemData(data)    
      const isCarrotAvail = await response.json() 
      setCarrotAvail(isCarrotAvail)

      if (isCarrotAvail > 0){
          caretInfo(data)
      }else{
        return carrotAvail
      }     
        
  }

  async function caretCheck(data) {
    var formData = JSON.stringify(data.request)
    //console.log('formData out : ' + data)
    const response = await fetch('/../api/validate/preCarrot', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
      setItemData(data.request)
      const isCarrotAvail = await response.json() 
      setCarrotAvail(isCarrotAvail)

      if (isCarrotAvail > 0){
          caretInfo(data)
      }else{
        return carrotAvail
      } 
  }

  async function caretInfo(data) {
    console.log('wee need moe')
    // return if word is not avail/is avail for prem/is banned, ie: call returnCaret
  }

  console.log('ch Avail: ' + carrotAvail)
  console.log('In Avail: ' + carrotAvail)

  
  const validationCaret = Yup.object().shape({
    request: Yup.string()
      .min(3, 'Caret choice must be at least 5 characters') 
      .matches(/^[aA-zZ\s]+$/, "Only Alpha characters are allowed for Caret choice")
  });
  const formOptions = { resolver: yupResolver(validationCaret) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(user) {
    //console.log('send out: ' + JSON.stringify(user))
    const checkCaret = await caretCheck(user)

    if (checkCaret > 0){
        //console.log('caretCheck ' + checkCaret)
        setCarrotAvail(0)
    }
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
        <div className='purRow3'>
          <div className ="flex inline-block justify-center text-center mb-6">
            {carrotAvail === 1 ?
              <div className='text-3xl mb-4'>The word {itemData}  is unavailble.</div>
            :
              <div className='text-3xl mb-4'>The word {itemData}  is availble.</div>
            }
          </div>
          {carrotAvail === 1 &&         
            <div className='purRow3'>

              <div className ="flex inline-block justify-center text-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className ="flex inline-block justify-center text-center">                    
                    <div className ="form-group">
                      <input name="request" type="text" placeholder="Enter your Word" {...register('request')} className={`mt-2 form-control ${errors.request ? 'is-invalid' : ''}`} />
                          <div className="invalid-feedback">{errors.request?.message}</div>
                      </div>
                      <div>                                 
                        <button disabled={formState.isSubmitting} className="btn btn-primary mr-12  mt-2 ml-8">
                            {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Validate
                        </button> 
                      </div>                
                    </div>
                  </form>
                </div>
                  <div> </div>
              </div>
          }
        </div>

              <div> 
                <div className='purRow2'>

                </div>

                <div className='purRow3'>
                  <div className='grid grid-cols-2 gap-4'>
                      <div className='bg-slate-200' >01 </div>
                      <div className=''>02 </div> 
                  </div>
                </div>
              </div>
            

      
      </div>
    </div>
  )
}

