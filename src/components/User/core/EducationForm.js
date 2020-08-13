import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.min.css';
import './Form.css';


const EducationForm = ({ history }) => {

    const [values, setValues] = useState({
        InstituteName10: '',
        PassingYear10:'',
        Marks10: '',
        InstituteName12: '',
        PassingYear12:'',
        Marks12: '',
        InstituteNameUnderGrad: '',
        PassingYearUnderGrad:'',
        MarksUnderGrad: '',
        InstituteNamePostGrad: '',
        PassingYearPostGrad:'',
        MarksPostGrad: '',
        InstituteNamePhd: '',
        PassingYearPhd: '',
        MarksPhd: '',
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
                console.log('Education Form get', response);
                const { 
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
                } = response.data;
                setValues({ 
                    ...values, 
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
                });
            })
            .catch(error => {
                console.log('Education Form get error', error.response.data.error);
                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/');
                    });
                }
            });
    };

    const { 
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
        buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/users/educationdetails/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { 
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
                MarksPhd
            }
        })
            .then(response => {
                console.log('Education Form update success', response);
                updateUser(response, () => {
                    setValues({ ...values, buttonText: 'Submitted' });
                    toast.success('Education Form updated successfully');
                });
            })
            .catch(error => {
                console.log('Education Form update error', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const updateForm = () => (
        <form>
            <h4 className="text-center mb-3">Education Details</h4>
            <h5>Class 10</h5>
            <div className="form-group">
            <label htmlFor="InstituteName10" className="requiredfield labelCenter">School Name </label>
            <input
                type="text"
                id="InstituteName10"
                name="InstituteName10"
                className="form-control mx-auto"
                placeholder="Enter School Name"
                defaultValue={InstituteName10}
                onChange={handleChange('InstituteName10')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="PassingYear10" className="requiredfield labelCenter">Year Of Passing </label>
            <input
                type="text"
                id="PassingYear10"
                name="PassingYear10"
                className="form-control mx-auto"
                placeholder="Enter Year Of Passing"
                defaultValue={PassingYear10}
                onChange={handleChange('PassingYear10')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="Marks10" className="requiredfield labelCenter">Percentage / CGPA / Grade Obtained </label>
            <input
                type="text"
                id="Marks10"
                name="Marks10"
                className="form-control mx-auto"
                placeholder="Enter Percentage/CGPA/Grade"
                defaultValue={Marks10}
                onChange={handleChange('Marks10')} 
            />
            </div>                      
            <h5>Class 12</h5>
            <div className="form-group">
            <label htmlFor="InstituteName12" className="requiredfield labelCenter">School Name </label>
            <input
                type="text"
                id="InstituteName12"
                name="InstituteName12"
                className="form-control mx-auto"
                placeholder="Enter School Name"
                defaultValue={InstituteName12}
                onChange={handleChange('InstituteName12')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="PassingYear12" className="requiredfield labelCenter">Year Of Passing </label>
            <input
                type="text"
                id="PassingYear12"
                name="PassingYear12"
                className="form-control mx-auto"
                placeholder="Enter Year Of Passing"
                defaultValue={PassingYear12}
                onChange={handleChange('PassingYear12')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="Marks12" className="requiredfield labelCenter">Percentage / CGPA / Grade Obtained </label>
            <input
                type="text"
                id="Marks12"
                name="Marks12"
                className="form-control mx-auto"
                placeholder="Enter Percentage/CGPA/Grade"
                defaultValue={Marks12}
                onChange={handleChange('Marks12')} 
            />
            </div>
            <h5>Under Graduation</h5>
            <div className="form-group">
            <label htmlFor="InstituteNameUnderGrad" className="requiredfield labelCenter">College Name </label>
            <input
                type="text"
                id="InstituteNameUnderGrad"
                name="InstituteNameUnderGrad"
                className="form-control mx-auto"
                placeholder="Enter College Name"
                defaultValue={InstituteNameUnderGrad}
                onChange={handleChange('InstituteNameUnderGrad')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="PassingYearUnderGrad" className="requiredfield labelCenter">Year Of Passing </label>
            <input
                type="text"
                id="PassingYearUnderGrad"
                name="PassingYearUnderGrad"
                className="form-control mx-auto"
                placeholder="Enter Year Of Passing"
                defaultValue={PassingYearUnderGrad}
                onChange={handleChange('PassingYearUnderGrad')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="MarksUnderGrad" className="requiredfield labelCenter">Percentage / CGPA / Grade Obtained</label>
            <input
                type="text"
                id="MarksUnderGrad"
                name="MarksUnderGrad"
                className="form-control mx-auto"
                placeholder="Enter Percentage/CGPA/Grade"
                defaultValue={MarksUnderGrad}
                onChange={handleChange('MarksUnderGrad')} 
            />
            </div>             
            <h5>Post Graduation</h5>
            <div className="form-group">
            <label htmlFor="InstituteNamePostGrad" className="labelCenter">College Name </label>
            <input
                type="text"
                id="InstituteNamePostGrad"
                name="InstituteNamePostGrad"
                className="form-control mx-auto"
                placeholder="Enter College Name"
                defaultValue={InstituteNamePostGrad}
                onChange={handleChange('InstituteNamePostGrad')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="PassingYearPostGrad" className="labelCenter">Year Of Passing </label>
            <input
                type="text"
                id="PassingYearPostGrad"
                name="PassingYearPostGrad"
                className="form-control mx-auto"
                placeholder="Enter Year Of Passing"
                defaultValue={PassingYearPostGrad}
                onChange={handleChange('PassingYearPostGrad')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="MarksPostGrad" className="labelCenter">Percentage / CGPA / Grade</label>
            <input
                type="text"
                id="MarksPostGrad"
                name="MarksPostGrad"
                className="form-control mx-auto"
                placeholder="Enter Percentage/CGPA/Grade"
                defaultValue={MarksPostGrad}
                onChange={handleChange('MarksPostGrad')} 
            />
            </div>
            <h5>Phd</h5>
            <div className="form-group">
            <label htmlFor="InstituteNamePhd" className="labelCenter">College Name </label>
            <input
                type="text"
                id="InstituteNamePhd"
                name="InstituteNamePhd"
                className="form-control mx-auto"
                placeholder="Enter College Name"
                defaultValue={InstituteNamePhd}
                onChange={handleChange('InstituteNamePhd')} 
            />
            </div>
            <div className="form-group">
            <label htmlFor="PassingYearPhd" className="labelCenter">Year Of Passing </label>
            <input
                type="text"
                id="PassingYearPhd"
                name="PassingYearPhd"
                className="form-control mx-auto"
                placeholder="Enter Year Of Passing"
                defaultValue={PassingYearPhd}
                onChange={handleChange('PassingYearPhd')} 
            />
            </div>
            <div className="form-group" >
            <label htmlFor="MarksPhd" className="labelCenter">Percentage / CGPA / Grade Ontained</label>
            <input
                type="text"
                id="MarksPhd"
                name="MarksPhd"
                className="form-control mx-auto"
                placeholder="Enter Percentage/CGPA/Grade"
                defaultValue={MarksPhd}
                onChange={handleChange('MarksPhd')} 
            />
            </div>
            <button className="btn btn-primary FormSubmit" onClick={clickSubmit}>
                {buttonText}
            </button>
        </form>    
    );          


    return(
        <React.Fragment>
            <Header />
            <div className="row educationFormBackground">
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

export default EducationForm;
