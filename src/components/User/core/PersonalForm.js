import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.min.css';
import './Form.css';

const PersonalForm = ({ history }) => {

    const [values, setValues] = useState({
        PhoneNumber: '',
        Address:'',
        Gender: '',
        DOB: '',
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
            url: `${process.env.REACT_APP_API}/users/${isAuth()._id}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Personal Form get', response);
                const { 
                    PhoneNumber, 
                    Address, 
                    Gender, 
                    DOB,
                    inputImage,
                    imageUrl
                } = response.data;
                setValues({ 
                    ...values, 
                    PhoneNumber, 
                    Address, 
                    Gender, 
                    DOB,
                    inputImage,
                });
                if(imageUrl) {
                    document.getElementById( 
                        'imagePreview').innerHTML =  
                        `<img src="${imageUrl}" width="200" height="200" class="img-circle mx-auto d-block" alt="Uploaded Image"/>`;    
                }
            })
            .catch(error => {
                console.log('Personal Form get error', error.data.error);
                toast.error(error);
                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/');
                    });
                }
            });
    };

    const { 
        PhoneNumber, 
        Address, 
        Gender, 
        DOB,
        inputImage,
        buttonText 
    } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
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
        const data = new FormData(document.getElementById("PersonalForm"));    
        data.append("file", inputImage );    
        data.append("PhoneNumber", PhoneNumber );
        data.append("Address", Address);
        data.append("Gender", Gender );
        data.append("DOB", DOB );
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/users/personaldetails/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: data
        })
            .then(response => {
                console.log('Personal Form update success', response);
                setValues({ ...values, buttonText: 'Submitted' });
                toast.success('Personal Form updated successfully');
            })
            .catch(error => {
                console.log('Personal Form update error', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const updateForm = () => (
        <form encType="multipart/form-data" id="PersonalForm">
            <h4 className="text-center mb-3">Personal Details</h4>
            
            <div className="form-group">
                <label htmlFor="PhoneNumber" className="requiredfield labelCenter">Phone Number </label>
                <input
                    type="tel"
                    id="PhoneNumber"
                    className="form-control mx-auto"
                    placeholder="Enter Phone Number"
                    defaultValue={PhoneNumber}
                    onChange={handleChange('PhoneNumber')}                                
                />
            </div>

            <div className="form-group">
                <label htmlFor="Address" className="requiredfield labelCenter">Address </label>
                <input
                    type="text"
                    id="Address"
                    className="form-control mx-auto"
                    placeholder="Enter Address"
                    defaultValue={Address}
                    onChange={handleChange('Address')}     
                />
            </div>

            <div className="form-group">
                <p className="requiredfield labelCenter">Select Your Gender </p>
                <div className="labelCenter">
                    <input
                        type="radio"
                        id="Male"
                        value="Male"
                        checked={Gender === 'Male'}
                        onChange={handleChange('Gender')}    
                    />
                    <label htmlFor="Male"> Male</label>&emsp;

                    <input
                        type="radio"
                        id="Female"
                        value="Female"
                        checked={Gender === 'Female'}
                        onChange={handleChange('Gender')} 
                    />
                    <label htmlFor="Female"> Female</label>&emsp;

                    <input
                        type="radio"
                        id="Other"
                        value="Other" 
                        checked={Gender === 'Other'} 
                        onChange={handleChange('Gender')}  
                    />
                    <label htmlFor="Other">Other</label>
                    
                </div>            
            </div>

            <div className="form-group">
                <label htmlFor="DOB" className="requiredfield labelCenter">Date of Birth </label>
                <input
                    type="date"                
                    id="DOB"
                    className="form-control mx-auto"
                    defaultValue={DOB}
                    onChange={handleChange('DOB')}  
                />
            </div>

            <div className="form-group align-items-center mx-auto">
                <label className="labelCenter">Upload Profile Picture</label>
                <input
                    type="file"
                    id="file"
                    className="form-control mx-auto border-0"
                    onChange={handleSelectedFile}
                />
            </div>

            {/* Image Preview */}
            <div id="imagePreview"></div> 

            <button className="btn btn-primary FormSubmit" onClick={clickSubmit}>
                {buttonText}
            </button>
        </form>
    );

    return(
        <React.Fragment>
            <Header />
            <div className="row">
                <ToastContainer />
                <div className="col-md-6 mx-auto my-3 ">
                    <div className="card card-body">
                        <h3 className="text-center mb-3">
                            Build Your Profile
                        </h3>                        
                        {updateForm()}
                    </div>
                </div>
            </div>  
        </React.Fragment>
    );
}

export default PersonalForm;
