import React, { useState, useEffect } from 'react';
import { useHistory, Link } from "react-router-dom";
import axios from 'axios';
import {Button,Card,Tabs,Tab,Badge,Accordion} from 'react-bootstrap';
import { ToastContainer, toast} from 'react-toastify';
import { isAuth, getCookie, signout } from '../../shared/helpers';

function ControlledTabs(props) {
const initial = props.jobDetail._id + 'mustHave';
const [key, setKey] = useState(initial);
var skillsMandetory = props.jobDetail.skillsMandetory.split(",");
var skillsSecondary = props.jobDetail.skillsSecondary.split(",");

const token = getCookie('token');
let history = useHistory();

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
            <div className="flex-element"></div>
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
    </React.Fragment>
  )
}

export default function MyArchiveJobs() {
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
        // console.log("pageArray");
        // console.log(pageArray);
    }

    const loadJobs = () => {
        const RecruiterId = isAuth()._id;
        console.log("RecruiterId in React");
        console.log(RecruiterId);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/recruiter/jobs/archive/page/${currentPage}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {RecruiterId}
        })
            .then(response => {
                // console.log('Job postings found', response);
                setjobs(response.data);
            })
            .catch(error => {
                console.log('Error in finding job posting', error);
                // if (error.response.status === 401) {
                //     signout(() => {
                //         history.push('/');
                //     });
                // }
            });
    };
    const loadPages = () => {
        const RecruiterId = isAuth()._id;
        console.log("RecruiterId in React");
        console.log(RecruiterId);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/recruiter/jobs/archive/pagecount`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {RecruiterId}
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
        <React.Fragment>     
            <section className="job-listing-section">
                <div className="job-listing-section--heading">
                <h1>My Archived</h1>
                <h1>Jobs</h1>
                </div>
                {/* {console.log("jobs in react" ,jobs)} */}
                {
                    jobs    &&
                    jobs.map(job => (
                    <Accordion key={job._id + 'accordian'}>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey={job._id}>
                        <div className="job-listing">
                            <div className="listing-front">
                                <div className="listing-front-top">
                                    <h1>{job.jobtitle}</h1>
                                    <p>{job.jobType}</p>
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
        </React.Fragment>
    );
}