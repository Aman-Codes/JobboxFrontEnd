import React, { useState, useEffect } from 'react';
import { useHistory, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import {Button,Card,Tabs,Tab,Badge,Accordion, Modal} from 'react-bootstrap';
import { ToastContainer, toast} from 'react-toastify';
import { isAuth, getCookie, signout } from '../../shared/helpers';

// Function to display each job detail
function ControlledTabs(props) {
const initial = props.jobDetail._id + 'mustHave';
const [key, setKey] = useState(initial);

// Hooks for the warning of making job post archive 
const [showArchiveWarning, setShowArchiveWarning] = useState(false);
const handleCloseArchiveWarning = () => setShowArchiveWarning(false);
const handleShowArchiveWarning = () => setShowArchiveWarning(true);

// Hooks for the warning of making job post active 
const [showActiveWarning, setShowActiveWarning] = useState(false);
const handleCloseActiveWarning = () => setShowActiveWarning(false);
const handleShowActiveWarning = () => setShowActiveWarning(true);

// Hooks for the warning of making job post pending 
const [showPendingWarning, setShowPendingWarning] = useState(false);
const handleClosePendingWarning = () => setShowPendingWarning(false);
const handleShowPendingWarning = () => setShowPendingWarning(true);


// Split skills into object items
var skillsMandetory = props.jobDetail.skillsMandetory.split(",");
var skillsSecondary = props.jobDetail.skillsSecondary.split(",");

const token = getCookie('token');
let history = useHistory();

// Function for making job post archive 
const handleArchive = event => {
    event.preventDefault();
    if(isAuth() && isAuth().role === 'admin') {
        const JobId = props.jobDetail._id;
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/admin/jobs/archive/${JobId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {            
                if(response.data.error !== '') {
                    toast.dismiss();
                    toast.error(response.data.error);
                }
                else {
                    console.log('Successfully made the job post archive ', response);  
                    toast.dismiss(); 
                    toast.success('Successfully made the job post archive ');
                }
            })
            .then( response => {
                window.location.reload(false);
            })
            .catch(error => {
                console.log('Error in making job post archive ', error);
                if(error) {
                    toast.dismiss();
                    toast.error('Error in making job post archive ');
                }    
                window.location.reload(false);   
            });
    }
    else {
        history.push('/');
    }
}

// Function for making job post active 
const handleActive = event => {
    event.preventDefault();
    if(isAuth() && isAuth().role === 'admin') {
        const JobId = props.jobDetail._id;
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/admin/jobs/active/${JobId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {            
                if(response.data.error !== '') {
                    toast.dismiss();
                    toast.error(response.data.error);
                }
                else {
                    console.log('Successfully made the job post active ', response);  
                    toast.dismiss(); 
                    toast.success('Successfully made the job post active ');
                }
            })
            .then( response => {
                window.location.reload(false);
            })
            .catch(error => {
                console.log('Error in making job post active ', error);
                if(error) {
                    toast.dismiss();
                    toast.error('Error in making job post active ');
                }    
                window.location.reload(false);   
            });
    }
    else {
        history.push('/');
    }
}


// Function for making job post pending 
const handlePending = event => {
    event.preventDefault();
    if(isAuth() && isAuth().role === 'admin') {
        const JobId = props.jobDetail._id;
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/admin/jobs/pending/${JobId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {            
                if(response.data.error !== '') {
                    toast.dismiss();
                    toast.error(response.data.error);
                }
                else {
                    console.log('Successfully made the job post pending ', response);  
                    toast.dismiss(); 
                    toast.success('Successfully made the job post pending ');
                }
            })
            .then( response => {
                window.location.reload(false);
            })
            .catch(error => {
                console.log('Error in making job post pending ', error);
                if(error) {
                    toast.dismiss();
                    toast.error('Error in making job post pending ');
                }    
                window.location.reload(false);   
            });
    }
    else {
        history.push('/');
    }
}


return (
    <React.Fragment>
        {toast.dismiss()}
        <ToastContainer/>
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
                    {skillsMandetory.map(skill => (
                        <span key={skill}>
                            <Badge variant="danger">{skill}</Badge>
                            <span>{' '}</span>
                        </span>                        
                    ))}
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
                    {skillsSecondary.map(skill => (
                        <span key={skill}>
                            <Badge variant="success">{skill}</Badge>
                            <span>{' '}</span>
                        </span>                        
                    ))}
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
                <Link to = {"/admin/editjob/" + props.jobDetail._id } className="no-underline" >
                    <Button variant="info">
                        Edit
                    </Button>{' '}
                </Link>
                &emsp;
                {
                    (props.jobDetail.status==='Archive') ?
                    (
                        <React.Fragment>
                            {/* If job post is archive show option to make active or pending */}
                            <Button variant="danger" onClick={handleShowActiveWarning}>
                                Active
                            </Button>
                            &emsp;
                            <Button variant="danger" onClick={handleShowPendingWarning}>
                                Pending
                            </Button>
                        </React.Fragment>
                    )
                    :
                    ( 
                        // If job post is not archive show option to make archive
                        <Button variant="danger" onClick={handleShowArchiveWarning}>
                            Archive
                        </Button>
                    )
                }
                &emsp;
                {
                    (props.jobDetail.status==='Active') ? 
                    (
                        <React.Fragment>
                            <Button 
                                variant="info" 
                                href={`/admin/jobs/applied-candidate-list/${props.jobDetail._id}`}
                            >
                                Applied Candidates
                            </Button>
                            &emsp;
                            {/* If job post is active show option to make pending */}
                            <Button variant="danger" onClick={handleShowPendingWarning}>
                                Pending
                            </Button>
                        </React.Fragment>
                    )
                    :
                    null                              
                }
                {
                    (props.jobDetail.status==='Pending') ? 
                    (
                        <React.Fragment>
                            <Button 
                                variant="success" 
                                href={`/admin/jobs/approval-request/${props.jobDetail._id}`}
                            >
                                Approval Request
                            </Button>
                            &emsp;
                            {/* If job post is pending show option to make active */}
                            <Button variant="danger" onClick={handleShowActiveWarning}>
                                Active
                            </Button>
                        </React.Fragment>
                    )
                    :
                    null                              
                }
                         
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
        <br /> 

        {/* Modal to display warning for making job post archive */}
        <Modal show={showArchiveWarning} onHide={handleCloseArchiveWarning}>
            <Modal.Header closeButton>
                <Modal.Title>Archive Job Post Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to make the job post archive?</Modal.Body>
            <Modal.Footer>                        
                <Button variant="secondary" onClick={handleCloseArchiveWarning}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleArchive}>
                    Archive
                </Button>
            </Modal.Footer>
        </Modal>

        {/* Modal to display warning for making job post active */}
        <Modal show={showActiveWarning} onHide={handleCloseActiveWarning}>
            <Modal.Header closeButton>
                <Modal.Title>Active Job Post Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to make the job post active?</Modal.Body>
            <Modal.Footer>                        
                <Button variant="secondary" onClick={handleCloseActiveWarning}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleActive}>
                    Active
                </Button>
            </Modal.Footer>
        </Modal>

        {/* Modal to display warning for making job post pending */}
        <Modal show={showPendingWarning} onHide={handleClosePendingWarning}>
            <Modal.Header closeButton>
                <Modal.Title>Pending Job Post Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to make the job post pending?</Modal.Body>
            <Modal.Footer>                        
                <Button variant="secondary" onClick={handleClosePendingWarning}>
                    Close
                </Button>
                <Button variant="danger" onClick={handlePending}>
                    Pending
                </Button>
            </Modal.Footer>
        </Modal>

    </React.Fragment>
  )
}

// Function to view all job posting
export default function JobPostings() {
    const [currentPage, setcurrentPage] = useState('1');
    const [pageArray, setpageArray] = useState([]);
    const [jobs, setjobs] = useState([]);

    const token = getCookie('token');

    const createPages =  (PageCount)  => {
        let temp = [];
        for(let i = 1; i <= PageCount; ++i)
        {
            temp.push(i);
        }
        setpageArray(temp);
    }

    const loadJobs = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/admin/jobs/page/${currentPage}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setjobs(response.data);
            })
            .catch(error => {
                console.log('Error in finding job posting', error);
            });
    };
    const loadPages = () => {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API}/admin/jobs/pagecount`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                // console.log('Page count found', response);
                const pageCount = response.data;
                // console.log("pageCount in load pages");
                // console.log(pageCount);
                createPages(pageCount);
                // console.log("currentPage");
                // console.log(currentPage);
            })
            .catch(error => {
                console.log('Error in finding page count', error);
                // if (error.status === 401) {
                //     signout(() => {
                //         history.push('/');
                //     });
                // }
            });
    };
    useEffect(() => {
        loadJobs();
        loadPages();
    },[currentPage]);

    return(
        <section className="job-listing-section">
            <div className="job-listing-section--heading">
            <h1>Recent</h1>
            <h1>Jobs</h1>
            </div>
            {
                jobs    &&
                jobs.map(job => (
                <Accordion key={job._id + 'accordian'}>
                    <Accordion.Toggle as={Card.Header} variant="link" eventKey={job._id}>
                    <div className="job-listing">
                        <div className="listing-front">
                            <div className="listing-front-top">
                                <h1>{job.jobtitle}</h1>
                                <p>{job.jobType}</p> &nbsp;
                                {
                                        job.status==='Active' ? 
                                        <Badge pill variant="success" className="pt-2">
                                        {job.status}
                                        </Badge>
                                        :
                                        null                              
                                }
                                {
                                        job.status==='Archive' ? 
                                        <Badge pill variant="warning" className="pt-2">
                                        {job.status}
                                        </Badge>
                                        :
                                        null                              
                                }
                                {
                                        job.status==='Pending' ? 
                                        <Badge pill variant="danger" className="pt-2">
                                        {job.status}
                                        </Badge>
                                        :
                                        null                              
                                }
                            </div>
                            <div className="listing-front-bottom">
                                <div>                  
                                    <h4>{job.orgName}</h4>
                                </div>
                                <div>                  
                                    <h4>{job.jobLocation}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="listing-end">
                            <p>Details</p>  
                        </div>
                    </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={job._id}>
                        <ControlledTabs jobDetail={job} key={job._id + 'jobdetail'}/>
                    </Accordion.Collapse>
                </Accordion>                            
            ))}
            <div className="pagination">
                {   
                    pageArray.map(pageNumber => (
                    <div className="pagination-circle-1" key={pageNumber}>                        
                        <button onClick={() => {setcurrentPage(pageNumber)}}>{pageNumber}</button>
                    </div> 
                ))}         
            </div>
        </section>
    );
}