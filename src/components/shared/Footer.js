import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { isAuth, signout } from './helpers';
import {DropdownButton, Dropdown} from 'react-bootstrap';
import './Footer.css'

export default function Footer() {
    let history = useHistory();  
    return(
        <div className="footer">
            <div className="footer-bottom pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="footer-menu">
                                {/* <ul>
                                    <li><a href="/">Home</a></li>
                                    <li><a href="/terms">Terms and Conditions</a></li>
                                    <li><a href="/privacypolicy">Privacy Policy</a></li>
                                </ul> */}
                                <div id="main-section-header" className="main-section-header">
                                    <div className="main-section-header-1">
                                    <h1 className="job-portal-heading" id="job-portal-heading"> Job Box </h1> &emsp;
                                    </div>
                                    <div className="main-section-header-2">
                                        <a href="#main" className="link" id="home-link"> Home </a> &emsp;
                                        <a href="#job_postings" className="link" id="about-link"> About </a> &emsp;
                                        <a href="#contact" className="link" id="contact-link"> Contact </a> &emsp;
                                        <Dropdown>
                                          <Dropdown.Toggle id="dropdown-basic" className="headerDropdown">
                                            Candidate
                                          </Dropdown.Toggle>

                                          <Dropdown.Menu>
                                          { (!isAuth() || isAuth().role !== 'user') && (
                                                <Fragment>
                                                    <Dropdown.Item href="/users/signin">Login</Dropdown.Item>
                                                    <Dropdown.Item href="/users/signup">Register</Dropdown.Item>
                                                </Fragment>
                                            )}
                                            {isAuth() &&  isAuth().role === 'user' && (
                                                <Fragment>
                                                    <Dropdown.Item href="/users/dashboard">
                                                        Dashboard
                                                    </Dropdown.Item> 
                                                    <Dropdown.Item 
                                                        className="DropdownHover"
                                                        onClick={() => {
                                                            signout(() => {
                                                                history = '/' ;
                                                            });
                                                        }}
                                                    >
                                                    Signout
                                                    </Dropdown.Item>
                                                </Fragment>
                                            )}
                                          </Dropdown.Menu>
                                        </Dropdown> &emsp;
                                                    
                                        <Dropdown>
                                          <Dropdown.Toggle id="dropdown-basic" className="headerDropdown">
                                            Recruiter
                                          </Dropdown.Toggle>
                                                    
                                          <Dropdown.Menu>
                                          { (!isAuth() || isAuth().role !== 'subscriber') && (
                                                <Fragment>
                                                    <Dropdown.Item href="/recruiter/signin">Login</Dropdown.Item>
                                                    <Dropdown.Item href="/recruiter/signup">Register</Dropdown.Item>
                                                </Fragment>
                                            )}
                                            {isAuth() &&  isAuth().role === 'subscriber' && (
                                                <Fragment>
                                                    <Dropdown.Item href="/recruiter/dashboard">
                                                        Dashboard
                                                    </Dropdown.Item> 
                                                    <Dropdown.Item 
                                                        className="DropdownHover"
                                                        onClick={() => {
                                                            signout(() => {
                                                                history = "/";
                                                            });
                                                        }}
                                                    >
                                                    Signout
                                                    </Dropdown.Item>
                                                </Fragment>
                                            )}
                                          </Dropdown.Menu>
                                        </Dropdown>                    
                                    </div>                
                                </div>
                            </div>
                            <br />
                            <div className="copy-text">
                                <p>Copyright © 2020</p>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    );
}
