
import React, { useEffect, useState } from "react"
import { useRouter } from 'next/router'

export default function PurchaseComplete() {
    const[inCaret, setInCaret] = useState()
    const router = useRouter();
    //const statIn = router.query.status
    const caretIn = router.query.caret
  
    if(caretIn === undefined){
      //router.reload
    } else{
      //postUp(caretIn) 
    }
    useEffect(() => {
      if(router.query.caret){
        setInCaret(router.query.caret)
      }
  
    }, [inCaret])
    async function rmSales(data){
        //console.log(' user data ' + JSON.stringify( data))
        var formData = data
      
        const response = await fetch('../api/removeSales', {
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
        console.log('rm user data ' + JSON.stringify( data))
        var formData = data
      
        const response = await fetch('../api/removeCarrot', {
          method: 'POST',
          body: formData, 
          headers: {
            'Content-Type':'applications/json'
          },
        })
        const stepCarrots = await response.json()        
      }

  return (
    <div id='purFormComplete' >
      <div className='' >
        <div className='purRowOne' >          
          <div id='resultArea' className='' >
              <div>  
                <div className='flex inline-block justify-center text-center mb-6'>
                  <div className='justify-center text-center'>  
                    <div className='justify-center text-center text-2xl pl-4 mt-4'>
                      <div id='itemNeg' className='bg-red-100 text-red-700 p-2 rounded border mb-2 border-red-700'>
                        Caret Creation Unsuccessful
                      </div>
                      </div>
                    </div >
                  </div >                                                                                     
                  <div className='flex inline-block justify-center text-center mb-6'>
                    <div className=''>  
                      <div className='justify-left text-left text-2xl pl-4 mt-4'>
                        Oops, something went wrong...Please return to the main page and start again.
                      </div> 
                      <div className='justify-left text-left text-2xl pl-4 mt-4 pb-5'></div> 
                      <div className='justify-right text-right pl-4 mt-4'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
}

