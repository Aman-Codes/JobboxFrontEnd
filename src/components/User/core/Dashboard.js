// react
import React,{ useState} from 'react';
import { Link } from 'react-router-dom';
import JobPostings from '../../shared/JobPostings';
import Header from './Header'

// bootstrap components
import {DropdownButton, Dropdown} from 'react-bootstrap';

export default function Dashboard() {

    // const [ jobPostings, setJobPostings ] = React.useState([]);

    // React.useEffect(() => {
    //     fetch('',{
    //     method: 'GET',
    //     mode: 'cors'
    //   })
    //     .then((response) => response.json())
    //     .then((result) => {
    //         if(!result.error){
    //           setJobPostings(result.jobPostings);
    //         }else {
    //             console.log(result.error);
    //         }
    //     })
    //     .catch((e) => console.log(e));
    // },[]);

    return(
        <React.Fragment>
            <Header/>
            <JobPostings />
        </React.Fragment>

    );
}