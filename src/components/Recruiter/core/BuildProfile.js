import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import './BuildProfile.css';

const Private = ({ history }) => {
    const [values, setValues] = useState({
        name: '',
        rcontact: '',
        remployer:'',
        rcwebsite: '',
        rdesignation: '',
        rcdetails: '',
        inputImage: null,
        buttonText: 'Submit'
    });

    const token = getCookie('token');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/recruiter/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('PRIVATE PROFILE GET', response);
                const { 
                    name, 
                    rcontact, 
                    remployer, 
                    rdesignation, 
                    rcdetails, 
                    rcwebsite, 
                    inputImage,
                    imageUrl
                } = response.data;
                setValues({ 
                    ...values, 
                    name, 
                    rcontact, 
                    remployer, 
                    rdesignation, 
                    rcdetails, 
                    rcwebsite, 
                    inputImage,
                });
                if(imageUrl) {
                    document.getElementById( 
                        'imagePreview').innerHTML =  
                        `<img src="${imageUrl}" width="200" height="200" class="img-circle mx-auto d-block" alt="Uploaded Image"/>`;    
                }
                
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/');
                    });
                }
            });
    };

    const { 
        name, 
        rcontact, 
        remployer, 
        rdesignation, 
        rcdetails,
        rcwebsite, 
        inputImage, 
        buttonText 
    } = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleSelectedFile = e => {
        e.preventDefault();

        var fileInput = document.getElementById('file');   
        var filePath = fileInput.value;        
        // Allowing file type 
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;           
        if (!allowedExtensions.exec(filePath)) { 
            alert('Invalid file type\n Please choose from allowed extensions: .jpg, .jpeg, .png, .gif'); 
            fileInput.value = ''; 
            return false; 
        } 
        else {
            // Image preview 
            if (fileInput.files && fileInput.files[0]) { 
                var reader = new FileReader(); 
                reader.onload = function(e) { 
                    document.getElementById( 
                        'imagePreview').innerHTML =  
                        `<img src="${e.target.result}" width="200" height="200" class="img-circle mx-auto d-block" alt="Uploaded Image"/>`; 
                };                 
                reader.readAsDataURL(fileInput.files[0]); 
                setValues({
                    ...values,
                    inputImage: e.target.files[0]
                });
            }
        }        
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        const data = new FormData(document.getElementById("buildProfileForm"));    
        data.append("file", inputImage );    
        data.append("name", name );
        data.append("rcontact", rcontact);
        data.append("remployer", remployer );
        data.append("rdesignation", rdesignation );
        data.append("rcwebsite", rcwebsite );
        data.append("rcdetails", rcdetails );
        
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/recruiter/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: data
        })
            .then(response => {
                console.log('PRIVATE PROFILE UPDATE SUCCESS', response);
                updateUser(response, () => {
                    setValues({ ...values, buttonText: 'Submitted' });
                    toast.success('Profile updated successfully');
                });
            })
            .catch(error => {
                console.log('PRIVATE PROFILE UPDATE ERROR', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const updateForm = () => (
        <form encType="multipart/form-data" id="buildProfileForm"> 
            <div className="form-group">
                <label className="labelCenter">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control mx-auto" />
            </div>
            
            <div className="form-group">
                <label className="labelCenter">Contact Number</label>
                <input onChange={handleChange('rcontact')} value={rcontact} type="number" className="form-control mx-auto" />
            </div>
            <div className="form-group">
                <label className="labelCenter">Employer/Organization</label>
                <input onChange={handleChange('remployer')} value={remployer} type="text" className="form-control mx-auto" />
            </div>
            <div className="form-group">
                <label className="labelCenter">Designation</label>
                <input onChange={handleChange('rdesignation')} value={rdesignation} type="text" className="form-control mx-auto" />
            </div>
            <div className="form-group">
                <label className="labelCenter">Company Website</label>
                <input onChange={handleChange('rcwebsite')} value={rcwebsite} type="website" className="form-control mx-auto" />
            </div>
            <div className="form-group">
                <label className="labelCenter">Company Details</label>
                <textarea 
                className="form-control mx-auto"
                onChange={handleChange('rcdetails')}
                value={rcdetails}
                rows="5"
                />
            </div>
            <div className="form-group align-items-center mx-auto">
                <label className="labelCenter">Upload Company Logo</label>
                <input
                    type="file"
                    name=""
                    id="file"
                    className="form-control mx-auto border-0"
                    onChange={handleSelectedFile}
                />
            </div>

            {/* Image Preview */}
            <div id="imagePreview"></div> 

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
                            Recruiter Profile Update
                        </h3>                        
                        {updateForm()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Private;