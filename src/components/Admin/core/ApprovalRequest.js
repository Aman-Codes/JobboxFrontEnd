import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import axios from 'axios';
import {Button,Card,Tabs,Tab,Badge,Accordion} from 'react-bootstrap';
import { ToastContainer, toast} from 'react-toastify';
import { isAuth, getCookie, signout } from '../../shared/helpers';
import Header from './Header';

function DisplayJob(props) {
    const initial = props.jobDetail._id + 'mustHave';
    const [key, setKey] = useState(initial);
    
    const token = getCookie('token');
    let history = useHistory();
    console.log(props);
    
    return (
        <React.Fragment>
            {toast.dismiss()}
            <ToastContainer/>
            <section className="job-listing-section">
            <div className="job-listing">
                <div className="listing-front">
                    <div className="listing-front-top">
                        <h1>{props.jobDetail.jobtitle}</h1>
                        <p>{props.jobDetail.jobType}</p> &nbsp;
                        {
                            props.jobDetail.status==='Active' ? 
                            <Badge pill variant="success" className="pt-2">
                            {props.jobDetail.status}
                            </Badge>
                            :
                            <Badge pill variant="danger" className="pt-2">
                            {props.jobDetail.status}
                            </Badge>                                
                        }                        
                    </div>
                    <div className="listing-front-bottom">
                        <div>                  
                            <h4>{props.jobDetail.orgName}</h4>
                        </div>
                        <div>                  
                            <h4>{props.jobDetail.jobLocation}</h4>
                        </div>
                    </div>
                </div>
                <div className="listing-end">
                    <p>Details &raquo;</p>  
                </div>
            </div>
            
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              fill
            >
            <Tab eventKey={props.jobDetail._id + 'mustHave'} title="Must Have" className="border-left-right-bottom no-underline">
                <br />
                <div className="row">
                    <div className="col-md-3">
                        <h5>Skills</h5>
                    </div>
                    <div className="col-md-9 pl-5">
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <h5>Minimum Experience</h5>
                    </div>
                    <div className="col-md-9 pl-5">
                        
                        <Badge variant="primary">{props.jobDetail.minExperience} Year</Badge> {' '}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <h5>Maximum Experience</h5>
                    </div>
                    <div className="col-md-9 pl-5">
                        <Badge variant="secondary">{props.jobDetail.maxExperience}  Year</Badge> {' '}
                    </div>
                </div>
            </Tab>
            <Tab eventKey={props.jobDetail._id + 'niceHave'} title="Nice To Have" className="border-left-right-bottom">
                <br />
                <div className="row">
                    <div className="col-md-3">
                        <h5>Secondary Skills</h5>
                    </div>
                    <div className="col-md-9 pl-5">
                    </div>
                </div>
            </Tab>
            <Tab eventKey={props.jobDetail._id + 'aboutRole'} title="About The Role" className="border-left-right-bottom">
                <br />
                <div className="row">
                    <div className="col-md-3">
                        <h5>Job Location</h5>
                    </div>
                    <div className="col-md-9 pl-5">
                        <Badge variant="success">{props.jobDetail.jobLocation}  </Badge> {' '}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <h5>Salary</h5>
                    </div>
                    <div className="col-md-9 pl-5">
                    <Badge variant="info">{props.jobDetail.budget} {' '} { props.jobDetail.currency}</Badge> {' '}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <h5>Diversity</h5>
                    </div>
                    <div className="col-md-9 pl-5">
                    <Badge variant="primary">{props.jobDetail.diversity}</Badge> {' '}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <h5>Job Description</h5>
                    </div>
                    <div className="col-md-9 pl-5">
                    <p className="text-left job-description">
                        {props.jobDetail.jobDescription}
                    </p> 
                </div>
                </div>
            </Tab>
            <Tab eventKey={props.jobDetail._id + 'aboutCompany'} title="About The Company" className="border-left-right-bottom" >
                <br />
                <p className="mx-5 job-description">
                {props.jobDetail.orgDetails}
                </p>
            </Tab>
            </Tabs>
            <div className="flex-container mt-3">
                <div className="flex-element">
                </div>
                <div className="flex-element" >
                    <p>
                        Share this job &emsp;
                    </p> 
                    <div className="socialIcon" >
                        <Link to="/" className="fa fa-facebook"></Link> {' '}
                        <Link to="/" className="fa fa-twitter"> </Link> {' '}
                        <Link to="/" className="fa fa-linkedin"></Link> {' '}
                    </div>                                        
                </div>             
            </div>
            </section>
            <br />        
        </React.Fragment>
      )
    }
    

export default function ApprovalRequest() {
    const [chats, setchats] = useState([]);
    const [job, setjob] = useState([]);
    const [values, setValues] = useState({
        message: '',
    });

    const token = getCookie('token');
    let history = useHistory();

    // get the url of the page
    const url = window.location.href.replace(/\/$/, '');  

    // remove optional / from end of url and get job id from url
    const jobId = url.substr(url.lastIndexOf('/') + 1);

    const loadJob = () => {
        
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/admin/jobs/${jobId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                // console.log('Job postings found', response);
                console.log(response.data);
                setjob(response.data);
            })
            .catch(error => {
                console.log('Error in finding job posting', error);
            });
    };

    const { 
        message 
    } = values;

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/admin/jobs/approval-request/comment/${jobId}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: { message }
        })
            .then(response => {
                console.log('Message Posted', response);
                setValues({ ...values, message: '' });
                // window.location.reload();
                
            })
            .catch(error => {
                console.log('Error in posting message ', error.response.data.error);
                toast.error(error.response.data.error);
            });
    };

    const loadChats = () => {
        axios({
            method: 'GET',            
            url: `${process.env.REACT_APP_API}/recruiter/jobs/approval-request/comment/${jobId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setchats(response.data);
            })
            .catch(error => {
                console.log('Error in finding chats', error);
            });
    };
    useEffect(() => {
        loadJob();
        loadChats();
    },[message]);

    return(
        <React.Fragment>   
            <Header />  
            <div className="row">
                <div className="col-md-9 mx-auto my-0">
                    <h1 className="text-center">Job Post Approval</h1>
                    <div>
                        <DisplayJob jobDetail={job} key={job._id + 'jobdetail'}/>
                    </div>

                    <section className="msger">
                        <header className="msger-header">
                            <div className="msger-header-title">
                            <i className="fa fa-comments" aria-hidden="true"></i> Discussions
                            </div>
                        </header>
                    {
                        chats    &&
                        chats.map(chat => (
                            <main className="msger-chat">

                                {   (chat.from !== "Admin") &&
                                <div className="msg left-msg">

                                    <div className="msg-img fa fa-user fa-3x"></div>
                                    <div className="msg-bubble">
                                        <div className="msg-info">
                                        <div className="msg-info-name">Recruiter</div>
                                        {/* <div className="msg-info-time">12:45</div> */}
                                        </div>
                                        <div className="msg-text">
                                            {chat.message}
                                        </div>
                                    </div>

                                </div>
                                }

                                {   (chat.from ==="Admin") &&
                                <div className="msg right-msg">

                                    <div className="msg-img fa fa-user-secret fa-3x"></div>
                                    <div className="msg-bubble">
                                        <div className="msg-info">
                                        <div className="msg-info-name">Admin</div>
                                        {/* <div className="msg-info-time">12:46</div> */}
                                        </div>

                                        <div className="msg-text">
                                            {chat.message}
                                        </div>
                                    </div>
                                </div>
                                }
                            </main>
                                                     
                    ))}
                    </section>

                    <div>
                        <form className="msger-inputarea">
                            <input 
                                type="text" 
                                className="msger-input" 
                                placeholder="Enter your message..." 
                                onChange={handleChange('message')}
                                value={message}
                            />
                            <button type="submit" className="msger-send-btn" onClick={clickSubmit} >Send</button>
                        </form>
                    </div>

                    

                </div>
            </div>
        </React.Fragment>
    );
}