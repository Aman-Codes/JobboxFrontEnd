import React, { useState, useEffect } from 'react';
import { useHistory, Link, useLocation } from "react-router-dom";
import axios from 'axios';
import {Button,Card,Tabs,Tab,Badge,Accordion} from 'react-bootstrap';
import { ToastContainer, toast} from 'react-toastify';
import { isAuth, getCookie, signout } from '../../shared/helpers';
import Header from './Header';
import MyAllJobs from './MyAllJobs';
// import MyActiveJobs from './MyActiveJobs';
// import MyPendingJobs from './MyPendingJobs';
// import MyArchiveJobs from './MyArchiveJobs';

export default function MyJobs() {

    return(
        <React.Fragment>
            <Header />
            <MyAllJobs />

        </React.Fragment>
    );
}