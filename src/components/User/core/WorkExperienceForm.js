import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.min.css';
import './Form.css';

const WorkExperienceForm = ({ history }) => {

    const [values, setValues] = useState({
        InternshipCompany0: '',
        InternshipCompanyAddress0:'',
        InternshipDesignation0: '',
        InternshipWork0: '',
        InternshipStartDate0: '',
        InternshipEndDate0: '',
        JobCompany0: '',
        JobCompanyAddress0:'',
        JobDesignation0: '',
        JobWork0: '',
        JobStartDate0: '',
        JobEndDate0: '',
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
                console.log('Work Experience Form get', response);
                const { 
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
                console.log('Work Experience get error', error.response.data.error);
                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/');
                    });
                }
            });
    };

    const { 
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
        JobEndDate0,
        buttonText
    } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/users/workdetails/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { 
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
            }
        })
            .then(response => {
                console.log('Work Experience Form update success', response);
                updateUser(response, () => {
                    setValues({ ...values, buttonText: 'Submitted' });
                    toast.success('Work Experience Form updated successfully');
                });
            })
            .catch(error => {
                console.log('Work Experience Form update error', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const updateForm = () => (
        <form>
            <h4 className="text-center mb-3">Work Experience</h4>
            <h5>Internship</h5>
            <div className="form-group">
            <label htmlFor="InternshipCompany0" className="labelCenter">Company Name </label>
            <input
                type="text"
                id="InternshipCompany0"
                name="InternshipCompany0"
                className="form-control mx-auto"
                placeholder="Enter Company Name"
                defaultValue={InternshipCompany0}
                onChange={handleChange('InternshipCompany0')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="InternshipCompanyAddress0" className="labelCenter">Company Address </label>
            <input
                type="text"
                id="InternshipCompanyAddress0"
                name="InternshipCompanyAddress0"
                className="form-control mx-auto"
                placeholder="Enter Company Address"
                defaultValue={InternshipCompanyAddress0}
                onChange={handleChange('InternshipCompanyAddress0')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="InternshipDesignation0" className="labelCenter">Designation </label>
            <input
                type="text"
                id="InternshipDesignation0"
                name="InternshipDesignation0"
                className="form-control mx-auto"
                placeholder="Enter Designation"
                defaultValue={InternshipDesignation0}
                onChange={handleChange('InternshipDesignation0')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="InternshipWork0" className="labelCenter">Explain Your Role </label>
            <textarea
                type="text"
                id="InternshipWork0"
                name="InternshipWork0"
                className="form-control mx-auto"
                placeholder="Explain Your Role"
                defaultValue={InternshipWork0}
                onChange={handleChange('InternshipWork0')} 
                rows="4"
            />
            </div>
            <div className="form-group">
            <label htmlFor="InternshipStartDate0" className="labelCenter">Starting Date </label>
            <input
                type="date"
                id="InternshipStartDate0"
                name="InternshipStartDate0"
                className="form-control mx-auto"
                defaultValue={InternshipStartDate0.substr(0, 10)}
                onChange={handleChange('InternshipStartDate0')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="InternshipEndDate0" className="labelCenter">Ending Date </label>
            <input
                type="date"
                id="InternshipEndDate0"
                name="InternshipEndDate0"
                className="form-control mx-auto"
                defaultValue={InternshipEndDate0.substr(0, 10)}
                onChange={handleChange('InternshipEndDate0')} 
            />
            </div>

            <h5>Job</h5>
            <div className="form-group">
            <label htmlFor="JobCompany0" className="labelCenter">Company Name </label>
            <input
                type="text"
                id="JobCompany0"
                name="JobCompany0"
                className="form-control mx-auto"
                placeholder="Enter Company Name"
                defaultValue={JobCompany0}
                onChange={handleChange('JobCompany0')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="JobCompanyAddress0" className="labelCenter">Company Address </label>
            <input
                type="text"
                id="JobCompanyAddress0"
                name="JobCompanyAddress0"
                className="form-control mx-auto"
                placeholder="Enter Company Address"
                defaultValue={JobCompanyAddress0}
                onChange={handleChange('JobCompanyAddress0')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="JobDesignation0" className="labelCenter">Designation </label>
            <input
                type="text"
                id="JobDesignation0"
                name="JobDesignation0"
                className="form-control mx-auto"
                placeholder="Enter Designation"
                defaultValue={JobDesignation0}
                onChange={handleChange('JobDesignation0')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="JobWork0" className="labelCenter">Explain Your Role </label>
            <textarea
                type="text"
                id="JobWork0"
                name="JobWork0"
                className="form-control mx-auto"
                placeholder="Explain Your Role"
                defaultValue={JobWork0}
                onChange={handleChange('JobWork0')} 
                rows="4"
            />
            </div>
            <div className="form-group">
            <label htmlFor="JobStartDate0" className="labelCenter">Starting Date </label>
            <input
                type="date"
                id="JobStartDate0"
                name="JobStartDate0"
                className="form-control mx-auto"
                defaultValue={JobStartDate0.substr(0, 10)}
                onChange={handleChange('JobStartDate0')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="JobEndDate0" className="labelCenter">Ending Date </label>
            <input
                type="date"
                id="JobEndDate0"
                name="JobEndDate0"
                className="form-control mx-auto"
                defaultValue={JobEndDate0.substr(0, 10)}
                onChange={handleChange('JobEndDate0')} 
            />
            </div>
            <button className="btn btn-primary FormSubmit" onClick={clickSubmit}>
                {buttonText}
            </button>
        </form>
    )

    return(
        <React.Fragment>
            <Header />
            <div className="row workExFormBackground">
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

export default WorkExperienceForm;
