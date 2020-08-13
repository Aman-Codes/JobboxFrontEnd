import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from './Header';
import Layout from '../../shared/Layout';
import axios from 'axios';
import { isAuth, getCookie} from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const JobPosting = () => {
  
    const [values, setValues] = useState({
        jobtitle: '',
        jobType: 'Full Time',
        minExperience: '',
        maxExperience: '',
        jobLocation: '',
        relocation: 'Relocation Required',
        budget: '',
        currency:'Indian Rupees',
        diversity: 'Open For All',
        jobDescription: '',
        inputFile: null,
        buttonText: 'Submit'
    });

    const { 
        jobtitle, 
        jobType, 
        minExperience, 
        maxExperience, 
        jobLocation, 
        relocation, 
        budget, 
        currency, 
        diversity, 
        jobDescription,
        buttonText, 
        inputFile 
    } = values;

    const token = getCookie('token');

    const handleChange = jobtitle => event => {
        setValues({ ...values, [jobtitle]: event.target.value });
    };

    const handleSelectedFile = e => {
        e.preventDefault();

        var fileInput = document.getElementById('file'); 
        var filePath = fileInput.value;           
        // Allowing file type 
        var allowedExtensions = /(\.pdf|\.docx|\.doc|\.odt|\.tex|\.txt|\.rtf|\.wps|\.wks|\.wpd)$/i;           
        if (!allowedExtensions.exec(filePath)) { 
            alert('Invalid file type \n Please choose from allowed extensions:\n .pdf, .docx, .doc, .odt, .tex, .txt, .rtf, .wps, .wks, .wpd'); 
            fileInput.value = ''; 
            return false; 
        }
        else {
            setValues({
                ...values,
                inputFile: e.target.files[0]
            });
        }        
    };
    
    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        const id = isAuth()._id;
        const data = new FormData(document.getElementById("JobPostingForm"));
        data.append("file", inputFile );
        data.append("jobtitle", jobtitle );
        data.append("jobType", jobType);
        data.append("minExperience", minExperience );
        data.append("maxExperience", maxExperience );
        data.append("jobLocation", jobLocation );
        data.append("relocation", relocation );
        data.append("budget", budget );
        data.append("currency", currency );
        data.append("diversity", diversity );
        data.append("jobDescription", jobDescription );
        data.append("id", id );
            
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/recruiter/JobPosting`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: data
        })
            .then(response => {
                console.log('Job Posting SUCCESS', response);
                setValues({ 
                    ...values, 
                    jobtitle:'', 
                    jobType:'Full Time', 
                    minExperience:'', 
                    maxExperience:'', 
                    jobLocation:'', 
                    relocation:'Relocation Required', 
                    budget:'', 
                    currency:'Indian Rupees', 
                    diversity:'Open For All', 
                    jobDescription:'',
                    inputFile:null, 
                    buttonText: 'Submitted' 
                });
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('Job posting ERROR', error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error);
            });
    };

    const JobPostingForm = () => (
        <form encType="multipart/form-data" id="JobPostingForm"> 
            <div className="form-group">
                <label className="labelCenter">Job Title</label>
                <input 
                    onChange={handleChange('jobtitle')} 
                    value={jobtitle} 
                    placeholder="Enter Job Title" 
                    type="text" 
                    className="form-control mx-auto" 
                />
            </div>

            <div className="form-group">
                <label className="labelCenter">Job Type </label> 
                <select 
                    value={jobType} 
                    onChange={handleChange('jobType')} 
                    type="text" 
                    className="form-control mx-auto"
                >
                    <option value="Full Time">Full Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Part Time">Part Time</option>                                       
                    <option value="Contractual">Contractual</option>
                    <option value="Freelancing">Freelancing</option>
                </select>             
                
            </div>
            <div className="form-group">
                <label className="labelCenter">Relocation</label>
                <select 
                    value={relocation} 
                    onChange={handleChange('relocation')} 
                    className="form-control mx-auto"
                >
                    <option value="Open To Relocate">Open to Relocate</option>
                    <option value="Relocation Not Required">Relocation Not Required</option>
                    <option value="Open To Remote">Open To Remote</option>                                       
                </select>                
            </div>

            <div className="form-group">
                <label className="labelCenter">Minimum Experience Required ( in Years)</label>
                <input 
                    onChange={handleChange('minExperience')} 
                    value={minExperience} 
                    type="number" 
                    placeholder="Enter The Minimum Experience Required (in Years)" 
                    className="form-control mx-auto" 
                />
            </div>

            <div className="form-group">
                <label className="labelCenter">Maximum Experience (in Years)</label>
                <input 
                    onChange={handleChange('maxExperience')} 
                    value={maxExperience} 
                    type="number" 
                    placeholder="Enter The Maximum Experience Required (in Years)" 
                    className="form-control mx-auto" 
                />
            </div>

            <div className="form-group">
                <label className="labelCenter">Job Location</label>
                <input 
                    onChange={handleChange('jobLocation')} 
                    value={jobLocation} 
                    type="text" 
                    placeholder="Enter The Job Location" 
                    className="form-control mx-auto" 
                />
            </div>
            <div className="form-group">
                <label className="labelCenter">Max. Budget</label>
                <select 
                    value={currency} 
                    onChange={handleChange('currency')} 
                    type="text" 
                    className="form-control mx-auto"
                >
                    <option value="Indian Rupees">Indian Rupees (INR)</option>
                    <option value="US Dollar">US Dollar (USD)</option>
                    <option value="Pound sterling">Pound sterling (lb)</option>
                    <option value="Euro">Euro (EUR)</option>
                    <option value="Japanese Yen">Japanese Yen (JPY)</option>
                    <option value="Canadian dollar">Canadian dollar (CAD)</option>
                    <option value="Swiss franc">Swiss franc (CHF)</option>
                </select>
                <input 
                    onChange={handleChange('budget')} 
                    value={budget} 
                    className="form-control mx-auto" 
                />
            </div>

            <div className="form-group">
                <label className="labelCenter">Diversity </label> 
                <select 
                    value={diversity} 
                    onChange={handleChange('diversity')} 
                    type="text" 
                    className="form-control mx-auto"
                >
                    <option value="Open To All">Open To All</option>
                    <option value="Female Only">Female Only</option>
                    <option value="Differently Abled Only">Differently Abled Only</option>
                    <option value="Ex-Armyman Only">Ex-Armyman Only</option>
                </select>                
            </div>

            <div className="row mb-3">
                <div className="col-lg-5 offset-lg-1">
                    <div className="form-group">
                        <label className="labelCenter">Job Details</label>
                            <textarea 
                                className="form-control mx-auto"
                                onChange={handleChange('jobDescription')}
                                value={jobDescription}
                                placeholder="Enter The Job Details"
                                rows="5"
                            />                        
                    </div>                    
                </div>

                <div className="col-lg-1 d-flex flex-wrap align-items-center">
                    <p className="text-center mx-auto">OR</p>
                </div>
                
                <div className="col-lg-3 d-flex flex-wrap align-items-center">
                    <div className="text-center mx-auto">
                        <div className="form-group">
                            <input
                                type="file"
                                name=""
                                id="file"
                                onChange={handleSelectedFile}
                            />
                        </div>
                    </div>                    
                </div>
            </div>

            <div className="text-center">
                <button className="btn btn-primary FormSubmit" onClick={clickSubmit} >
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
                        Post a New Job-Opening
                        </h3>                        
                        {JobPostingForm()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default JobPosting;