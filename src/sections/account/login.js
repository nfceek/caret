
import React, { useState } from "react"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '../../services';

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
        <Box id='bgDecider'>                         
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="form-group">
                    <label>Username</label>
                    <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                    <Box className="invalid-feedback">{errors.username?.message}</Box>
                </Box>
                <Box className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <Box className="invalid-feedback">{errors.password?.message}</Box>
                </Box>
                <Box className="form-group">
                    <label>Wallet Address</label>
                    <input name="Matic Wallet" type="text" {...register('account')} className={`form-control ${errors.account ? 'is-invalid' : ''}`} />
                    <Box className="invalid-feedback">{errors.account?.message}</Box>
                </Box> 
                <Box>
                    <button disabled={formState.isSubmitting} className="btn btn-primary mr-12">
                        {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                    </button>
                    <Link href="/account/register" className="btn btn-link">Register</Link>                       
                </Box>
            </form>
        </Box>
    );
}

export default Login;
