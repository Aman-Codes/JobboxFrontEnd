// react
import React,{ useState} from 'react';
import { Link } from 'react-router-dom';
import JobPostings from './ViewJobPost';
import Header from './Header'

export default function Dashboard() {
    return(
        <React.Fragment>
            <Header/>
            <JobPostings />
        </React.Fragment>

    );
}