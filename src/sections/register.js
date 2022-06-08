
import React, { useState } from "react"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService, alertService } from '../services';
import { Container, Box, Grid, Text, Heading, Button, Image } from 'theme-ui';

import SectionHeader from 'components/section-header';
import RegisterFeature from 'components/register-feature';

    const bcrypt = require('bcryptjs'); 
    const shapePattern = '../assets/shape-pattern1.png';
    const Smart = '../assets/services/smart.svg';
    const Secure = '../assets/services/secure.svg';

    const data = {
        subTitle: '',
        title: 'REGISTRATION',
        features: [
          {
            id: 1,
            imgSrc: Smart,
            alttext: 'Remember',
            title: 'We do need some info from you',
            text:
              'Choose a word or phrase to use as your Caret Label.',
          },
          {
            id: 2,
            imgSrc: Smart,
            alttext: 'Remember',
            title: 'Don`t use any special characters',
            text:
              'All special characters, except dash (-) and underscore (_) are not allowed',
          },
          {
            id: 3,
            imgSrc: Smart,
            alttext: 'Remember',
            title: 'What if I don`t have a Crypto Wallet Address yet',
            text:
              'We are as excited about Crypto as everyone. And, we want everyone to be able to save the Caret Tag of their choice. Even if they do not have a Crypto account yet',
          },
          {
            id: 4,
            imgSrc: Smart,
            alttext: 'Remember',
            title: 'How Much?',
            text:
              'Sign up is Free! But, if you want a Caret Tag that is custom. Or, you do not want appended digits. Then you may be a cost.'
          },
      
        ],
      };

    async function addUser(user) { 
        console.log('load ' + JSON.stringify(user))
        const curDate = new Date().toISOString()
        console.log(curDate)
       
        user.password = bcrypt.hashSync(user.password, 10);  
        //console.log(user.password)
        const response = await fetch('../api/acctRegister', {
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
    });

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit(user) {
        return userService.register(user)
            .then(() => {              
                addUser(user)
                alertService.success('Registration successful', { keepAfterRouteChange: true });
                router.push('/login');
            })
            .catch(alertService.error);
    }

    const agreeHandler = () => {
        {agreeState === 'false' ? setAgreeState('true') : setAgreeState('false')};
    };

    const textValue = 'Site rules:\n a) Be Honest & Respectful, be a Good NFT Citizen\n b) You must have a MATIC wallet to purchase our NFTs\n c) The rest is in the full agreement link below*\n\n Enjoy your stay - The Team'

    return (
 
        <Box >                                                  
            <Box sx={{ variant : 'section.feature' }}>                 
                <Container sx={styles.containerBox} >                  
                    <Box sx={styles.halfLBox} >
                        <RegisterFeature title={data.title} />  
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label>First Name: </label>
                                <input name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.firstName?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Last Name: </label>
                                <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.lastName?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Username: </label>
                                <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.username?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Email: </label>
                                <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.email?.message}</div>
                            </div>                                
                            <div className="form-group">
                                <label>Password: </label>
                                <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                            <div className="form-group">
                                <label>Wallet Chain</label>
                                <input name="Matic Wallet" type="text" {...register('account')} className={`form-control ${errors.account ? 'is-invalid' : ''}`} />
                                <div className="invalid-feedback">{errors.account?.message}</div>
                                <div className='ml-4 text-sm'> ( What platform is it on, ie: Ethereum )</div>
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
                                        <input type="checkdiv" id="agree" onClick={() => agreeHandler()} />
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
                    </Box>
                    <Box sx={styles.halfRBox}>
                        <RegisterFeature subTitle={data.subTitle} />
                        <Grid sx={styles.grid}>
                            {data.features.map((feature, i) =>(
                            <Box sx={styles.card} key={feature.id}>
                                <Image src={feature.imgSrc} alt={feature.alttext} sx={styles.icon} />
                                <Box sx={styles.wrapper}>
                                <Heading sx={styles.wrapper.title}>{feature.title}</Heading>
                                <Text sx={styles.wrapper.subTitle}>{feature.text}</Text>
                                </Box>
                            </Box>
                            ))}
                        </Grid>
                    </Box>                       
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
            pt:[120, null, null, null, null, 150],
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
      


export default Register;