
import React, { useState } from "react"
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '../services';
import PurchaseFeature from 'components/purchase-feature';


export default function PurchaseChoice() {
  
  const data = {
    subTitle: 'Lets Get Started',
    title: 'Caret Tag Creator',
    features: [],
  };
  const [carrotAvail, setCarrotAvail] = useState('')
  const router = useRouter()
  const validationCaret = Yup.object().shape({
    caretName: Yup.string()
      .min(3, 'Caret choice must be at least 5 characters') 
      .matches(/^[aA-zZ\s]+$/, "Only Alpha characters are allowed for Caret choice")

  });

  const formOptions = { resolver: yupResolver(validationCaret) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  async function onSubmit(user) {
    console.log('send out: ' + JSON.stringify(user))
    const checkCaret = await caretCheck(user)
    console.log('checkCaret back: ' + JSON.stringify(checkCaret))

    if (checkCaret > 0){
        setCarrotAvail(false)
    }
  }

  async function caretCheck(data) {
    console.log('Data In : ' + data + ' breakout ' + JSON.stringify(data))
    var formData = JSON.stringify(data.caretName)
    console.log('formData out : ' + formData)
    const response = await fetch('/../api/validate/returnCarrot', {
      method: 'POST',
      body: formData, 
      headers: {
        'Content-Type':'applications/json'
      },
    })
    const carrotAvail = await response.json() 
      return carrotAvail
  }

  return (
    <div id='purForm'>
      <div className='grid grid-rows-3 gap-4 pt-10' >

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
          <div className ="flex inline-block justify-center text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className ="flex inline-block justify-center text-center">                    
                <div className ="form-group">
                  <input name="caretName" type="text" placeholder="Enter your Word" {...register('caretName')} className={`mt-2 form-control ${errors.caretName ? 'is-invalid' : ''}`} />
                      <div className="invalid-feedback">{errors.caretName?.message}</div>
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

        <div className='purRow3'>
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-slate-200' >01

            </div>

            <div className=''>02
            </div> 
          </div>
        </div>

      </div>
    </div>
  )

}

