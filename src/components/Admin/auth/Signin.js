import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../core/Form.css';
import axios from 'axios';
import { authenticate, isAuth } from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Form } from 'react-bootstrap';

const Signin = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    const { email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/admin/signin`,
            data: { email, password }
        })
            .then(response => {
                console.log('SIGNIN SUCCESS', response);
                // save the response (user, token) localstorage/cookie
                authenticate(response, () => {
                    setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                    toast.success(`Hey ${response.data.user.name}, Welcome back!`);
                });
            })
            .catch(error => {
                console.log(error);
                console.log(typeof(error));
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response);
            });
    };

    const signinForm = () => (
        <form >
            <div className="form-group">
                <label className="labelCenter">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control mx-auto border-right-0 border-left-0 border-top-0" />
            </div>

            <div className="form-group">
                <label className="labelCenter">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control mx-auto border-right-0 border-left-0 border-top-0 " />
            </div>
            <div className="flex-container mt-5">
                <div className="flex-element">
                    <button className="btn btn-primary FormSubmit" onClick={clickSubmit}>
                        {buttonText}
                    </button>
                </div>            
            </div>
        </form>
    );

    return (
        <div className="row login-background m-0">
            <ToastContainer />
            <div className="col-md-6 mx-auto mt-5 mb-5">
                <div className="card card-body">
                    {isAuth() && isAuth().role === 'admin' ? <Redirect to="/admin/dashboard" /> : null}
                    <h1 className="text-center mb-4">Login</h1>
                    {signinForm()}   
                    <br />                     
                </div>                        
            </div>
        </div>
    );
};

export default Signin;