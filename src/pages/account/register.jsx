
import React, { useState } from "react"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '../../services';



    const bcrypt = require('bcryptjs'); 
/*
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }
*/

    async function addUser(user) { 
        console.log('load ' + JSON.stringify(user))
        const curDate = new Date().toISOString()
        console.log(curDate)
       
        user.password = bcrypt.hashSync(user.password, 10);  
        //console.log(user.password)
        const response = await fetch('../../api/acctRegister', {
            method: 'POST',
            body:  [JSON.stringify(user.firstName), JSON.stringify(user.lastName), JSON.stringify(user.username), JSON.stringify(user.email), JSON.stringify(user.password),JSON.stringify(user.account)],
            headers: {
            'Content-Type':'applications/json'
            },
        })

    const regSuccess = await response.json() 
        return regSuccess
    }

    function logout(){
        userService.logout();
    }

    function Register() {
    const router = useRouter();
    const [menuState, setMenuState] = useState('register')
    const [agreeState, setAgreeState] = useState('false')
  

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        username: Yup.string()
            .required('Username is required'),
        email: Yup.string()
            .required('Email is required'),            
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        account: Yup.string()
            .required('Wallet address is required'),
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        return userService.register(user)
            .then(() => {              
                addUser(user)
                alertService.success('Registration successful', { keepAfterRouteChange: true });
                router.push('/account/login');
            })
            .catch(alertService.error);
    }

    const agreeHandler = () => {
        {agreeState === 'false' ? setAgreeState('true') : setAgreeState('false')};
    };

    const textValue = 'Site rules:\n a) Be Honest & Respectful, be a Good NFT Citizen\n b) You must have a MATIC wallet to purchase our NFTs\n c) The rest is in the full agreement link below*\n\n Enjoy your stay - The Team'

    return (
        <div id='bgDecider'>                         
            {/* Main Header */}
            <div className="marketHeader w-full bg-no-repeat bg-cover text-center mb-4" ></div>  
            {/* Main Menu */}    
            <div className='mnBox flex display-inline justify-center'> 
                <div className='mnLf'>        
                    <nav className="mb-4">                                        
                    <div className="flex mt-2 justify-center" >					                 
                        <div className='mode w-16 ml-5 mt-4'>

                        </div>                
                    </div>                   
                    </nav>
                </div>
                <div className='mnMd mnUser '>

                </div>
                <div className='mnRh w-32 ml-5 mt-6 '>
                </div>
            </div>   
            {/* main page */}  
            <div className="container block display-inline items-center">
                <div className='itemHeader'>
                    <div className='fmRegister flex display-inline text-center justify-between' >
                        <div className="text-3xl mt-6 mb-6 mr-8 font-bold ">Register</div>
                    </div>
                </div>
                <div className='itemBody'>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.firstName?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.lastName?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Username</label>
                                <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.username?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.email?.message}</div>
                            </div>                                
                            <div className="form-group">
                                <label>Password</label>
                                <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Wallet Address</label>
                                <input name="Matic Wallet" type="text" {...register('account')} className={`form-control ${errors.account ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.account?.message}</div>
                                <div className='ml-4 text-sm'> ( Connect wallet to add address )</div>
                            </div> 
                            <div className="form-group taSiteInfo">
                                <div>
                                    <label>Site Agreement</label>                                 
                                </div>
                                <div>
                                    <textarea name="siteInfo" className='{`form-control`} siteInfo border-2 bg-white' value={textValue} disabled />
                                </div>
                                <div className='text-sm ml-4'>
                                    <Link href='/terms' > * Full Site Agreement and Terms</Link>
                                </div>    
                            </div>
                            <div>
                                <div className='flex display-inline'>
                                    <div className='noted'>
                                    </div>
                                    <div className='ml-4'>
                                        <input type="checkbox" id="agree" onClick={() => agreeHandler()} />
                                        <label htmlFor="agree" className='ml-6 mb-8'> I agree to site terms and conditions</label>
                                    </div>   
                                </div>
                            </div>
                            <div>
                                <div className='flex display-inline text-center justify-between mt-4'>
                                    <div className='btn-lft'>
                                        { agreeState === 'false' ?
                                                <button disabled className="btn btn-primary mr-12 mt-2 ml-8">Register</button>                   
                                        :
                                            <button disabled={formState.isSubmitting} className="btn btn-primary mr-12">
                                                {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                Register
                                            </button>
                                        }
                                    </div>
                                    <div className='btns-right flex display-inline text-center justify-between mb-4' >              
                                        <a onClick={logout} className="btn btn-link">Cancel</a>
                                    </div> 
                                </div> 
                            </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;