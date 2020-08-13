import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../../shared/Layout';
import axios from 'axios';
import { authenticate, isAuth } from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import {Button, Modal} from 'react-bootstrap';
import Google from './Google';
import Facebook from './Facebook';
import 'react-toastify/dist/ReactToastify.min.css';

const Signin = ({ history }) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    });

    // Hooks for the warning of making job post archive 
    const [showWarning, setShowWarning] = useState(false);
    const handleCloseWarning = () => setShowWarning(false);
    const handleShowWarning = () => setShowWarning(true);

    const { email, password, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const informParent = response => {
        authenticate(response, () => {
            history.push('/recruiter/dashboard');
        });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/recruiter/signin`,
            data: { email, password }
        })
            .then(response => {
                console.log('SIGNIN SUCCESS', response);
                // save the response (user, token) localstorage/cookie
                authenticate(response, () => {
                    setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                    toast.success(`Hey ${response.data.user.name}, Welcome back!`);
                    history.push('/recruiter/dashboard');
                });
            })
            .catch(error => {
                console.log('SIGNIN ERROR', error.response.data);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const signinForm = () => (
        <form>
            <div className="form-group">
                <label className="labelCenter">Email</label>
                <input onChange={handleChange('email')} value={email} type="email" className="form-control mx-auto border-right-0 border-left-0 border-top-0" />
            </div>

            <div className="form-group">
                <label className="labelCenter">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control mx-auto border-right-0 border-left-0 border-top-0" />
            </div>

            <div className="form-group">
                <Link to="/users/auth/password/forgot" className="labelCenter">
                    Forgot Password?
                </Link>
            </div>
            <div className="flex-container mt-5">
                <div className="flex-element">
                    <button className="btn btn-primary FormSubmit" onClick={clickSubmit}>
                        {buttonText}
                    </button>
                </div>
                <div className="flex-element">
                    <span className="login-with">Login with</span> &nbsp;&nbsp;
                    {/* <Google informParent={informParent} /> &nbsp;
                    <Facebook informParent={informParent} /> &nbsp; */}
                    {/* <Google variant="danger"  /> */}
                    <Button className="btn btn-danger Google" onClick={handleShowWarning}>
                        <i className="fa fa-google"></i>
                    </Button> &nbsp;

                </div>                
            </div>
            <div className="container text-center">
                <hr/>
                Don't have an account <Link to = "/recruiter/signup"> Register Now!</Link>
            </div>

            {/* Modal to display warning for making job post archive */}
            <Modal show={showWarning} onHide={handleCloseWarning}>
                <Modal.Header closeButton>
                    <Modal.Title>Will be added soon ...</Modal.Title>
                </Modal.Header>
                <Modal.Body>This feature will be added soon...</Modal.Body>
                <Modal.Footer>                        
                    <Button variant="secondary" onClick={handleCloseWarning}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </form>
    );

    return (
        <div className="row login-background m-0">
            <ToastContainer />
            <div className="col-md-6 mx-auto mt-5 mb-5">
                <div className="card card-body">
                    {isAuth() && isAuth().role === 'subscriber' ? <Redirect to="/recruiter/dashboard" /> : null}
                    <h1 className="text-center mb-4">Login</h1>
                    {signinForm()}
                    <br />
                </div>                        
            </div>
        </div>
    );
};

export default Signin;