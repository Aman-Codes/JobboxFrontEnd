import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ChangePassword = ({ history }) => {
    const [values, setValues] = useState({
        password: '',
        buttonText: 'Submit'
    });

    const token = getCookie('token');
    
    const { 
        password,
        buttonText 
    } = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });        
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/recruiter/changepassword`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {password}
        })
            .then(response => {
                console.log('Password changed successfully', response);
                updateUser(response, () => {
                    setValues({ ...values, buttonText: 'Submitted' });
                    toast.success('Password changed successfully');
                });
            })
            .catch(error => {
                console.log('Error occured in changing password ', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const updateForm = () => (
        <form > 
            <div className="form-group">
                <label className="labelCenter">Password</label>
                <input onChange={handleChange('password')} value={password} type="password" className="form-control mx-auto" />
            </div>
            <div>
                <button className="btn btn-primary FormSubmit" onClick={clickSubmit}>
                    {buttonText}
                </button>
            </div>
        </form>
    );

    return (
        <React.Fragment>
            <Header/>
            <div className="row">
                <ToastContainer />
                <div className="col-md-9 mx-auto my-4 ">
                    <div className="card card-body">
                        <h3 className="text-center mb-3">
                            CHANGE PASSWORD
                        </h3>                        
                        {updateForm()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ChangePassword;