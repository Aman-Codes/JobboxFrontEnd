import React, { useState, useEffect } from 'react';
import {  Link } from "react-router-dom";
import axios from 'axios';
import {Button} from 'react-bootstrap';
import { ToastContainer, toast} from 'react-toastify';
import { isAuth, getCookie, signout } from '../../shared/helpers';
import Header from './Header';
import './AppliedCandidateList.css'

export default function RejectedCandidateList() {
    const [currentPage, setcurrentPage] = useState('1');
    const [pageArray, setpageArray] = useState([]);
    const [candidates, setcandidates] = useState([]);

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

    // get the recruiter id
    const RecruiterId = isAuth()._id;
    // get the url of the page
    const url = window.location.href.replace(/\/$/, '');  
    // remove optional / from end of url and get job id from url
    const jobId = url.substr(url.lastIndexOf('/') + 1);

    const loadCandidates = () => {
        axios({
            method: 'POST',            
            url: `${process.env.REACT_APP_API}/recruiter/jobs/rejected-candidate-list/${jobId}/${currentPage}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {RecruiterId}
        })
            .then(response => {
                setcandidates(response.data);
            })
            .catch(error => {
                console.log('Error in finding candidates', error);
            });
    };
    const loadPages = () => {
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/recruiter/jobs/rejected-candidate-list/pagecount/${jobId}`,
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
            });
    };

    const handleShortList = CandidateId => event => {
        event.preventDefault();
        axios({
            method: 'PUT',
            url: `${process.env.REACT_APP_API}/recruiter/jobs/shortlist/${jobId}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data: {RecruiterId, CandidateId}
        })
            .then(response => {
                console.log('Successfully shortlisted candidate', response);                
                loadCandidates();
                toast.success('Successfully shortlisted candidate');
            })
            .catch(error => {
                console.log('Error in shortlisting the candidate', error.response.data.error);
                toast.error(error.response.data.error);
            });
    }

    useEffect(() => {
        loadCandidates();
        loadPages();
    },[currentPage]);

    return(
        <React.Fragment>   
            <Header />  
            <div className="row">
                <div className="col-md-12 mx-auto">
                    <h1 className="text-center mb-5">Rejected Candidates</h1>
                    
                    <div className="row">
                    {
                        candidates    &&
                        candidates.map(candidate => (
                        <div className="col-md-4" key={candidate._id}>
                        <div className="card card-body mb-5 inner-shadow mx-auto">
                            <div className="row">
                                <div className="col-4 ">
                                {   <img 
                                        src={candidate.imageUrl || 'https://ideapod.com/wp-content/uploads/2017/08/person-1.jpg'}
                                        width="100" 
                                        height="100" 
                                        className="img-circle mx-auto d-block" 
                                        alt="Uploaded Image"
                                    />
                                }
                                
                                </div>
                                <div className="col-6">
                                    <p className="m-0">
                                        <i className="fa fa-user-circle-o" aria-hidden="true"></i> &nbsp;
                                        {candidate.name} <br />

                                        <i className="fa fa-envelope" aria-hidden="true"></i> &nbsp;
                                        {candidate.email} <br />

                                        <i className="fa fa-phone" aria-hidden="true"></i> &nbsp;
                                        {candidate.PhoneNumber}

                                    </p>
                                    <div className="small-social m-0">
                                            <Link to="/" className="fa fa-linkedin"></Link> 
                                            <Link to="/" className="fa fa-facebook"></Link>  
                                            <Link to="/" className="fa fa-google"> </Link>                       
                                            <Link to="/" className="fa fa-twitter"> </Link>
                                            <Link to="/" className="fa fa-github"></Link>
                                            
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-12">
                                    <p>
                                        <i className="fa fa-map-marker" aria-hidden="true"></i> &nbsp;
                                        {candidate.Address}
                                    </p>
                                    <p>
                                        <i className="fa fa-building" aria-hidden="true"></i> &nbsp;
                                        {candidate.JobCompany0}
                                    </p>
                                    <p>
                                        <i className="fa fa-graduation-cap" aria-hidden="true"></i> &nbsp;
                                        {candidate.InstituteNameUnderGrad}
                                    </p>
                                    
                                </div>
                            </div>
                            <div>
                                <Button 
                                    variant="outline-success"
                                    onClick={handleShortList(candidate._id)}
                                >
                                    SHORTLIST <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                </Button>
                            </div>

                                                   
                        </div>    
                        </div>            
                    ))}
                    </div>                    
                    <div className="pagination">
                        {   
                            pageArray.map(pageNumber => (
                            <div className="pagination-circle-1" key={pageNumber}>                        
                                <button onClick={() => {setcurrentPage(pageNumber)}}>{pageNumber}</button>
                            </div> 
                        ))}         
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}