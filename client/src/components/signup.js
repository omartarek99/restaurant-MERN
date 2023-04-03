import React, { useState, useEffect } from 'react';
import isEmail from 'validator/lib/isEmail';
import isEmpty  from 'validator/lib/isEmpty';
import equals from 'validator/lib/equals';
import { showErrorMsg } from '../helpers/message';
import { showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import {Link, useNavigate } from 'react-router-dom';
import { signup } from '../API/auth';
import { isAuthenticated} from '../helpers/auth';


const Signup = () => {
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
        username: 'johndoe',
        email: 'jdoe@gmail.com',
        password: '123',
        password2: '123',
        successMsg: false,
        errorMsg: false,
        loading: false


    });
    const { username,
            email,
            password,
            password2,
            successMsg,
            errorMsg,
            loading} = formData;


            /*************
             * 
             * 
             * 
             */
            const handleChange = (evt) => {
                //console.log(evt);
                setFormData({

                    ...formData,
                    [evt.target.name]: evt.target.value,
                    successMsg: '',
                    errorMsg: ''
                });
            };

            const handleSubmit = (evt) => {



                evt.preventDefault();
                //clientside validation 
                if (isEmpty(username) || isEmpty(email) || isEmpty(password) || isEmpty(password2))
                {
                    setFormData({
                        ...formData, 
                        errorMsg: 'All fields required'
                    })
                } else if (!isEmail(email)){
                    setFormData ({
                        ...formData, 
                        errorMsg: 'Invalid email'
                })

                } else if(!equals(password, password2)) {
                    setFormData ({
                        ...formData, 
                        errorMsg: 'Passwords do not match'
                    })
                } else {
                    const {username, email, password} = formData;
                    const data = {username, email, password};

                    setFormData({...formData, loading: true});

                    signup(data)
                        .then(response=> {
                            console.log('Axios signup success', response);
                            setFormData({
                                username: '',
                                email: '',
                                password: '',
                                password2: '',
                                loading: false,
                                successMsg: response.data.successMessage
                            });

                        })
                        .catch (err =>{
                            console.log('Axios signup error:', err);
                            setFormData({...formData, loading: false, 
                                errorMsg: err.response.data.errorMessage});
                        });



                }


            };

    const showSingupForm = () => (
        <form className='signup-form' onSubmit={handleSubmit} noValidate>
            {/*username*/}
            <div className='form-group input-group'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-user mb-2' ></i>
                    </span>
                </div>
                <input
                    name='username'
                    value={username}
                    className='form-control'
                    placeholder='Username'
                    type='text'
                    onChange={handleChange}>
                
                </input>


            </div>
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
            {/*password2*/}
            <div className='form-group input-group mt-2'>
                <div className='input-group-prepend'>
                    <span className='input-group-text'>
                        <i className='fa fa-lock mb-2'></i>

                    </span>

                </div>
                <input 
                    name='password2'
                    value={password2}
                    className='form-control'
                    placeholder='Confirm Password'
                    type='password'
                    onChange={handleChange}
                    ></input>
            </div>
                {/*Signup button*/}
                <div className='form-group text-center mt-2'>
                <button type='submit' className='btn btn-primary btn-lock'>
                    Create Account
                </button>
                
            </div>
            {/*Already have an account */}
            <p className='text-center text-black'>
                Have an account? <Link to='/signin'>Log in</Link>
            </p>

        </form>

    );


    return (

        <div className='signup-container'>
            <div className='row vh-100 px-3'>
                <div className='col-md-5 mx-auto align-self-center '>
                {successMsg && showSuccessMsg(successMsg)}
                {errorMsg && showErrorMsg(errorMsg)}
                {loading && <div className='text-center pb-4'>{showLoading()}</div>}
                {showSingupForm()}
                
                </div>


            </div>
        
    </div>


    );
    
};


export default Signup;



//{JSON.stringify(formData)}