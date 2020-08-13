import React,{ useState} from 'react';
import { useHistory } from 'react-router-dom';
import {DropdownButton, Dropdown, Button, Modal, Form} from 'react-bootstrap';
import { signout } from '../../shared/helpers';

export default function Header() {
    const history = useHistory();
    return (
        <div className="row rowheader1">
            <div className="col-4 col-lg-2 offset-lg-1  col-md-3  offset-md-2 offset-2 mt-2">
                <a href="/users/dashboard" className="headernav1 white">Job Box</a>
            </div>                    
            <div className="col-5 col-lg-2 offset-lg-7 col-md-4 offset-md-3 offset-1 mt-2">
                <i className="fa fa-user-o white"></i>
                <Dropdown className="CandidateProfileDropdown" >
                    <Dropdown.Toggle  className="CandidateProfile" id="dropdown-basic">
                        Recruiter Profile
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="CandidateProfileMenu" >
                        <Dropdown.Item href="/recruiter/dashboard" className="DropdownHover">
                            <i className="fa fa-tachometer white" style={{ fontSize: '1.75em' }} /> &nbsp;&nbsp;
                            <span className="white">Dashboard</span>
                        </Dropdown.Item>
                        <Dropdown.Item href="/recruiter/buildprofile" className="DropdownHover">
                            <i className="fa fa-address-card-o white" style={{ fontSize: '1.75em' }} /> &nbsp;&nbsp;
                            <span className="white">Build Profile</span>
                        </Dropdown.Item>
                        {/* <Dropdown.Item href="/recruiter/MyJobs" className="DropdownHover">
                            <i className="fa fa-briefcase white" style={{ fontSize: '1.75em' }} /> &nbsp;&nbsp;
                            <span className="white">My Jobs</span>
                        </Dropdown.Item> */}
                        <Dropdown.Item href="/recruiter/JobPosting" className="DropdownHover">
                            <i className="fa fa-building-o white" style={{ fontSize: '1.75em' }} /> &nbsp;&nbsp;
                            <span className="white">Job Posting</span>
                        </Dropdown.Item>
                        <Dropdown.Item href="/recruiter/changepassword" className="DropdownHover">
                            <i className="fa fa-key white" style={{ fontSize: '1.75em' }} /> &nbsp;&nbsp;
                            <span className="white">Change password</span>
                        </Dropdown.Item>
                        <Dropdown.Item href="/recruiter/organisation/create" className="DropdownHover">
                            <i className="fa fa-university white" style={{ fontSize: '1.75em' }} /> &nbsp;&nbsp;
                            <span className="white">Create Organisation</span>
                        </Dropdown.Item>
                        <Dropdown.Item href="/recruiter/organisation/view" className="DropdownHover">
                            <i className="fa fa-globe white" style={{ fontSize: '1.75em' }} /> &nbsp;&nbsp;
                            <span className="white">View Organisation</span>
                        </Dropdown.Item>
                        <Dropdown.Item 
                            className="DropdownHover"
                            onClick={() => {
                                signout(() => {
                                    history.push("/");
                                });
                            }}
                        >
                            <i className="fa fa-sign-out white" aria-hidden="true" style={{ fontSize: '1.75em' }} /> &nbsp;&nbsp;
                            <span className="white">Signout</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>                
            </div>                    
        </div>
    )
}