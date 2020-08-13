import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.min.css';
import './Form.css';

const UserProfile = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        PhoneNumber: '',
        Address:'',
        Gender: '',
        DOB: '',
        AcademicAbout0: '',
        ProfessionalAbout0: '',
        ExtraCurricularAbout0: '',
        InstituteName10: '',
        PassingYear10: '',
        Marks10: '',
        InstituteName12: '',
        PassingYear12: '',
        Marks12: '',
        InstituteNameUnderGrad: '',
        PassingYearUnderGrad: '',
        MarksUnderGrad: '',
        InstituteNamePostGrad: '',
        PassingYearPostGrad: '',
        MarksPostGrad: '',
        InstituteNamePhd: '',
        PassingYearPhd: '',
        MarksPhd: '',
        InternshipCompany0: '',
        InternshipCompanyAddress0: '',
        InternshipDesignation0: '',
        InternshipWork0: '',
        InternshipStartDate0: '',
        InternshipEndDate0: '',
        JobCompany0: '',
        JobCompanyAddress0: '',
        JobDesignation0: '',
        JobWork0: '',
        JobStartDate0: '',
        JobEndDate0: '',
    });

    const token = getCookie('token');
    let history = useHistory();

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
                console.log('View Profile get', response);
                const { 
                    name,
                    email,
                    PhoneNumber,
                    Address,
                    Gender,
                    DOB,
                    AcademicAbout0,
                    ProfessionalAbout0,
                    ExtraCurricularAbout0,
                    InstituteName10,
                    PassingYear10,
                    Marks10,
                    InstituteName12,
                    PassingYear12,
                    Marks12,
                    InstituteNameUnderGrad,
                    PassingYearUnderGrad,
                    MarksUnderGrad,
                    InstituteNamePostGrad,
                    PassingYearPostGrad,
                    MarksPostGrad,
                    InstituteNamePhd,
                    PassingYearPhd,
                    MarksPhd,
                    InternshipCompany0,
                    InternshipCompanyAddress0,
                    InternshipDesignation0,
                    InternshipWork0,
                    InternshipStartDate0,
                    InternshipEndDate0,
                    JobCompany0,
                    JobCompanyAddress0,
                    JobDesignation0,
                    JobWork0,
                    JobStartDate0,
                    JobEndDate0 
                } = response.data;
                setValues({ 
                    ...values, 
                    name,
                    email,
                    PhoneNumber,
                    Address,
                    Gender,
                    DOB,
                    AcademicAbout0,
                    ProfessionalAbout0,
                    ExtraCurricularAbout0,
                    InstituteName10,
                    PassingYear10,
                    Marks10,
                    InstituteName12,
                    PassingYear12,
                    Marks12,
                    InstituteNameUnderGrad,
                    PassingYearUnderGrad,
                    MarksUnderGrad,
                    InstituteNamePostGrad,
                    PassingYearPostGrad,
                    MarksPostGrad,
                    InstituteNamePhd,
                    PassingYearPhd,
                    MarksPhd,
                    InternshipCompany0,
                    InternshipCompanyAddress0,
                    InternshipDesignation0,
                    InternshipWork0,
                    InternshipStartDate0,
                    InternshipEndDate0,
                    JobCompany0,
                    JobCompanyAddress0,
                    JobDesignation0,
                    JobWork0,
                    JobStartDate0,
                    JobEndDate0
                });
            })
            .catch(error => {
                console.log('View Profile get error', error.data.error);
                toast.error(error);
                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/');
                    });
                }
            });
    };

    const { 
        name,
        email,
        PhoneNumber,
        Address,
        Gender,
        DOB,
        AcademicAbout0,
        ProfessionalAbout0,
        ExtraCurricularAbout0,
        InstituteName10,
        PassingYear10,
        Marks10,
        InstituteName12,
        PassingYear12,
        Marks12,
        InstituteNameUnderGrad,
        PassingYearUnderGrad,
        MarksUnderGrad,
        InstituteNamePostGrad,
        PassingYearPostGrad,
        MarksPostGrad,
        InstituteNamePhd,
        PassingYearPhd,
        MarksPhd,
        InternshipCompany0,
        InternshipCompanyAddress0,
        InternshipDesignation0,
        InternshipWork0,
        InternshipStartDate0,
        InternshipEndDate0,
        JobCompany0,
        JobCompanyAddress0,
        JobDesignation0,
        JobWork0,
        JobStartDate0,
        JobEndDate0
    } = values;
    const DOBdate = new Date(DOB);
    const InternshipStartdate0 = new Date(InternshipStartDate0);
    const InternshipEnddate0 = new Date(InternshipEndDate0);
    const JobStartdate0 = new Date(JobStartDate0);
    const JobEnddate0 = new Date(JobEndDate0);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const viewProfile = () => (
        <div className="ml-5">
            <h4 className="text-center mb-3">Personal Details</h4>
            <p >Name: <span>{name} </span></p>
            <p >Email: <span>{email} </span></p>
            <p >Phone Number: <span>{PhoneNumber} </span></p>
            <p >Address: <span>{Address} </span></p>
            <p >Gender: <span>{Gender} </span></p>
            <p >DOB: <span>{DOBdate.toLocaleDateString("en-US", options)} </span></p>

            <h4 className="text-center mb-3">Education Details</h4>

            <h5 className="mb-3">Class 10</h5>
            <p >School Name: <span>{InstituteName10} </span></p>
            <p >Year Of Passing: <span>{PassingYear10} </span></p>
            <p >Percentage / CGPA / Grade Obtained: <span>{Marks10} </span></p>

            <h5 className="mb-3">Class 12</h5>
            <p >School Name: <span>{InstituteName12} </span></p>
            <p >Year Of Passing: <span>{PassingYear12} </span></p>
            <p >Percentage / CGPA / Grade Obtained: <span>{Marks12} </span></p>

            <h5 className="mb-3">Under Graduation</h5>
            <p >College Name: <span>{InstituteNameUnderGrad} </span></p>
            <p >Year Of Passing: <span>{PassingYearUnderGrad} </span></p>
            <p >Percentage / CGPA / Grade Obtained: <span>{MarksUnderGrad} </span></p>

            <h5 className="mb-3">Post Graduation</h5>
            <p >College Name: <span>{InstituteNamePostGrad} </span></p>
            <p >Year Of Passing: <span>{PassingYearPostGrad} </span></p>
            <p >Percentage / CGPA / Grade Obtained: <span>{MarksPostGrad} </span></p>

            <h5 className="mb-3">Phd</h5>
            <p >College Name: <span>{InstituteNamePhd} </span></p>
            <p >Year Of Passing: <span>{PassingYearPhd} </span></p>
            <p >Percentage / CGPA / Grade Obtained: <span>{MarksPhd} </span></p>

            <h4 className="text-center mb-3">Achievements Details</h4>
            <p >Academic Achievement: <span>{AcademicAbout0} </span></p>
            <p >Professional Achievement: <span>{ProfessionalAbout0} </span></p>
            <p >Extra Curricular Achievement: <span>{ExtraCurricularAbout0} </span></p>

            <h4 className="text-center mb-3">Work Experience Details</h4>

            <h5 className="mb-3">Internship</h5>

            <p >Company Name: <span>{InternshipCompany0} </span></p>
            <p >Company Address: <span>{InternshipCompanyAddress0} </span></p>
            <p >Designation: <span>{InternshipDesignation0} </span></p>
            <p >Work: <span>{InternshipWork0} </span></p>
            <p >Start Date: <span>{InternshipStartdate0.toLocaleDateString("en-US", options)} </span></p>
            <p >End Date: <span>{InternshipEnddate0.toLocaleDateString("en-US", options)} </span></p>

            <h5 className="mb-3">Job</h5>

            <p >Company Name: <span>{JobCompany0} </span></p>
            <p >Company Address: <span>{JobCompanyAddress0} </span></p>
            <p >Designation: <span>{JobDesignation0} </span></p>
            <p >Work: <span>{JobWork0} </span></p>
            <p >Start Date: <span>{JobStartdate0.toLocaleDateString("en-US", options)} </span></p>
            <p >End Date: <span>{JobEnddate0.toLocaleDateString("en-US", options)} </span></p>

            {/* <div className="form-group">
            <label htmlFor="PhoneNumber" className="requiredfield labelCenter">Phone Number </label>
            <input
                type="tel"
                id="PhoneNumber"
                name="PhoneNumber"
                className="form-control mx-auto"
                placeholder="Enter Phone Number"
                defaultValue={PhoneNumber}                              
            />
            </div>
            <div className="form-group">
            <label htmlFor="Address" className="requiredfield labelCenter">Address </label>
            <input
                type="text"
                id="Address"
                name="Address"
                className="form-control mx-auto"
                placeholder="Enter Address"
                defaultValue={Address}  
            />
            </div>
            <div className="form-group">
            <p className="requiredfield labelCenter">Select Your Gender </p>
            <div className="labelCenter">
                <input
                    type="radio"
                    id="Male"
                    value="Male"
                    name="Gender"
                    checked={Gender === 'Male'}  
                />
                <label htmlFor="Male"> Male</label>&emsp;
                <input
                    type="radio"
                    id="Female"
                    value="Female"
                    name="Gender" 
                    checked={Gender === 'Female'}
                />
                <label htmlFor="Female"> Female</label>&emsp;
                <input
                    type="radio"
                    id="Other"
                    value="Other"
                    name="Gender" 
                    checked={Gender === 'Other'} 
                />
                <label htmlFor="Other">Other</label>
            </div>            
            </div>            
            <div className="form-group">
            <label htmlFor="DOB" className="requiredfield labelCenter">Date of Birth </label>
            <input
                type="date"                
                id="DOB"
                name="DOB"
                className="form-control mx-auto"
                defaultValue={DOB}
            />
            </div> */}
        </div>
    );

    return(
        <React.Fragment>
            <Header />
            <div className="row">
                <ToastContainer />
                <div className="col-md-8 mx-auto my-3 ">
                    <div className="card card-body">
                        <h1 className="text-center mb-3">
                            Your Profile
                        </h1>                        
                        {viewProfile()}
                    </div>
                </div>
            </div>  
        </React.Fragment>
    );
}

export default UserProfile;
