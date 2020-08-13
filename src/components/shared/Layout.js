import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuth, signout } from './helpers';

import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

const Layout = ({ children, match, history }) => {
    const isActive = path => {
        if (match.path === path) {
            return { color: '#333' };
        } else {
            return { color: 'rgba(0,0,0,.5)' };
        }
    };

    const nav = () => (
        <div>
            <Navbar bg="light" expand="lg" style={{zIndex: '2000'}}>
            <Navbar.Brand href="/">Job Box</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/" style={isActive('/')}>Home</Nav.Link>
                    <Nav.Link href="/about" style={isActive('/about')}>About Us</Nav.Link>
                    <Nav.Link href="/contact" style={isActive('/contact')}>Contact Us</Nav.Link>
                    {isAuth() && isAuth().role === 'user' && (
                        <Fragment>
                            <Nav.Link href="/users/dashboard" style={isActive('/users/dashboard')}>Dashboard</Nav.Link>
                        </Fragment>
                    )}

                    {isAuth() && isAuth().role === 'subscriber' && (
                        <Fragment>
                            <Nav.Link href="/recruiter/dashboard" style={isActive('/recruiter/dashboard')}>{isAuth().name}</Nav.Link>
                            <Nav.Link href="/recruiter/MyJobs" style={isActive('/recruiter/MyJobs')}>My Jobs</Nav.Link>
                            <Nav.Link href="/recruiter/JobPosting" style={isActive('/recruiter/JobPosting')}>Job Post</Nav.Link>
                            {/* <Nav.Link href="/recruiter/MyChats" style={isActive('/recruiter/MyChats')}>My Chats</Nav.Link> */}
                            {/* <Nav.Link href="/recruiter/CandidateSearch" style={isActive('/recruiter/CandidateSearch')}>Search candidates</Nav.Link> */}
                            {/* <Nav.Link href="/recruiter/Report" style={isActive('/recruiter/Report')}>Report</Nav.Link> */}
                        </Fragment>
                    )}

                    <NavDropdown title="Recruiter" id="basic-nav-dropdown">
                        {(!isAuth() || isAuth().role !== 'subscriber')  && (
                            <Fragment>
                                <NavDropdown.Item href="/recruiter/signin" style={isActive('/recruiter/signin')}>Login</NavDropdown.Item>
                                <NavDropdown.Item href="/recruiter/signup" style={isActive('/recruiter/signup')}>Register</NavDropdown.Item>
                            </Fragment>
                        )}
                        {isAuth() && isAuth().role === 'subscriber'  && (
                            <Fragment>
                                <NavDropdown.Item>
                                    <span
                                        style={{ cursor: 'pointer', color: 'rgba(0,0,0,0.5)' }}
                                        onClick={() => {
                                            signout(() => {
                                                history.push('/');
                                            });
                                        }}
                                    >
                                    Signout
                                </span>
                                </NavDropdown.Item>
                            </Fragment>
                        )}
                    </NavDropdown>

                    <NavDropdown title="User" id="basic-nav-dropdown">
                        { (!isAuth() || isAuth().role !== 'user') && (
                            <Fragment>
                                <NavDropdown.Item href="/users/signin" style={isActive('/users/signin')}>Login</NavDropdown.Item>
                                <NavDropdown.Item href="/users/signup" style={isActive('/users/signup')}>Register</NavDropdown.Item>
                            </Fragment>
                        )}
                        {isAuth() &&  isAuth().role === 'user' && (
                            <Fragment>
                                <NavDropdown.Item>
                                    <span
                                        style={{ cursor: 'pointer', color: 'rgba(0,0,0,0.5)' }}
                                        onClick={() => {
                                            signout(() => {
                                                history.push('/');
                                            });
                                        }}
                                    >
                                    Signout
                                </span>
                                </NavDropdown.Item>
                            </Fragment>
                        )}
                    </NavDropdown>

                </Nav>
            </Navbar.Collapse>
            </Navbar>
            {/* {isAuth() && isAuth().role === 'admin' && (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive('/recruiter/admin')} to="/recruiter/admin">
                            {isAuth().name}
                        </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" style={isActive('/recruiter/AdminChats')} to="/recruiter/AdminChats">
                        Admin Chats
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" style={isActive('/recruiter/AdminCandidates')} to="/recruiter/AdminCandidates">
                        Candidates
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" style={isActive('/recruiter/AdminJobs')} to="/recruiter/AdminJobs">
                        Jobs
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" style={isActive('/recruiter/AdminReports')} to="/recruiter/AdminReports">
                        Admin Reports
                    </Link>
                    </li>
                    </Fragment>
                )} */}

                {/* {isAuth() && isAuth().role === 'subscriber' && (
                    <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive('/recruiter/dashboard')} to="/recruiter/dashboard">
                            {isAuth().name}
                        </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" style={isActive('/recruiter/MyJobs')} to="/recruiter/MyJobs">
                        My Jobs
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive('/recruiter/JobPosting')} to="/recruiter/JobPosting">
                        Job Post
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive('/recruiter/MyChats')} to="/recruiter/MyChats">
                        My Chats
                    </Link>
                </li>
                
                <li className="nav-item">
                    <Link className="nav-link" style={isActive('/recruiter/CandidateSearch')} to="/recruiter/CandidateSearch">
                        Search candidates
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive('/recruiter/Report')} to="/recruiter/Report">
                        Report
                    </Link>
                </li>
                </Fragment>

                )} */}

                {/* {isAuth() && (
                    <li className="nav-item">
                        <span
                            className="nav-link"
                            style={{ cursor: 'pointer', color: '#fff' }}
                            onClick={() => {
                                signout(() => {
                                    history.push('/');
                                });
                            }}
                        >
                            Signout
                        </span>
                    </li>
                )} */}

        </div>
    );

    return (
        <Fragment>
            {nav()}
            <div>{children}</div>
        </Fragment>
    );
};

export default withRouter(Layout);