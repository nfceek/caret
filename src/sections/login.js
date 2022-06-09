
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

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
        account: Yup.string().required('Wallet address is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    async function onSubmit({ username, password, account }) {
        //const [loginPwd, setLoginPwd] = useState('')

        const response = await fetch('../../api/acctLogin', {
            method: 'POST',
            body:  [JSON.stringify(username), JSON.stringify(password), JSON.stringify(account)],
            headers: {
            'Content-Type':'applications/json'
            },
        })
        
        const loginSuccess = await response.json() 
        //setloginPwd(loginSuccess[0].password)
        console.log(loginSuccess)      
        //console.log(' u/n ' + username + ' pwd ' + password + ' success pwd ' + loginSuccess[0].password)
        if (!(username && bcrypt.compareSync(password, loginSuccess[0].password))) {
               throw 'Username or password is incorrect';
        }else{
            console.log('pass')
            localStorage.setItem('user', JSON.stringify(username));
            localStorage.setItem('wallet', JSON.stringify(account));
            router.push('/');
        } 
    }

    return (
        <Box >                                                  
            <Box sx={{ variant : 'section.feature' }}>                 
                <Container sx={styles.containerBox} >                        
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label>Username</label>
                            <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.username?.message}</div>
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.password?.message}</div>
                        </div>
                        {/*
                        <div className="form-group">
                            <label>Wallet Address</label>
                            <input name="Matic Wallet" type="text" {...register('account')} className={`form-control ${errors.account ? 'is-invalid' : ''}`} />
                            <div className="invalid-feedback">{errors.account?.message}</div>
                        </div> 
                        */}
                        <div className='flex display-inline'>
                            <div>
                                <button disabled={formState.isSubmitting} className="btn btn-primary mr-12">
                                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Login
                                </button>
                            </div>
                            <div className='ml-6 pt-3'>
                                <Link href="/registration" className="btn btn-link">Register</Link>  
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
