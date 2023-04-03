import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {showErrorMsg} from '../helpers/message';
import {showLoading} from '../helpers/loading';
import isEmail from 'validator/lib/isEmail';
import isEmpty  from 'validator/lib/isEmpty';
import {signin} from '../API/auth';
import {setAuthentication, isAuthenticated} from '../helpers/auth';
const Signin = () => {

    let history = useNavigate();
    useEffect(()=>{

        if(isAuthenticated() && isAuthenticated().role === 1)
                {
                    
                    history('/admin/dashboard');
                }
                else if (isAuthenticated() && isAuthenticated().role === 0)
                {
                    
                    history('/user/dashboard');
                }
    }, [history])
    const [formData, setFormData] = useState({
        
        email: 'jdoe@gmail.com',
        password: '123',
        errorMsg: false,
        loading: false,
        


    });
    const { 
        email,
        password,
        errorMsg,
        loading,
        
    } = formData;

    const handleChange = (evt) => {
        setFormData({

            ...formData,
            [evt.target.name]: evt.target.value,
            errorMsg: ''
        });
    };

    const handleSubmit = (evt) => {



        evt.preventDefault();

        if ( isEmpty(email) || isEmpty(password) )
        {
            setFormData({
                ...formData, 
                errorMsg: 'All fields required'
            })
        } else if (!isEmail(email)){
            setFormData ({
                ...formData, 
                errorMsg: 'Invalid email'
        });

        } else {
            const { email, password} = formData;
            const data = { email, password};

            setFormData({...formData, loading: true});

            signin(data)
            .then(response => {
                setAuthentication(response.data.token, response.data.user);

                if(isAuthenticated() && isAuthenticated().role === 1)
                {
                    console.log('Redirect to admin dashboard');
                    history('/admin/dashboard');
                }
                else 
                {
                    console.log('Redirecting to user dashboard');
                    history('/user/dashboard');
                }

            })
            .catch(err => {
                console.log('sign in api function error', err);
                setFormData({
                    ...formData,
                    loading: false,
                    errorMsg: err.response.data.errorMessage,

                })
            });



        }


    };

    





    const showSinginForm = () => (
        <form className='signup-form' onSubmit={handleSubmit} noValidate>

            {/*email*/}
            <div className='form-group input-group mt-2'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-envelope mb-2'></i>
                    </span>
                </div>
                <input
                    name='email'
                    value={email}
                    className='form-control'
                    placeholder='Email address'
                    type='email'
                    onChange={handleChange}>
                
                </input>


            </div>
            {/*password*/}
            <div className='form-group input-group mt-2'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-lock mb-2'></i>

                    </span>

                </div>
                <input 
                    name='password'
                    value={password}
                    className='form-control'
                    placeholder='Create Password'
                    type='password'
                    onChange={handleChange}
                    ></input>
            </div>
           
                {/*Signin button*/}
                <div className='form-group text-center mt-2'>
                <button type='submit' className='btn btn-primary btn-lock'>
                    Signin
                </button>
                
            </div>
            {/*Already have an account */}
            <p className='text-center text-white'>
                Don't have an account? <Link to='/signup'>Register here</Link>
            </p>

        </form>

    );



return (

    <div className='signin-container'>
        <div className='row vh-100 px-3'>
            <div className='col-md-5 mx-auto align-self-center '>
            
            {errorMsg && showErrorMsg(errorMsg)}
            {loading && <div className='text-center pb-4'>{showLoading()}</div>}
            {showSinginForm()}
            
            </div>


        </div>
    
</div>


);
}


export default Signin;