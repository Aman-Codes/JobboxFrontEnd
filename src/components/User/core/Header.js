import React,{ useState} from 'react';
import { useHistory } from 'react-router-dom';
import {DropdownButton, Dropdown, Button, Modal, Form} from 'react-bootstrap';
import { signout } from '../../shared/helpers';
import './Dashboard.css';

export default function Header() {
    const history = useHistory();
    return (
        <div className="row rowheader1">
            <div className="col-4 col-lg-2 offset-lg-1  col-md-3  offset-md-2 offset-2 mt-2">
                <a href="/users/dashboard" className="headernav1 white">Job Box</a>
            </div>                    
            <div className="col-5 col-lg-2 offset-lg-7 col-md-4 offset-md-3 offset-1 mt-2">
                <i className="fa fa-user-o white"></i>
                {/* <button                    
                    className="headernav1 CandidateProfile"
                    onClick={handleOnClick}
                > 
                Candidate Profile
                </button> */}
                <Dropdown className="CandidateProfileDropdown" >
                    <Dropdown.Toggle  className="CandidateProfile" id="dropdown-basic">
                        Candidate Profile
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="CandidateProfileMenu" >
                        <Dropdown.Item href="/users/dashboard" className="DropdownHover">
                            <i className="fa fa-tachometer white" style={{ fontSize: '1.75em' }} /> &nbsp;&nbsp;
                            <span className="white">Dashboard</span>
                        </Dropdown.Item>
                        <Dropdown.Item href="/users/personaldetails" className="DropdownHover">
                            <i className="fa fa-address-card-o white" style={{ fontSize: '1.75em' }} /> &nbsp;&nbsp;
                            <span className="white">Personal Details</span>
                        </Dropdown.Item>
                        <Dropdown.Item href="/users/educationdetails" className="DropdownHover">
                            <i className="fa fa-book white" style={{ fontSize: '1.75em' }} /> &nbsp;&nbsp;
                            <span className="white">Education Details </span>         
                        </Dropdown.Item>
                        <Dropdown.Item href="/users/achievementdetails" className="DropdownHover">
                            <i className="fa fa-trophy white" style={{ fontSize: '1.75em' }} /> &nbsp;&nbsp;
                            <span className="white">Achievement Details</span>
                        </Dropdown.Item>
                        <Dropdown.Item href="/users/workdetails" className="DropdownHover">
                            <i className="fa fa-briefcase white" style={{ fontSize: '1.75em' }} /> &nbsp;&nbsp;
                            <span className="white">Work Experience Details</span>
                        </Dropdown.Item>
                        <Dropdown.Item href="/users/socialdetails" className="DropdownHover">
                            <i className="fa fa-users white" style={{ fontSize: '1.75em' }} /> &nbsp;&nbsp;
                            <span className="white">Social Details </span>
                        </Dropdown.Item>
                        <Dropdown.Item href="/users/appliedjobs" className="DropdownHover">
                            <i className="fa fa-file-text white" style={{ fontSize: '1.75em' }} /> &nbsp;&nbsp;
                            <span className="white">Applied Jobs </span>
                        </Dropdown.Item>
                        <Dropdown.Item href="/users/changepassword" className="DropdownHover">
                            <i className="fa fa-key white" style={{ fontSize: '1.75em' }} /> &nbsp;&nbsp;
                            <span className="white">Change password</span>
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