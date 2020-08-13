import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

export default function NotFound() {
    return(
        <div className="row mt-5">
            <div className="col-md-6 mx-auto my-5">
                <div className="card card-body text-center">
                    <h1>OH! IT LOOKS THAT THE PAGE YOU ARE LOOKING FOR DOES NOT EXIST!!!</h1><br/>
                    <h1>TRY SOMETHING ELSE</h1><br/>
                </div>
            </div>
        </div>      
    );
}