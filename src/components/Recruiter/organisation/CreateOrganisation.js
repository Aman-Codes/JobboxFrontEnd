import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../core/Header';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const CreateOrganisation = ({ history }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        about:'',
        website: '',
        inputImage: null,
        buttonText: 'Submit'
    });

    const token = getCookie('token');

    const { 
        name, 
        email, 
        about, 
        website,
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
        const data = new FormData(document.getElementById("createOrganisationForm"));    
        data.append("file", inputImage );    
        data.append("name", name );
        data.append("email", email );
        data.append("about", about );
        data.append("website", website );
        data.append("recruiterId", isAuth()._id );
        
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/recruiter/organisation/create`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: data
        })
            .then(response => {
                console.log('Successfully created the organisation ', response);
                setValues({ ...values, buttonText: 'Submitted' });
                toast.success('Successfully created the organisation');
            })
            .catch(error => {
                console.log('Error in creating a new orgnisation ', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const createOrganisationForm = () => (
        <form encType="multipart/form-data" id="createOrganisationForm"> 
            <div className="form-group">
                <label className="labelCenter">Name</label>
                <input onChange={handleChange('name')} value={name} type="text" className="form-control mx-auto" />
            </div>

            <div className="form-group">
                <label className="labelCenter">Email</label>
                <input onChange={handleChange('email')} value={email} type="text" className="form-control mx-auto" />
            </div>

            <div className="form-group">
                <label className="labelCenter">Website</label>
                <input onChange={handleChange('website')} value={website} type="text" className="form-control mx-auto" />
            </div>

            <div className="form-group">
                <label className="labelCenter">About</label>
                <textarea 
                className="form-control mx-auto"
                onChange={handleChange('about')}
                value={about}
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
                            Create a new organisation
                        </h3>                        
                        {createOrganisationForm()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CreateOrganisation;