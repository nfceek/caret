
import React, { useState } from "react"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '../services';
import { Container, Box, Grid, Text, Heading, Button, Image } from 'theme-ui';

    const bcrypt = require('bcryptjs'); 

    function Login() {
    const router = useRouter();
    const [menuState, setMenuState] = useState('login')
    const [accountState, setAccountState] = useState('none')
    const [loginChoice, setLoginChoice] = useState('pwd')
	const [emailDupe, setEmailDupe] = useState(0)
	const [pwdError, setPwdError] = useState(0)
	const [accError, setAccError] = useState(0)

    // form validation rules 
    var validationSchema = ''

    if(loginChoice === 'pwd'){
		//console.log(' lets validate: pwd')
        validationSchema = Yup.object().shape({
            email: Yup.string()
                .required('Username is required')
                .min(6, 'Email to short')
                .max(50, 'Email to long'),
            password: Yup.string().required('Password is required'),
        });
    } else {
		//console.log(' lets validate: acc')
        validationSchema = Yup.object().shape({
            email: Yup.string()
                .required('Username is required')
                .min(6, 'Email to short')
                .max(50, 'Email to long'),
            account: Yup.string().required('Wallet address is required')
        });

    }

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function loginValue(data) {
        //console.log(data)
        {data === false ? setLoginChoice('wallet') : setLoginChoice('pwd')}
    }

    async function onSubmit({ email, password, account }) {

        //console.log('incoming ',email, password, account)		
        if(loginChoice === 'pwd'){
            const response = await fetch('../../api/acctPwdLogin', {
                method: 'POST',
                body:  [JSON.stringify(email), JSON.stringify(password), JSON.stringify(account)],
                headers: {
                'Content-Type':'applications/json'
                },
            })
			var loginSuccess =''			
			loginSuccess = await response.json() 

			//console.log('success ' + JSON.stringify(loginSuccess) ) 
				if(loginSuccess !== null){ 
					setPwdError(0)
					if (!(email && bcrypt.compareSync(password, loginSuccess.password))) {
						setPwdError(1);
					}else{
						//console.log('pass')
						localStorage.setItem('caret', JSON.stringify(email));
						//localStorage.setItem('wallet', JSON.stringify(account));
						router.push('/dashboard');
					} 
				}else{
					setPwdError(1)
				}
		} else {
			const response = await fetch('../../api/acctPwdLogin', {
				method: 'POST',
				body:  [JSON.stringify(email), JSON.stringify(password), JSON.stringify(account)],
				headers: {
				'Content-Type':'applications/json'
				},
			})
			var loginSuccess =''			
			loginSuccess = await response.json() 

			//console.log('success ' + JSON.stringify(loginSuccess) ) 
				if(loginSuccess !== null){ 
					setAccError(0)
					if (!(email && account === loginSuccess.account)) {
						setAccError(1);
					}else{
						//console.log('pass')
						localStorage.setItem('caret', JSON.stringify(email));
						router.push('/dashboard');
					} 
				}else{
					setAccError(1)
				}
		}

    }
    
    function logout() {
        localStorage.removeItem('caret');
        //localStorage.removeItem('wallet');   
        userSubject.next(null);
        router.push('/');
    }

    return (
        <Box >                                                  
            <Box sx={{ variant : 'section.feature' }}>                 
                <Container sx={styles.containerBox} >                        
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
						<label>Email: </label>
                          <input id='inputEmail' name="email" type="text" onChange={e => this.setState({ text: e.target.value })} placeholder="Email" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} autoComplete="off" />
                          <div className="invalid-feedback">{errors.email?.message}</div>
                          {emailDupe === 1 &&<div id='errEmail' className='errEmail' >Email already in use</div>}
                        </div>

                        <div>
                            <div className="form-group mt-6 mb-6justify-left text-left">
                                <label>How do you want to log in? </label>
                                <div  className="flex display-inline">
                                    <input type="radio" className='ml-4 mr-4' value="Yes" defaultChecked={true} name="loginChoice" onClick={() => {loginValue(true)}} />&nbsp;Password
                                    <div className='ml-4 text-sm'> </div>
                                    <input type="radio" className='l-4' value="No" name="loginChoice"  onClick={() => {loginValue(false)}} />&nbsp;Wallet Address
                                </div>
                            </div>
                        </div>
                    {loginChoice === 'pwd' ?
                        <div>
                            <div className="form-group">
                                <label>Password</label>
                                <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.password?.message}</div>
								{pwdError === 1 &&<div id='errEmail' className='errEmail' >Password is incorrect</div>}
                            </div>
                        </div>
                    :
                        <div>
                            <div className="form-group">
                                <label>Wallet Address</label>
                                <input name="Wallet" type="text" {...register('account')} className={`form-control ${errors.account ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.account?.message}</div>
								{accError === 1 &&<div id='errEmail' className='errEmail' >Wallet Address is incorrect</div>}
                            </div> 
                        </div>
                    }
                        <div className='flex display-inline'>
                            <div>
                                <button disabled={formState.isSubmitting} className="btn btn-primary mr-12">
                                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Login
                                </button>
                            </div>
                            <div className='ml-6 pt-3'>
                                {/*<Link href="/registration" className="btn btn-link">Register</Link>  */}
                            </div>               
                        </div>
                    </form>
                </Container>
            </Box>
        </Box>
    );
}

const styles = {
    coreFeature: {
        py: [0, null, null, 2, null, 7],
        position: 'relative',
    },
    containerBox: {
        display: 'flex',
        alignItems: ['flex-start', null, null, 'center'],
        justifyContent: ['flex-start', null, null, 'space-between'],
        flexDirection: ['column', null, null, 'row'],
        pb: [0, null, null, null, null, 7],
        pt:[120, null, null, null, null, 150],
    },
    shapeBox: {
        position: 'absolute',
        bottom: -68,
        left: -160,
        zIndex: -1,
        display: ['none', null, null, null, null, 'inline-block'],
    },
    halfLBox: {
        width: ['100%', null, null, 315, 390, 450, null, 500],
        flexShrink: 0,
        mb: [7, null, 60, 0],
        textAlign: ['center', null, null, 'left'],
        
    },
    halfRBox: {
        width: ['100%', null, null, 315, 390, 450, null, 500],
        flexShrink: 0,
        mb: [7, null, 60, 0],
        textAlign: ['center', null, null, 'left'],

    },
    grid: {
        pr: [2, 0, null, null, 6, '70px'],
        pl: [2, 0],
        pt: [2, null, null, null, 3],
        mx: 'auto',
        width: ['100%', 370, 420, '100%'],
        gridGap: ['35px 0', null, null, null, '50px 0'],
        gridTemplateColumns: ['repeat(1,1fr)'],
    },
    card: {
        display: 'flex',
        alignItems: 'flex-start',
        transition: 'all 0.3s',
    },
    
    icon: {
        width: ['45px', null, null, null, '55px'],
        height: 'auto',
        flexShrink: 0,
        mr: [3, null, null, null, 4],
    },
    wrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
        mt: '-5px',
        title: {
        fontSize: 3,
        color: 'heading_secondary',
        lineHeight: 1.4,
        fontWeight: 700,
        mb: [2, null, 3, 2, 3],
        },
    
        subTitle: {
        fontSize: [1, null, null, '14px', 1],
        fontWeight: 400,
        lineHeight: 1.9,
        },
    },

};
  
export default Login;
