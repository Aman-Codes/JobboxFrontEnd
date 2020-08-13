import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from '../core/Header';
import axios from 'axios';
import { isAuth, getCookie, signout, updateUser } from '../../shared/helpers';
import {Modal, Button} from 'react-bootstrap'
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const RecruiterViewOrganisation = ({ history }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        about:'',
        website: '',
        logoUrl: ' ',
        member: ' ',
        memberEmail: ' '
    });

    const token = getCookie('token');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { 
        name, 
        email, 
        about, 
        website,
        logoUrl,
        member,
        memberEmail,
        _id
    } = values;

    const loadOrganisation = () => {
        const RecruiterId = isAuth()._id;
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/recruiter/organisation/view`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {RecruiterId}
        })
            .then(response => {
                // console.log('Successfully fetched Organisation data ', response);
                const { 
                    name, 
                    email, 
                    about, 
                    website,
                    logoUrl,
                    member,
                    _id
                } = response.data;
                setValues({ 
                    ...values, 
                    name, 
                    email, 
                    about, 
                    website,
                    logoUrl,
                    member,
                    _id
                });
                // if(imageUrl) {
                //     document.getElementById( 
                //         'imagePreview').innerHTML =  
                //         `<img src="${imageUrl}" width="200" height="200" class="img-circle mx-auto d-block" alt="Uploaded Image"/>`;    
                // }                
            })
            .catch(error => {
                console.log('Error in getting data of organisation', error.response.data.error);
                toast.error(error.response.data.error);
                if (error.response.status === 401) {
                    signout(() => {
                        history.push('/');
                    });
                }
            });
    };

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();        
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/recruiter/organisation/add-member/${_id}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {memberEmail}
        })
            .then(response => {
                console.log('Successfully added the member', response);
                toast.success('Successfully added the member');
            })
            .catch(error => {
                console.log('Error in ading  member ', error.response.data.error);
                toast.error(error.response.data.error);
            });
    };

    function myFunction(item, index) {
        document.getElementById("members-list").innerHTML += (index + 1) + " : " + item + "<br>"; 
    }

    useEffect(() => {
        loadOrganisation();
    }, []);

    const viewOrganisation = () => (
        <div> 
            <p>
                <b>Name: </b>{name}
            </p>
            <p>
                <b>Email: </b>{email}
            </p>
            <p>
                <b>Website: </b>{website}
            </p>
            <p>
                <b>About: </b>{about}
            </p>
            {/* <p>
                <b>Members: </b>{about} <br />
                {(members) ?
                    (members.map(member => (
                        <li>{member}</li>
                    )))                    
                : 
                    (null)
                }
            </p> */}

            <p>
                <b>Members: </b>
                <p id="members-list"></p>
                {
                    (member!=' ') ?
                    (member.forEach(myFunction))
                    : 
                    (null)
                }
                


            </p>
            <div>
                {/* <button className="btn btn-primary FormSubmit">
                    Add a new member
                </button> */}
                <Button variant="primary" onClick={handleShow}>
                    Add a new member
                </Button>
                {/* Popup Modal */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new member</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Please enter the email id of the member to be added
                        <br /> <br />
                        <div className="form-group">
                            <label className="labelCenter">Email</label>
                            <input onChange={handleChange('memberEmail')} value={memberEmail} type="text" className="form-control mx-auto" />
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={clickSubmit}>
                            Add Member
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>


            {/* Image Preview */}
            {
                (logoUrl != ' ')  ?
                (<img src={logoUrl} width="200" height="200" className="img-circle mx-auto d-block" alt="Uploaded Image"/>)
                :
                (null)

            }
            {/* <div id="imagePreview"></div>  */}
        </div>
    );

    return (
        <React.Fragment>
            <Header/>
            <div className="row">
                <ToastContainer />
                <div className="col-md-9 mx-auto my-4 ">
                    <div className="card card-body">
                        <h3 className="text-center mb-3">
                            View Organisation
                        </h3>                        
                        {viewOrganisation()}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RecruiterViewOrganisation;