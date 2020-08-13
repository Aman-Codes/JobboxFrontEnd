import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { isAuth, getCookie, signout } from '../../shared/helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from './Header';
import './Form.css';


const AchievementForm = ({ history }) => {
    const [values, setValues] = useState({
        AcademicAbout0:'',
        ProfessionalAbout0:'',
        ExtraCurricularAbout0:'',
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
                console.log('Achievement Form get', response);
                const { AcademicAbout0, ProfessionalAbout0, ExtraCurricularAbout0 } = response.data;
                setValues({ ...values, AcademicAbout0, ProfessionalAbout0, ExtraCurricularAbout0 });
            })
            .catch(error => {
                console.log('Achievement Form get error', error.response.data.error);
                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/');
                    });
                }
            });
    };

    const { AcademicAbout0, ProfessionalAbout0, ExtraCurricularAbout0, buttonText } = values;

    const handleChange = name => event => {
        // console.log(event.target.value);
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/users/achievementdetails/update`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { AcademicAbout0, ProfessionalAbout0, ExtraCurricularAbout0 }
        })
            .then(response => {
                console.log('Achievement Form update success', response);
                setValues({ ...values, buttonText: 'Submitted' });
                toast.success('Achievement Form update successfully');
            })
            .catch(error => {
                console.log('Achievement Form update error', error.response.data.error);
                setValues({ ...values, buttonText: 'Submit' });
                toast.error(error.response.data.error);
            });
    };

    const updateForm = () => (
        <form>
            <h4 className="text-center mb-3">Achievements</h4> 
            <h5 >Academic</h5>
            <div className="form-group">
            <label htmlFor="AcademicAbout0" className="labelCenter">About Achievement </label>
            <textarea
                type="text"
                id="AcademicAbout0"
                name="AcademicAbout0"
                className="form-control mx-auto"
                placeholder="Explain Your Academic Achievement"
                rows="5"     
                defaultValue={AcademicAbout0}
                onChange={handleChange('AcademicAbout0')} 
            />
            </div>
            <h5 >Professional</h5>
            <div className="form-group">
            <label htmlFor="ProfessionalAbout0" className="labelCenter">About Achievement </label>
            <textarea
                type="text"
                id="ProfessionalAbout0"
                name="ProfessionalAbout0"
                className="form-control mx-auto"
                placeholder="Explain Your Professional Achievement"
                rows="5"     
                defaultValue={ProfessionalAbout0}
                onChange={handleChange('ProfessionalAbout0')} 
            />
            </div>
            <h5 >Extra Curricular</h5>
            <div className="form-group ">
            <label htmlFor="ExtraCurricularAbout0" className="labelCenter">About Achievement </label>
            <textarea
                type="text"
                id="ExtraCurricularAbout0"
                name="ExtraCurricularAbout0"
                className="form-control mx-auto"
                placeholder="Explain Your Extra Curricular Achievement"
                rows="5"     
                defaultValue={ExtraCurricularAbout0}
                onChange={handleChange('ExtraCurricularAbout0')}                            
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
            <div className="row achievementFormBackground">
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

export default AchievementForm;
